import React from 'react';
import Table from 'react-bootstrap/Table';
import '../../css/report.css';

const ReportTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center">No data available. Please generate a report.</p>;
  }

  return (
    <div className="report-table-wrapper">
      <Table striped bordered hover responsive className="report-table">
        <thead className="table-primary">
          <tr>
            <th>Product</th>
            <th>Location</th>
            <th>Supplier</th>
            <th>Category</th>
            <th>Unit Price</th>
            <th>Stock</th>
            <th>Inventory Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.product}</td>
              <td>{item.location}</td>
              <td>{item.supplier}</td>
              <td>{item.category}</td>
              <td>{item.unit_price}</td>
              <td>{item.stock}</td>
              <td>{item.inventory_value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReportTable;