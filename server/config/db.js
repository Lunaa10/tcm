// server/config/db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost:3306', // 数据库地址
    user: 'root', // 数据库用户名
    password: '123456', // 数据库密码
    database: 'tcm' // 数据库名称

});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
