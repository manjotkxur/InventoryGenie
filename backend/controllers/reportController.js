const getInventoryReport = require('../services/report/getInventoryReport');
const exportToPDF = require('../services/report/export/exportToPDF');

const parseIds = (value) => {
  if (!value) return null;
  return value.split(',').map((v) => parseInt(v)).filter((v) => !isNaN(v));
};


const getReport = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { groupBy } = req.query;

    const filters = {
      locationIds: parseIds(req.query.locations),
      supplierIds: parseIds(req.query.suppliers),
      categoryIds: parseIds(req.query.categories),
    };

    const data = await getInventoryReport(userId, filters, groupBy);

    res.status(200).json({
      groupBy: groupBy || 'product',
      count: data.length,
      data,
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

const downloadReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupBy = 'product' } = req.query;

    const filters = {
      locationIds: parseIds(req.query.locations),
      supplierIds: parseIds(req.query.suppliers),
      categoryIds: parseIds(req.query.categories),

    };

    const data = await getInventoryReport(userId, filters, groupBy);

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found to export' });
    }
    console.log(' Exporting Report as PDF');
    console.log('Group By:', groupBy);
    console.log('Sample Row:', data[0]);

    const pdfBuffer = await exportToPDF(data, groupBy, filters); 

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=inventory_report_${groupBy}.pdf`);
    return res.send(pdfBuffer);

  } catch (error) {
    console.error('Error exporting PDF report:', error);
    res.status(500).json({ error: 'Failed to export PDF report' });
  }
};



module.exports = { getReport, downloadReport };
