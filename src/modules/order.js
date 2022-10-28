import Item from "./items.js";

export default class Order {
    constructor() {
        this.items = [];
        this.taxes = [];
        this.totals = [];
    }
}