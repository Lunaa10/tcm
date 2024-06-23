const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const util = require('util');

// MySQL 连接池配置
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tcm',
    connectionLimit: 10
});

// 将 pool.query 方法转换为 Promise 形式
const query = util.promisify(pool.query).bind(pool);

// 注册接口
router.post('/register', async (req, res) => {
    console.log('Request body:', req.body); // 打印请求体
    const { username, password } = req.body;

    console.log('Received registration request:', req.body);
    if (!username || !password) {
        return res.status(400).json({ message: '用户名和密码是必填项' });
    }
    try {
        // 检查用户名是否已存在
        const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length > 0) {
            return res.status(400).json({ message: '用户名已存在' });
        }

        // 加密密码
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 插入新用户数据
        await query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).json({ message: '注册成功' });
    } catch (error) {
        console.error('注册失败:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// 登录接口
// 登录接口
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 查找用户
        const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(404).json({ error: '用户不存在' });
        }

        const user = rows[0];

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: '密码不正确' });
        }

        // 登录成功，返回用户信息
        res.status(200).json({
            message: '登录成功',

            nickname: user.username // 使用用户名作为昵称
        });
    } catch (error) {
        console.error('登录失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});


module.exports = router;
