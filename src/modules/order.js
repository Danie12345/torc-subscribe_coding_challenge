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

    calculate_totals() {
        this.sales_taxes = this.sum(this.taxes);
        this.total = this.sum(this.totals);
    }

    sum(arr) {
        return arr.reduce((total, el) => total + parseFloat(el), 0).toFixed(2);
    }
}