import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/getDashboardSummary";
import "../css/UpdateInventory.css";
import { useAuth } from "../context/AuthContext";

const UpdateInventory = () => {
  const [summary, setSummary] = useState({});
  const { accesstoken } = useAuth();
  const [expandedCard, setExpandedCard] = useState(null);

  const cards = [
    { id: "addProduct", title: "Add Product" },
    { id: "deleteProduct", title: "Delete Product" },
    { id: "addSupplier", title: "Add Supplier" },
    { id: "deleteSupplier", title: "Delete Supplier" },
    { id: "addCategory", title: "Add Category" },
    { id: "deleteCategory", title: "Delete Category" },
    { id: "addLocation", title: "Add Location" },
    { id: "deleteLocation", title: "Delete Location" },
    { id: "addStock", title: "Add Stock Movement" },
    { id: "deleteStock", title: "Delete Stock Movement" },
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary(accesstoken);
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    fetchSummary();
  }, [accesstoken]);

  return (
    <div className="update-inventory-container">
      <h2 className="update-inventory-title">Update Inventory</h2>
      <div className="card-grid">
        {cards.map(({ id, title }) => (
          <div key={id} className={`update-card ${expandedCard === id ? "expanded" : ""}`}>
            <div className="card-header" onClick={() => toggleCard(id)}>
              {title}
            </div>
            {expandedCard === id && (
              <div className="card-body">
                <form>
                  <input type="text" placeholder="Enter details..." />
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateInventory;
