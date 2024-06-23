<template>
    <div class="drinks-page">
        <!-- 返回按钮 -->
        <button @click="goBack" class="back-button">返回</button>
        <h1>喝杯茶吧</h1>
        <div v-if="loading">加载中...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <ul v-if="!loading && !error">
            <li v-for="drink in drinks" :key="drink.id" class="drink-item">
                <h2>{{ drink.teaname }}</h2>
                <p><strong>配料:</strong> {{ drink.collocation }}</p>
                <p><strong>制作方法:</strong> {{ drink.making }}</p>
                <p><strong>功效:</strong> {{ drink.efficacy }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DrinksPage',
    data() {
        return {
            drinks: [],
            loading: true,
            error: null
        };
    },
    created() {
        this.fetchDrinks();
    },
    methods: {
        async fetchDrinks() {
            try {
                const response = await axios.get('http://localhost:3000/api/drinks');
                this.drinks = response.data;
            } catch (error) {
                this.error = '获取数据失败，请稍后重试。';
            } finally {
                this.loading = false;
            }
        },
        goBack() {
            // 使用 Vue Router 导航回 home 页面
            this.$router.push({ path: '/home' });
        }
    }
};
</script>

<style scoped>
.drinks-page {
    padding: 20px;
    position: relative;
}

.back-button {
    position: absolute;
    /* 固定位置 */
    top: 10px;
    /* 距离顶部10px */
    left: 10px;
    /* 距离左侧10px */
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

.drink-item {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
}

.error {
    color: red;
}
</style>
