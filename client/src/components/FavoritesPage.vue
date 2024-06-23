<template>
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">返回</button>
    <div class="favorites-page">
        <h2>我的收藏</h2>

        <div class="module">
            <h3>吃点什么</h3>
            <ul>
                <li v-for="item in foods" :key="item.id">{{ item.title }}</li>
            </ul>
        </div>

        <div class="module">
            <h3>喝点什么</h3>
            <ul>
                <li v-for="item in drinks" :key="item.id">{{ item.title }}</li>
            </ul>
        </div>

        <div class="module">
            <h3>点点穴</h3>
            <ul>
                <li v-for="item in acupoints" :key="item.id">{{ item.title }}</li>
            </ul>
        </div>

        <div class="module">
            <h3>热帖</h3>
            <ul>
                <li v-for="item in hotPosts" :key="item.id">{{ item.title }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 假设这些数据来自收藏
            foods: [
                { id: 1, title: '苹果沙拉' },
                { id: 2, title: '香蕉松饼' },
            ],
            drinks: [
                { id: 3, title: '绿茶' },
                { id: 4, title: '蜂蜜柠檬水' },
            ],
            acupoints: [
                { id: 5, title: '合谷穴' },
                { id: 6, title: '太冲穴' },
            ],
            hotPosts: [
                { id: 7, title: '中医养生的好处' },
                { id: 8, title: '如何调理身体' },
            ]
        };
    },
    methods: {
        goBack() {
            // 使用 Vue Router 导航回 home 页面
            this.$router.push({ path: '/profile' });
        }
    }
};
</script>

<style scoped>
/* 通用样式 */
.favorites-page {
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
    text-align: left;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.module {
    margin-bottom: 30px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.module h3 {
    margin-bottom: 10px;
    color: #333;
    font-size: 18px;
}

.module ul {
    list-style-type: none;
    padding: 0;
}

.module li {
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
    color: #555;
    transition: color 0.3s ease;
}

.module li:hover {
    color: #007bff;
}

.back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: #0056b3;
}
</style>
