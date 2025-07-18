class Supplier {
  constructor(id, user_id, name, contact_email, phone, created_at, locations = []) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.contact_email = contact_email;
    this.phone = phone;
    this.created_at = created_at;
    this.locations = locations;
  }
}

module.exports = Supplier;
