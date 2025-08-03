// frontend/src/api/formConfig.js

const formConfig = {
  addProduct: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "sku", label: "SKU", type: "text", required: true },
    { name: "unit_price", label: "Price", type: "number", required: true },
    { name: "description", label: "Description", type: "text", required: true },
    {
      name: "category_id",
      label: "Category",
      type: "select",
      required: true,
      fetchOptions: "getCategories",
    },
    {
      name: "location_id",
      label: "Location",
      type: "select",
      required: true,
      fetchOptions: "getLocations",
    },
    {
      name: "supplier_id",
      label: "Supplier",
      type: "select",
      required: true,
      fetchOptions: "getSuppliers",
    },
    {
      name: "user_id",
      label: "User ID",
      type: "number",
      required: true,
    }
  ],

  updateProduct: [
    { name: 'id', label: 'Product ID', type: 'number', required: true },
    { name: 'name', label: 'Product Name', type: 'text', required: false },
    { name: 'description', label: 'Description', type: 'text', required: false },
    { name: 'price', label: 'Price', type: 'number', required: false },
    {
      name: 'category_id',
      label: 'Category',
      type: 'select',
      required: false,
      fetchOptions: 'getCategories'
    },
    {
      name: 'supplier_id',
      label: 'Supplier',
      type: 'select',
      required: false,
      fetchOptions: 'getSuppliers'
    },
    {
      name: 'location_id',
      label: 'Location',
      type: 'select',
      required: false,
      fetchOptions: 'getLocations'
    },
    { name: 'stock', label: 'Stock', type: 'number', required: false }
  ],

  deleteProduct: [
    { name: 'id', label: 'Product ID', type: 'number', required: true }
  ],

  addCategory: [
  {
    name: 'user_id',
    label: 'User ID',
    type: 'number',
    required: true,
  },
  {
    name: 'name',
    label: 'Category Name',
    type: 'text',
    required: true,
  }
],


  updateCategory: [
    { name: 'id', label: 'Category ID', type: 'number', required: true },
    { name: 'name', label: 'Category Name', type: 'text', required: false }
  ],

  deleteCategory: [
    { name: 'id', label: 'Category ID', type: 'number', required: true }
  ],

  addSupplier: [
  { name: 'name', label: 'Supplier Name', type: 'text', required: true },
  { name: 'contact', label: 'Contact', type: 'text' },
  { name: 'user_id', label: 'User ID', type: 'number', required: true }  // 👈 Add this
],

  updateSupplier: [
    { name: 'id', label: 'Supplier ID', type: 'number', required: true },
    { name: 'name', label: 'Supplier Name', type: 'text', required: false },
    { name: 'contact_email', label: 'Contact Email', type: 'email', required: false },
    { name: 'contact_phone', label: 'Contact Phone', type: 'text', required: false }
  ],

  deleteSupplier: [
    { name: 'id', label: 'Supplier ID', type: 'number', required: true }
  ],
addLocation: [
  { name: 'name', label: 'Location Name', type: 'text', required: true },
  { name: 'user_id', label: 'User ID', type: 'number', required: true }  // 👈 Add this
],

  deleteLocation: [
    { name: 'id', label: 'Location ID', type: 'number', required: true }
  ],

addStock: [
    {
      name: "product_id",
      label: "Product",
      type: "text", // changed from 'select'
      fetchOptions: "getProducts",
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
    },
    {
      name: "movement_type",
      label: "Movement Type",
      type: "select",
      required: true,
      options: [
        { id: "in", name: "In" },
        { id: "out", name: "Out" },
      ],
    },
    {
      name: "location_id",
      label: "Location",
      type: "select",
      fetchOptions: "getLocations",
      required: false,
    },
    {
      name: "note",
      label: "Note",
      type: "text",
      required: false,
    },
  ],

  deleteStock: [
    {
      name: "id",
      label: "Stock Movement ID",
      type: "number",
      required: true,
    },
],

};

export default formConfig;
