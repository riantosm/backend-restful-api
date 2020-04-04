# Point of sales (Backend)
POS-RESTfulAPI is a Point of Sale systems with restful api. The main features are:
- Login and Register with JWT.
- CURD Products, Categories and Users.
- Add/Reduce products order.
- File Image Upload on product.
- Search product by name.
- Sort product by name, category, date updated.
- Products page pagination.
- Allowed CORS.
- Reporting on income today, yearly, and orders weekly.


Use the package manager `http://localhost:3000/api/v1`

## .env
`SERVER_PORT = 3001
DB_HOST = "localhost"
DB_USER = "root"
DB_PASS = ""
DB_NAME = "arkademy_latihan_3"
PRIVATE_KEY = "coba-coba"
TOKENS = ""
TOKENS_ADMIN = ""
USER_ID = ""`

### Login

If you don't have an account, tell the admin to register an account.

- `http://localhost:3000/api/v1/login`
  ###### x-www-form-urlencoded' key-Value Edit : 
       username: admin
       password: admin
  and you get a token for 'application/x-www-form-urlencoded'
- `http://localhost:3000/api/v1/user`

  For CRUD user, use :
   ###### `x-www-form-urlencoded' key-Value Edit : 
         name_user:
         username:
         password:
    
  - View all user, use GET on 
  `http://localhost:3000/api/v1/user`

  - Add new user, use POST on 
  `http://localhost:3000/api/v1/user`
    
  - View detail user, use GET on 
  `http://localhost:3000/api/v1/user/id_user`
    
  - Edit user, use PATCH on 
  `http://localhost:3000/api/v1/user/id_user`
    
  - Delete user, use DELETE on 
  `http://localhost:3000/api/v1/user/id_user`
    
If you are logged in, you can access
- `http://localhost:3000/api/v1/user`
- `http://localhost:3000/api/v1/category`
- `http://localhost:3000/api/v1/product`
- `http://localhost:3000/api/v1/cart`
- `http://localhost:3000/api/v1/history`

## List of Endpoint
- CRUD Category (`http://localhost:3000/api/v1/category`)

  For CRUD category, use :
   ###### `x-www-form-urlencoded' key-Value Edit : 
         name_category:

  - View all category, use GET on 
  `http://localhost:3000/api/v1/category`

  - Add new category, use POST on 
  `http://localhost:3000/api/v1/category`
    
  - View category, use GET on 
  `http://localhost:3000/api/v1/category/id_category`
    
  - Edit category, use PATCH on 
  `http://localhost:3000/api/v1/category/id_category`
    
  - Delete category, use DELETE on 
  `http://localhost:3000/api/v1/category/id_category`

- CRUD Product (`http://localhost:3000/api/v1/product`)

  For CRUD product, use :
   ###### `form-data' key-Value Edit : 
         name_product:
         desc_product:
         price_product:
         image(file):
         id_category:

  - View all product, use GET on 
  
    `http://localhost:3000/api/v1/product`

  - Add new product, use POST on 
  
    `http://localhost:3000/api/v1/product`

  - Add stock product, use GET on
  `http://localhost:3000/api/v1/product/id_product`
    
  - View product, use GET on 
  `http://localhost:3000/api/v1/product/id_product`
    
  - Edit product, use PATCH on 
  `http://localhost:3000/api/v1/product/id_product`
    
  - Delete product, use DELETE on 
  `http://localhost:3000/api/v1/product/id_product`

- CRUD cart (`http://localhost:3000/api/v1/cart`)

  For CRUD cart, use :
   ###### `x-www-form-urlencoded' key-Value Edit : 
         name_customer:

  For ADD cart detail, use :
   ###### `x-www-form-urlencoded' key-Value Edit : 
         id_product:
         qty:
    
  - View all cart, use GET on 
  `http://localhost:3000/api/v1/cart`

  - Add new cart, use POST on 
  `http://localhost:3000/api/v1/cart`
    
  - View cart, use GET on 
  `http://localhost:3000/api/v1/cart/id_cart`
    
  - Add cart detail, use POST on 
  `http://localhost:3000/api/v1/cart/id_cart`

  - View cart detail, use GET on
  `http://localhost:3000/api/v1/cart/id_cart`

  - Pay a cart, use GET on
  `http://localhost:3000/api/v1/cart/id_cart/pay`

  - View cart payed, use GET on
  `http://localhost:3000/api/v1/cart/id_cart/payed`

- VIEW history (`http://localhost:3000/api/v1/history`)

  - View income Today `http://localhost:3000/api/v1/history/today`

  - View total order Week `http://localhost:3000/api/v1/history/week`

  - View income Year `http://localhost:3000/api/v1/history/year`




