# BamazonApp



### Purpose

This app serves multiple purposes:

    - Utilizing Command Line Interface (CLI) in executing user input/commands
    - Node.js implementation for CLI interface
    - Database manipulation with MySQL



### What Does The App Do???

This app serves as a CLI version of an online store. When the app is executed, the user is able
to shop from a list of items presented by the store. User input is incorporated as they must select 
the item they would like to purchase as well as the amount. 



### Link For App Explanation and Demonstration

Part One: Bamazon Customer
https://drive.google.com/file/d/17UNYWc5tJ0b3Jb_wKtab0Vh-dV5PtSFm/view

Part Two: Bamazon Customer Continued
https://drive.google.com/file/d/1729JSAMU_wLlNquEFbJSj-u1O2PaHRfC/view

Part Three: Bamazon Manager
https://drive.google.com/file/d/1D9LOL_3kvnuQyOT17KUNEOpoVz4PxeJ1/view

### Initial Goals of App Execution (Customer)

The Bamazon app should be able to do the following:

    - Incorporate user input/selection
    - Show a table list of items for purchase (showing the user the id, product names, and prices)
    - User must not be able to purchase more units than what is available in the store
    - App should only accept valid product ids to start ordering process
    - When an order is successful, the user is informed to what they purchased, how many units, as well as the total cost
    - On the backend, the database should update to reflect the changes of the inventory 
        (ex: If the store's database initially has 10 units of an item and the user purchases 7, the database should update to show 3 units left)

### Initial Goals of App Execution (Manager)

The Bamazon app should be able to do the following:

    - Incorporate user input/selection
    - Show a table list of items for purchase (showing the user the id, product names, prices, and quantity)
    - User should be able to view separate tables for all items and low inventory items
    - On the backend, the database should update to reflect the changes of the products 
        (ex: If the store's manager adds a product to the store, the database table should now show the new item(s) and attributes)
    - On the backend, the database should update to reflect the changes of the inventory 
        (ex: If the store's database initially has 10 units and the manager adds 5 units, the database should update to show 15 units in stock)


### Future Scope (Customer)

    Below are possible features or updates that can improve the application

    - User login or recognition
        > Currently the shopper is anonymous. I would like to have the user enter their name or have a login feature
    
    - Shopping Cart
        > The app, as it is now, only lets the shopper purchase one item at a time. Would be a great feature for
        the user to be able to stock purchases or make multiple purchases in one visit.

    - Complexity
        > Only 14 items exist in the database currently. Adding more items to table can allow for more options like a user product search.

    
    - Utilizing Columns More
        > Be able to give the user sorting and searching options. So, they can sort items from lowest-highest price, search/see only items from
        a specific department

    
    - Time Stamped Receipts
        > Utilize JS features to document exact date and time of purchase as well as a receipt id that can be stored. This can allow for future
        feature of 30-day return or cash back.


### Future Scope (Manager)

    Below are possible features or updates that can improve the application

    - Manager Password or Authorization
        > Being that the store items are being manipulated, it's a practical real-world application to have the manager feature password protected

        > Either can be a predetermined password or a validation from an employee id database table

    - Budget 
        > Ways of incorporating budget to restrict how many items can be added per department (could reset every week, month, etc)

        > Preset limits on quantity of an item that can be in stock

    - Remove Stock
        > Provide another alternative to remove stock from the store and update database accordingly

        > Could have budgetting implications (company takes loss on items, sold on discount and money from sale added back into dept budget)

    - Tracking
        > Stamp on transactions that tell which manager added to inventory and when 

        > Stamp to tell when an item was last stocked 