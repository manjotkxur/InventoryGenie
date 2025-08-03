const endpointMap = {
  addProduct: {
    method: "POST",
    url: "/api/products",
  },
  updateProduct: {
    method: "PUT",
    url: "/api/products",
  },
  deleteProduct: {
    method: "DELETE",
    url: "/api/products",
  },
  addSupplier: {
    method: "POST",
    url: "/api/suppliers",
  },
  updateSupplier: {
    method: "PUT",
    url: "/api/suppliers",
  },
  deleteSupplier: {
    method: "DELETE",
    url: "/api/suppliers",
  },
  addCategory: {
    method: "POST",
    url: "/api/categories",
  },
  updateCategory: {
    method: "PUT",
    url: "/api/categories",
  },
  deleteCategory: {
    method: "DELETE",
    url: "/api/categories",
  },
  addLocation: {
    method: "POST",
    url: "/api/locations",
  },
  updateLocation: {
    method: "PUT",
    url: "/api/locations",
  },
  deleteLocation: {
    method: "DELETE",
    url: "/api/locations",
  },
  addStockMovement: {
    method: "POST",
    url: "/api/stock-movements",
  },
  updateStockMovement: {
    method: "PUT",
    url: "/api/stock-movements",
  },
  deleteStockMovement: {
    method: "DELETE",
    url: "/api/stock-movements",
  },


  getCategories: {
    method: "GET",
    url: "/api/categories"
  },
  getSuppliers: {
    method: "GET",
    url: "/api/suppliers"
  },
  getLocations: {
    method: "GET",
    url: "/api/locations"
  }
};

export const getEndpointFromAction = (actionType) => endpointMap[actionType] || null;

export { endpointMap };
