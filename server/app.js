// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// // 允许跨域请求
// app.use(cors());

// // 解析 JSON 请求体
// app.use(express.json());

// // 使用 /api/users 路由
// const usersRouter = require('./routes/users');
// app.use('/api', usersRouter);

// // 使用 /api/foods 路由
// const foodsRouter = require('./routes/foods');
// app.use('/api', foodsRouter);

// // 使用 /api/drinks 路由
// const drinksRouter = require('./routes/drinks');
// app.use('/api', drinksRouter);

// // 使用 /api/xuewei 路由
// const xueweiRouter = require('./routes/xuewei');
// app.use('/api', xueweiRouter);

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// 允许跨域请求
app.use(cors());

// 解析 JSON 请求体
app.use(express.json());

// 提供静态文件
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 使用 /api/users 路由
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

// 使用 /api/foods 路由
const foodsRouter = require('./routes/foods');
app.use('/api/foods', foodsRouter);

// 使用 /api/drinks 路由
const drinksRouter = require('./routes/drinks');
app.use('/api/drinks', drinksRouter);

// 使用 /api/xuewei 路由
const xueweiRouter = require('./routes/xuewei');
app.use('/api/xuewei', xueweiRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
