1. USER:
(1) POST https://final-sarange-eff62c954ab5.herokuapp.com/register
{
"user_name":"nama user",
"email":"email user"
"password":"password user"
}

(2) POST https://final-sarange-eff62c954ab5.herokuapp.com/login
{
"email":"email user"
"password":"password user"
}

(3) GET https://final-sarange-eff62c954ab5.herokuapp.com/homepage
(4) GET https://final-sarange-eff62c954ab5.herokuapp.com/profile
(5) PATCH https://final-sarange-eff62c954ab5.herokuapp.com/profile
{
"user_name":"nama user baru", 
"phone_number":"no hp user", 
"address":"alamat rumah user"
}

2. PRODUCT
(1) GET https://final-sarange-eff62c954ab5.herokuapp.com/products
(2) GET https://final-sarange-eff62c954ab5.herokuapp.com/product/:id

3. CART 
(1) POST https://final-sarange-eff62c954ab5.herokuapp.com/cart
{"id_product": number}
(2) GET https://final-sarange-eff62c954ab5.herokuapp.com/cart
(3) PATCH https://final-sarange-eff62c954ab5.herokuapp.com/cart
{"cartItems":
[
{"id_cart": number, "total_product": number, "is_check": boolean}
note: bisa satu id_cart bisa beberapa id_cart yg diupdate langsung
]
}
(4) DELETE https://final-sarange-eff62c954ab5.herokuapp.com/cart/:id_cart
(5) DELETE https://final-sarange-eff62c954ab5.herokuapp.com/cart

4. TRANSACTION
(1) POST https://final-sarange-eff62c954ab5.herokuapp.com/transaction
{
"cartItems": [
{"id_cart": number, "pickup_date": "YYYY-MM-DD"} 
]
}
(2) GET https://final-sarange-eff62c954ab5.herokuapp.com/transaction
(3) GET https://final-sarange-eff62c954ab5.herokuapp.com/transaction/process
(4) GET https://final-sarange-eff62c954ab5.herokuapp.com/transaction/confirm
(5) GET https://final-sarange-eff62c954ab5.herokuapp.com/transaction/success
(6) PATCH https://final-sarange-eff62c954ab5.herokuapp.com/transaction
{
"id_transaction": number
}
(7) PATCH https://final-sarange-eff62c954ab5.herokuapp.com/transaction/:id

5. REDEEM
POST https://final-sarange-eff62c954ab5.herokuapp.com/redeem
{
"coin_redeem": number,
"e_wallet": "e-wallet",
"money_get": number,
"phone_number": "nomor handphone user"
}

6. COIN HISTORY
GET https://final-sarange-eff62c954ab5.herokuapp.com/coin-history
