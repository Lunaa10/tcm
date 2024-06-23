<template>
    <div class="foods-page">
        <!-- 返回按钮 -->
        <button @click="goBack" class="back-button">返回</button>
        <h1>今日食谱</h1>
        <div class="food-grid">
            <div class="food-item" v-for="food in foods" :key="food.name">
                <img :src="food.image" :alt="food.name" class="food-image" />
                <div class="food-name">{{ food.name }}</div>
                <div class="food-category">{{ food.category }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FoodsPage',
    data() {
        return {
            foods: []
        };
    },
    mounted() {
        this.fetchFoods();
    },
    methods: {
        async fetchFoods() {
            try {
                const response = await axios.get('http://localhost:3000/api/foods');
                this.foods = response.data;
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        },
        goBack() {
            // 使用 Vue Router 导航回 home 页面
            this.$router.push({ path: '/home' });
        }
    }

}
</script>

<style scoped>
.foods-page {
    text-align: center;
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

.foods-page h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.food-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 每行两列 */
    gap: 20px;
    justify-items: center;
}

.food-item {
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    /* 让每个食物项占据父容器的宽度 */
}

.food-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
}

.food-name {
    font-size: 18px;
    font-weight: bold;
}

.food-category {
    font-size: 14px;
    color: #888;
}
</style>
