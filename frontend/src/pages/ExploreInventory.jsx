import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../css/ExploreInventory.css";

const ExploreInventory = () => {
  const { accesstoken } = useAuth();

  const cards = [
    { title: "Get Product", key: "product" },
    { title: "Get Category", key: "category" },
    { title: "Get Supplier", key: "supplier" },
    { title: "Get Location", key: "location" },
    { title: "Get Stock Movement", key: "stockmovement" },
  ];

  const apiRoutes = {
    product: "http://localhost:5000/api/products",
    category: "http://localhost:5000/api/categories",
    supplier: "http://localhost:5000/api/suppliers",
    location: "http://localhost:5000/api/locations",
    stockmovement: "http://localhost:5000/api/stock",
  };

  const [expandedCard, setExpandedCard] = useState(null);
  const [formData, setFormData] = useState({});
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState(null);

  const toggleCard = (key) => {
    setExpandedCard((prev) => (prev === key ? null : key));
    setFetchedData([]);
    setError(null);
  };

  const handleChange = (e, key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (cardKey) => {
    try {
      const response = await axios.get(`${apiRoutes[cardKey]}/${formData[cardKey]?.id}`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      const result = Array.isArray(response.data) ? response.data : [response.data];
      const sorted = result.sort((a, b) => a.id - b.id);
      setFetchedData(sorted);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data.");
      setFetchedData([]);
    }
  };

  const handleFetchAll = async (cardKey) => {
    try {
      const response = await axios.get(apiRoutes[cardKey], {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      const sorted = response.data.sort((a, b) => a.id - b.id);
      setFetchedData(sorted);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data.");
      setFetchedData([]);
    }
  };

  const renderTable = () => {
    if (!fetchedData || fetchedData.length === 0) return null;

    const headers = Object.keys(fetchedData[0]);

    return (
      <table className="explore-table">
        <thead>
          <tr>
            {headers.map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fetchedData.map((row, i) => (
            <tr key={i}>
              {headers.map((head) => (
                <td key={head}>{String(row[head])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="explore-container">
      <h2 className="explore-title">Explore Inventory</h2>
      <div className="explore-card-grid">
        {cards.map((card, index) => (
          <div className="explore-card" key={index} onClick={() => toggleCard(card.key)}>
            <div className="explore-card-title">{card.title}</div>
            {expandedCard === card.key && (
              <div className="card-form" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  name="id"
                  placeholder="Enter ID"
                  value={formData[card.key]?.id || ""}
                  onChange={(e) => handleChange(e, card.key)}
                />
                <button onClick={() => handleSubmit(card.key)}>OK</button>
                <button onClick={() => handleFetchAll(card.key)}>ALL</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}
      {renderTable()}
    </div>
  );
};

export default ExploreInventory;
