import React, { useState } from 'react';
import analyticsConfig from '../api/analyticsConfig';
import AnalyticsBlock from '../components/analytics/AnalyticsBlock';
import '../css/analytics.css';


const Analytics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const chartsPerPage = 4;

  const totalPages = Math.ceil(analyticsConfig.length / chartsPerPage);

  const indexOfLastChart = currentPage * chartsPerPage;
  const indexOfFirstChart = indexOfLastChart - chartsPerPage;
  const currentCharts = analyticsConfig.slice(indexOfFirstChart, indexOfLastChart);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">ANALYTICS</h2>
      <div className="row">
        {currentCharts.map(chart => (
          <AnalyticsBlock
            key={chart.id}
            chartType={chart.chartType}
            fetchUrl={chart.fetchUrl}
            xKey={chart.xKey}
            yKeys={chart.yKeys}
            title={chart.title}
          />
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-outline-primary"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Analytics;
