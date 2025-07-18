import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Bar, Line, Pie, Doughnut, Radar
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import '../../css/analytics.css';
import Spinner from 'react-bootstrap/Spinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title
);

const COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
  '#9966FF', '#FF9F40', '#00A676', '#F67019',
  '#FD6F96', '#845EC2', '#0081CF', '#FFC75F'
];

const AnalyticsBlock = ({ title, fetchUrl, chartType, xKey, yKeys }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('chart');

  const token = localStorage.getItem('accesstoken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(fetchUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChartData(res.data || []);
      } catch (err) {
        console.error(`Error fetching ${title}:`, err.message);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl, token, title]);

  const buildChartData = () => {
    if (!Array.isArray(chartData) || chartData.length === 0) return null;

    const labels = chartData.map(item => item[xKey]);
    const datasets = yKeys.map((key, index) => ({
      label: key,
      data: chartData.map(item => item[key]),
      backgroundColor: COLORS[index % COLORS.length],
      borderColor: COLORS[index % COLORS.length],
      fill: chartType === 'line' ? false : true,
      tension: 0.4
    }));

    return {
      labels,
      datasets
    };
  };

  const renderChart = () => {
    const data = buildChartData();
    if (!data) return <p>No chart data available</p>;

    const commonOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: false }
      }
    };

    switch (chartType) {
      case 'bar':
        return <Bar data={data} options={commonOptions} />;
      case 'stackedBar':
        return (
          <Bar
            data={data}
            options={{
              ...commonOptions,
              scales: {
                x: { stacked: true },
                y: { stacked: true }
              }
            }}
          />
        );
      case 'line':
        return <Line data={data} options={commonOptions} />;
      case 'pie':
        return <Pie data={{
          labels: chartData.map(item => item[xKey]),
          datasets: [{
            label: 'Total',
            data: chartData.map(item => item[yKeys[0]]),
            backgroundColor: COLORS
          }]
        }} options={commonOptions} />;
      case 'doughnut':
        return <Doughnut data={{
          labels: chartData.map(item => item[xKey]),
          datasets: [{
            label: 'Total',
            data: chartData.map(item => item[yKeys[0]]),
            backgroundColor: COLORS
          }]
        }} options={commonOptions} />;
      case 'radar':
        return <Radar data={{
          labels: chartData.map(item => item[xKey]),
          datasets: [{
            label: yKeys[0],
            data: chartData.map(item => item[yKeys[0]]),
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 2
          }]
        }} options={commonOptions} />;
      default:
        return <p>Unsupported chart type: {chartType}</p>;
    }
  };

  const renderTable = () => {
    if (!Array.isArray(chartData) || chartData.length === 0) {
      return <p>No table data available</p>;
    }

    const headers = [xKey, ...yKeys];

    return (
      <table className="table table-bordered table-sm text-center">
        <thead className="table-light">
          <tr>
            {headers.map((head, idx) => (
              <th key={idx}>{head.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chartData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (loading) {
    return (
      <div className="chart-card text-center">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  return (
  <div className="chart-card">
    <h5 className="m-0 mb-3 text-center">{title}</h5>
    <div className="chart-container">
      {renderChart()}
    </div>
  </div>
);

};

export default AnalyticsBlock;
