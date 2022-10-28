import Order from './modules/order.js';
import { items1, items2, items3 } from './modules/item_orders.js';

function orderItems(items) {
  const order = new Order();

  items.forEach((item) => {
    order.addItem(item);
  });

  console.log(order.repr());
  console.log('');
}

function main() {
  orderItems(items1);
  orderItems(items2);
  orderItems(items3);
}

main();