export default class Item {
    constructor(description) {
        const { name, imported, basic_applies, quantity, raw_price } = this.parse_description(description);
        this.name = name;
        this.imported = imported;
        this.basic_applies = basic_applies;
        this.quantity = quantity;
        this.total = this.calculate_taxes(raw_price);
    }

    repr() {
        return `${this.quantity} ${this.name}: ${this.total}`;
    }
}