
const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const queryGroq = async (userPrompt, userId, filters = {}, groupBy = '') => {
  try {

    const systemPrompt = `
You are a SQL expert assistant for an inventory management system. Your job is to generate **precise** PostgreSQL queries — not explanations.

### Schema:
- users(id, name, email)
- suppliers(id, user_id, name)
- products(id, user_id, name, sku, supplier_id, category_id)
- stock_movements(id, user_id, product_id, movement_type ['IN'|'OUT'], quantity, location_id, created_at)
- locations(id, user_id, name)
- categories(id, user_id, name)
- supplier_locations(supplier_id, location_id)

### RULES:

1. Always filter by \`user_id = ${userId}\` — required.
2. Use INNER JOINs with aliases: \`sm\`, \`p\`, \`s\`, \`c\`, \`l\`
3. If prompt includes things like “best selling”, only use movement_type = 'OUT', group by product, order by SUM DESC.
4. If filters are provided below, apply them in the WHERE clause.
5. Never use SELECT *.
6. Unless user asks for full list, use LIMIT 50.
7. SQL must be returned inside triple backticks.

### Filters to Apply (if possible):
${filters.startDate && filters.endDate ? `- Date Range: '${filters.startDate}' to '${filters.endDate}'` : ''}
${filters.locationId ? `- Location ID: ${filters.locationId}` : ''}
${filters.categoryId ? `- Category ID: ${filters.categoryId}` : ''}
${filters.supplierId ? `- Supplier ID: ${filters.supplierId}` : ''}
${filters.productId ? `- Product ID: ${filters.productId}` : ''}
${groupBy ? `- Group by: ${groupBy}` : ''}

Respond with only valid SQL inside triple backticks.

`.trim();

    const response = await axios.post(
      GROQ_URL,
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const fullText = response.data.choices?.[0]?.message?.content?.trim();
    if (!fullText) throw new Error('Groq response was empty or malformed');

    const match = fullText.match(/```(?:sql)?\s*([\s\S]*?)\s*```/i);
    if (match?.[1]) return match[1].trim();

    const lines = fullText.split('\n');
    const startIndex = lines.findIndex(line => line.toLowerCase().includes('select'));
    if (startIndex >= 0) return lines.slice(startIndex).join('\n').trim();

    throw new Error('No SQL found in Groq response');

  } catch (err) {
    console.error('Groq query error:', err.response?.data || err.message);
    throw new Error('Failed to fetch valid SQL from Groq');
  }
};

module.exports = { queryGroq };
