## Library Management Website 
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Library Management Website (INT3202 7)

* 21020282 - Trịnh Kiều Anh 
* 21020011 - Nguyễn Trần Đạt 
* 21020309 - Hồ Thu Giang
* 21020335 - Nguyễn Việt Hưng
* 20020106 - Bùi Hữu Việt Hùng
	
## Technologies
Project is created with:
* Axios version: 1.4.0
* ExpressJS version: 4.18.2
* Bootstrap version: 5.2.3
* ReactJS version: 18.2.0
* Bcrypt version: 5.1.0
* Cassandra: 3.11.15
* Mongodb: 5.5.0
* Mongoose: 7.1.1
* Mysql: 2.18.1
* NodeJS: 18.16.0	
	
## Setup
To run this project, do these steps:
1. Install Mysql workbench, MongoDB, Cassandra.
  Cassandra is difficult to install so you can watch this video https://www.youtube.com/watch?v=hJxlkHafYsQ
2. In Mysql, import 'web_schema.sql' and 'web_data.sql'.

In MongoDB, import 'data.json'.

In Cassandra, after connecting to database like this :
```
$cqlsh
```
Paste these queries in 'CassandraTable.txt'

3. Run cmd in the path of project's folder and run :
```
npx create-react-app client
```

4. Go to client and install:
```
$cd client
$npm i react-router-dom
$npm i antd
$npm i bootstrap
$npm i react-bootstrap
$npm i axios
```

5. Go to server and install:
```
$cd ..
$cd server
$npm init -y
$npm i
$npm i mysql jsonwebtoken cors express body-parser
$npm i mongodb uuid
$npm i mongodb natural
$npm i --save mongoose-fuzzy-search
$npm i fast-levenshtein
$npm i mysql
$npm i mongodb
$npm i cassandra-driver
$npm i bycrypt
```

6. In client, run:

```
npm start
```


7. In server, run:

```
node index.js
```
## GUI
<img src="https://private-user-images.githubusercontent.com/100193117/238424239-481c3cd2-984a-4ea5-a1e9-fe73a6c6d612.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJrZXkxIiwiZXhwIjoxNjg0MTcyMDEyLCJuYmYiOjE2ODQxNzE3MTIsInBhdGgiOiIvMTAwMTkzMTE3LzIzODQyNDIzOS00ODFjM2NkMi05ODRhLTRlYTUtYTFlOS1mZTczYTZjNmQ2MTIucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQUlXTkpZQVg0Q1NWRUg1M0ElMkYyMDIzMDUxNSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyMzA1MTVUMTcyODMyWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YTFlMWE2ZmM4OTU2NmRmMzQ4NDg1NjlkYTUzNjQ1NTIwM2E5NzQ3YzEwYjYxNDczMDMwOGE4OTdlODUzNDVhMSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.01qDcXlmTbSUe4rlV6Ytyb5t9Fr258zcVKn2rTTmh3Q" width="250" alt="Home page" />

## Mô tả về trang web
1. Ở trang đăng ký, người dùng phải nhập đủ thông tin về email và password. Email phải nhập đúng định dạng(có @). password confirm phải nhập trùng với password.
2. Sau khi đăng ký xong, người dùng có thể đăng nhập. Người dùng phải nhập đúng thông tin gồm email và password.
3. Sau khi đăng nhập, trang web sẽ hiển thị từng sản phẩm (sử dụng lazy loading) giúp tăng tốc độ load và giảm tải hệ thống.
4. Người dùng có thể tìm kiếm thông tin trên thanh tìm kiếm (có thể nhập đúng hoặc sai).
5. Người dùng có thể ấn vào biểu tượng cuốn sách để xem những cuốn sách nào đang mượn.
6. Trong trang sách đang mượn, người dùng có thể xem được sách hoặc trả lại nếu muốn.
7. Người dùng có thể ấn vào biểu tượng user để xem thông tin người dùng, có thể đổi mật khẩu, có thể xem được lịch sử sách đã trả.
8. Đối với user là quản trị viên (trường ad trong MySQL = 1) thì có thể thêm được sách và xem thống kê top10 cuốn sách được mượn nhiều nhất.

## Các hệ quản trị cơ sở dữ liệu đã dùng
1. MySQL lưu thông tin người dùng bao gồm: customer_id, email, password, first_name, last_name, phone, address, age, và ad. email và mật khẩu đều được mã hóa SHA2.
2. MongoDB lưu thông tin sách bao gồm: _id, type, name, content.
3. Cassandra lưu lịch sử mượn trả. Gồm 2 bảng muon(muon_id, customer_id, rental_date, book_id); tra(tra_id, customer_id, return_date, book_id).

## Ưu điểm của trang web
1. Hiển thị sách khá nhanh.
2. Sử dụng nhiều hệ quản trị nên có thể sử dụng được ưu điểm của các hệ quản trị đó. 
3. Dữ liệu phân tán giúp tránh bị đánh cắp dữ liêu.
4. Mô hình MICROSEVICE giúp dễ dàng nâng cấp, bảo trì.

## Nhược điểm của trang web
1. Dữ liệu phân tán nên gặp vấn đề đồng bộ hóa dữ liệu.
2. Người dùng có thể mượn 2 cuốn sách giống nhau.
3. Người dùng có phải trả hết tất cả những cuốn sách giống nhau.
