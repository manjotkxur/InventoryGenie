import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useAuth } from '../../context/AuthContext';

const ExportPDFButton = ({ filters, groupBy }) => {
  const { accesstoken } = useAuth();

  const handleExport = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (groupBy) queryParams.append('groupBy', groupBy);
      queryParams.append('format', 'pdf');

        if (filters.location?.length)
    queryParams.append("locations", filters.location.join(","));
  if (filters.supplier?.length)
    queryParams.append("suppliers", filters.supplier.join(","));
  if (filters.category?.length)
    queryParams.append("categories", filters.category.join(","));


      const response = await axios.get(
        `http://localhost:5000/api/report/download?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
          responseType: 'blob',
        }
      );

      saveAs(response.data, `inventory_report_${groupBy || 'product'}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  return (
    <Button className="btn-outline-pink" onClick={handleExport}>
      Export PDF
    </Button>
  );
};

export default ExportPDFButton;
