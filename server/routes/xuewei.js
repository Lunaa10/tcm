const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const pool = require('./pool');

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

router.get('/', (req, res) => {
    pool.query('SELECT * FROM xuewei', (error, results) => {
        if (error) {
            console.error('获取穴位数据失败:', error);
            res.status(500).json({ error: '获取数据失败' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;  // 确保导出的是 router