npx sequelize-cli model:generate --name User --attributes "id_user:integer, user_name:string, email:string, phone_number:string, address:string, password:string, profile_pic:blob, role:string, coin_user:integer"
input di body postman:
{
"user_name": "Bimo",
"email": "Bimo@gmail.com",
"phone_number": "080987654321",
"address": "Mataram",
"password": "BimBim",
"profile_pic": null,
"role": "user",
"coin_user": 300
}
{
"user_name": "Fika",
"email": "Fika@gmail.com",
"phone_number": "080987654321",
"address": "Surabaya",
"password": "Fika123",
"profile_pic": null,
"role": "user",
"coin_user": 900
}

{
"email": "Bimo@gmail.com",
"password": "BimBim"
}
{
"email": "Fika@gmail.com",
"password": "Fika123"
}

npx sequelize-cli model:generate --name Product --attributes "product_name:string, description:string, coin:integer, min_product:integer, product_pic:string, unit:string"

inputkan di DBeaver:
use sarange_online;
INSERT IGNORE INTO products (product_name, description, coin, min_product, product_pic, unit, createdAt, updatedAt)
VALUES
('Botol kaca', 'Botol kaca ukuran kecil atau sedang', 75, 5, 'https://shorturl.at/prsP4', 'buah', NOW(), NOW());
