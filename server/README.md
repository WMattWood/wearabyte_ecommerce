# Backend

The server runs on localhost port 4000.

## Endpoints

### Items Endpoints:

| Endpoints                      | HTTP Method | Description                         |
| ------------------------------ | ----------- | ----------------------------------- |
| `/allItems`                    | GET         | Retrieve all items in the database  |
| `/items/id/:id`                | GET         | Get an item by its id               |
| `/items/name/:itemName`        | GET         | Retrieve all items by name          |
| `/items/category/:category`    | GET         | Retrieve all items by category      |
| `/items/location/:bodyLocation`| GET         | Retrieve all items by body location |
| `/items/update/:itemId`        | PATCH       | Update one item quantity in database|

### Companies Endpoints:

| Endpoints                     | HTTP Method | Description                            |
| ----------------------------- | ----------- | -------------------------------------- |
| `/companies`                  | GET         | Retrieve all companies in the database |
| `/company/id/:companyId`      | GET         | Get a company by its id                |
| `/company/name/:companyName`  | GET         | Get a company by its name              |

### Order Endpoints

| Endpoints                     | HTTP Method | Description                         |
| ----------------------------- | ----------- | ----------------------------------- |
| `/orders`                     | GET         | Retrieve all orders in the database |
| `/order/:cartId`              | POST        | Create an order                     |
| `/order/:cartId`              | DELETE      | Delete an order                     |
| `/order/addItem/:cartId`      | POST        | Adds an item in the cart            |
| `/order//subtractItem:cartId` | POST        | Subtracts item in cart              |
| `/order/deleteItem/:cartId`   | DELETE      | Delete item from cart               |
| `/order/updateOrder:cartId`   | PATCH       | Update order details                |
