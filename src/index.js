import Order from "./modules/order.js";
import { items1, items2, items3 } from "./modules/item_orders.js";

function order_items(items) {
    const order = new Order();

    items.forEach((item) => {
        order.add_item(item);
    });

    console.log(order.repr());
    console.log('');
}

function main() {
    order_items(items1);
    order_items(items2);
    order_items(items3);
}

main();