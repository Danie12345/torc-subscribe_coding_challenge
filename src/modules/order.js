import Item from "./items.js";

export default class Order {
    constructor() {
        this.items = [];
        this.taxes = [];
        this.totals = [];
    }

    add_item(description) {
        const item = new Item(description);
        this.taxes.push(item.taxes);
        this.totals.push(item.total);
        this.items.push(item);
    }
}