class StockMovement {
  constructor(id, user_id, product_id, quantity, movement_type, location_id, created_at) {
    this.id = id;
    this.user_id = user_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.movement_type = movement_type; 
    this.location_id = location_id;
    this.created_at = created_at;
  }
}

module.exports = StockMovement;