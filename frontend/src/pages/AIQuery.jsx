import { useState, useEffect } from 'react';
import '../css/aiquery.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AIQuery = () => {
  const { accesstoken } = useAuth();
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedGroupByField, setSelectedGroupByField] = useState('');

  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${accesstoken}`,
        };

        const [locRes, catRes, supRes, prodRes] = await Promise.all([
          axios.get('http://localhost:5000/api/locations', { headers }),
          axios.get('http://localhost:5000/api/categories', { headers }),
          axios.get('http://localhost:5000/api/suppliers', { headers }),
          axios.get('http://localhost:5000/api/products', { headers }),
        ]);

        setLocations(locRes.data);
        setCategories(catRes.data);
        setSuppliers(supRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error('Error fetching filters:', err);
      }
    };

    fetchOptions();
  }, [accesstoken]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResult([]);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/ai/query',
        {
          prompt: question,
          filters: {
            locationId: selectedLocationId,
            categoryId: selectedCategoryId,
            supplierId: selectedSupplierId,
            productId: selectedProductId,
            startDate,
            endDate,
          },
          groupBy: selectedGroupByField || '',
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );

      const { result } = response.data;
      setResult(result || []);
    } catch (err) {
      console.error('AI query failed', err);
      setError('Failed to generate response. Please try again.');
    }

    setLoading(false);
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') handleAsk();
  };

  const isPlainAnswer = (data) =>
    data.length === 1 && Object.keys(data[0]).length === 1;

  return (
    <div className="aiquery-container">
      <h2 className="aiquery-title">
        <i className="bi bi-stars"></i> Inventino
      </h2>

      <div className="aiquery-main">
        <div className="filter-bar">
          <select value={selectedLocationId} onChange={(e) => setSelectedLocationId(e.target.value)}>
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>

          <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select value={selectedSupplierId} onChange={(e) => setSelectedSupplierId(e.target.value)}>
            <option value="">All Suppliers</option>
            {suppliers.map((sup) => (
              <option key={sup.id} value={sup.id}>{sup.name}</option>
            ))}
          </select>

          <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
            <option value="">All Products</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>{prod.name}</option>
            ))}
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="aiquery-chatbox">
          <input
            className="aiquery-input"
            type="text"
            placeholder="Ask me something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <button className="btn-pink" onClick={handleAsk} disabled={loading}>
            {loading ? 'Thinking…' : 'Ask'}
          </button>
        </div>

        <div className="aiquery-result">
          {loading && <p className="aiquery-placeholder">⏳ Generating answer...</p>}
          {error && <p className="aiquery-error">{error}</p>}
          {!loading && !error && result.length === 0 && (
            <p className="aiquery-placeholder">🤖 No results yet. Ask something!</p>
          )}
          {!loading && result.length > 0 && (
            <div className="aiquery-response">
              {isPlainAnswer(result) ? (
                <div className="plain-answer">
                  <strong>Answer:</strong> {Object.values(result[0])[0]}
                </div>
              ) : (
                <table className="aiquery-table">
                  <thead>
                    <tr>
                      {Object.keys(result[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((value, i) => (
                          <td key={i}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIQuery;
