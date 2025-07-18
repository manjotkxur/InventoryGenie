const PDFDocument = require('pdfkit');
const getStream = require('get-stream').buffer;

const exportToPDF = async (data, groupBy, filters) => {
  if (!data || data.length === 0) {
    throw new Error('No data available to export');
  }

  const doc = new PDFDocument({ margin: 40, size: 'A4' });
  const columnSpacing = 10;
  const rowHeight = 30;
  const startX = 40;
  let y = 80;

  const columns = [
    { key: 'product', label: 'Product', width: 160 },
    { key: 'location', label: 'Location', width: 70 },
    { key: 'supplier', label: 'Supplier', width: 90 },
    { key: 'category', label: 'Category', width: 70 },
    { key: 'unit_price', label: 'Unit Price', width: 60 },
    { key: 'stock', label: 'Stock', width: 50 },
    { key: 'inventory_value', label: 'Inventory Value', width: 80 },
  ];
  doc.fontSize(16).text(`Inventory Report (Grouped by ${groupBy})`, {
    align: 'center',
  });

  y += 30;

  const formatArray = (label, arr) => {
    if (!arr || arr.length === 0) return '';
    return `${label}: ${arr.join(', ')}`;
  };

  const filterLines = [
    formatArray('Locations', filters.locationIds),
    formatArray('Suppliers', filters.supplierIds),
    formatArray('Categories', filters.categoryIds),
  ].filter(Boolean);

  doc.font('Helvetica-Oblique').fontSize(10);
  filterLines.forEach((line) => {
    doc.text(line, { align: 'left' });
    y += 15;
  });

  y += 10;

  doc.font('Helvetica-Bold').fontSize(11);
  let x = startX;
  columns.forEach((col) => {
    doc.text(col.label, x, y, {
      width: col.width,
      lineBreak: false,
      ellipsis: true,
    });
    x += col.width + columnSpacing;
  });

  y += rowHeight;
  doc.font('Helvetica').fontSize(10);
  data.forEach((row) => {
    let x = startX;
    columns.forEach((col) => {
      doc.text(String(row[col.key]), x, y, {
        width: col.width,
        ellipsis: true,
        lineBreak: false,
      });
      x += col.width + columnSpacing;
    });
    y += rowHeight;

    if (y > doc.page.height - 50) {
      doc.addPage();
      y = 50;
    }
  });

  doc.end();
  return await getStream(doc);
};

module.exports = exportToPDF;
