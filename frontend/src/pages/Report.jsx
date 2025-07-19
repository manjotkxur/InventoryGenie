import React, { useState } from "react";
import axios from "axios";
import ReportFilters from "../components/report/ReportFilters";
import ReportTable from "../components/report/ReportTable";
import ExportPDFButton from "../components/report/ExportPDFButton";
import { useAuth } from "../context/AuthContext";
import "../css/report.css";

const Report = () => {
const { user, accesstoken } = useAuth(); 
  console.log("[Report] Auth User:", user);
  console.log("[Report] Access Token:", accesstoken);

  const [filters, setFilters] = useState({
    location: [],
    supplier: [],
    category: [],
    groupBy: "product",
  });

  const [reportData, setReportData] = useState([]);

const fetchReport = async () => {
  const queryParams = new URLSearchParams(); 

  if (filters.location?.length)
    queryParams.append("locations", filters.location.join(","));
  if (filters.supplier?.length)
    queryParams.append("suppliers", filters.supplier.join(","));
  if (filters.category?.length)
    queryParams.append("categories", filters.category.join(","));
  if (filters.groupBy)
    queryParams.append("groupBy", filters.groupBy);

  try {
    console.log("Filters being sent:", filters);
    console.log("Request URL:", `http://localhost:5000/api/report?${queryParams.toString()}`);

    const res = await axios.get(
      `http://localhost:5000/api/report?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      }
    );

    console.log("Fetched report data:", res.data);
    console.log("Is Array:", Array.isArray(res.data));

    setReportData(res.data.data || []);

  } catch (err) {
    console.error("Report fetch failed:", err);
  }
};


const handleExport = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/reports/download`,
      {
        params: { format: 'pdf', ...filters },
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
        responseType: 'blob',
      }
    );

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Inventory_Report.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting PDF:', error);
  }
};



  return (
    <div className="container mt-4">
      <h2 className="mb-4">REPORT</h2>

      <ReportFilters
        filters={filters}
        setFilters={setFilters}
        onApply={fetchReport}
      />

      <div className="export-buttons" >
        <ExportPDFButton filters={filters} groupBy={filters.groupBy} />
      </div>

      {reportData.length > 0 ? (
        <ReportTable data={reportData} />
      ) : (
        <div className="no-data">
          No report data. Adjust filters and click <strong>"Generate Report"</strong>.
        </div>
      )}
    </div>
  );
};

export default Report;
