const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL 连接配置
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tcm'
});

// 连接数据库
connection.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// 定义获取食谱数据的路由
router.get('/', (req, res) => {
    const query = 'SELECT name, type, image_url AS image FROM foods';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching foods:', err);
            res.status(500).send('Error fetching foods');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
