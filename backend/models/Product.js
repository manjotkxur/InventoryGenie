class Product {
  constructor(id, user_id, name, description, price, quantity, supplier_id, created_at) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.supplier_id = supplier_id;
    this.created_at = created_at;
  }
}

module.exports = Product;