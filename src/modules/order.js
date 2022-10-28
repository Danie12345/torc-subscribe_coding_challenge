import Item from './items.js';

export default class Order {
  constructor() {
    this.items = [];
    this.taxes = [];
    this.totals = [];
  }

  addItem(description) {
    const item = new Item(description);
    this.taxes.push(item.taxes);
    this.totals.push(item.total);
    this.items.push(item);
  }

  repr() {
    this.calculateTotals();
    let receipt = '';
    this.items.forEach((item) => {
      receipt += `${item.repr()}\n`;
    });
    receipt += `Sales Taxes: ${this.sales_taxes}\nTotal: ${this.total}`;
    return receipt;
  }

  calculateTotals() {
    this.sales_taxes = this.sum(this.taxes);
    this.total = this.sum(this.totals);
  }

  sum(arr) {
    return arr.reduce((total, el) => total + parseFloat(el), 0).toFixed(2);
  }
}