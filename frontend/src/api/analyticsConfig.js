const analyticsConfig = [
  {
    id: 1,
    title: 'Monthly Movement Stats',
    fetchUrl: 'http://localhost:5000/api/analytics/monthly-movement-stats',
    chartType: 'bar', 
    xKey: 'month',
    yKeys: ['inbound', 'outbound'],
  },
  {
    id: 2,
    title: 'Movement Summary',
    fetchUrl: 'http://localhost:5000/api/analytics/movement-summary',
    chartType: 'pie',
    xKey: 'movement_type',
    yKeys: ['count'],
  },
    {
    id: 3,
    title: 'Stock per Product',
    fetchUrl: 'http://localhost:5000/api/analytics/stock-per-product',
    chartType: 'bar',
    xKey: 'total_stock',
    yKeys: ['id'],
  }
 ,
  {
    id: 4,
    title: 'Monthly Sales Growth',
    fetchUrl: 'http://localhost:5000/api/analytics/chart/category-distribution',
    chartType: 'line',
    xKey: 'category',
    yKeys: ['revenue'],
  },
  {
    id: 5,
    title: 'Product Turnover Rate',
    fetchUrl: 'http://localhost:5000/api/analytics/product-turnover-rate',
    chartType: 'radar',
    xKey: 'id',
    yKeys: ['total_stock'],
  },

   {
    id: 6,
    title: 'Top-Selling Products',
    fetchUrl: 'http://localhost:5000/api/analytics/top-stocked-products',
    chartType: 'line',
    xKey: 'product_id',
    yKeys: ['stock'],
  },
  {
    id: 7,
    title: 'Stock per Supplier',
    fetchUrl: 'http://localhost:5000/api/analytics/stock-per-supplier',
    chartType: 'bar',
    xKey: 'supplier',
    yKeys: ['total_stock'],
  },
  {
    id: 8,
    title: 'Stock per Location',
    fetchUrl: 'http://localhost:5000/api/analytics/stock-per-location',
    chartType: 'doughnut',
    xKey: 'location',
    yKeys: ['total_stock'],
  },
];

export default analyticsConfig;
