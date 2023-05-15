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
