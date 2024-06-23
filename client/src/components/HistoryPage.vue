<template>
    <div class="history-page">
        <!-- 返回按钮 -->
        <button @click="goBack" class="back-button">返回</button>
        
        <!-- 标题 -->
        <h2>历史记录</h2>

        <!-- 模块：吃点什么 -->
        <div class="section">
            <h3>吃点什么</h3>
            <ul>
                <li v-for="item in foods" :key="item.id">{{ item.title }}</li>
            </ul>
        </div>

        <!-- 模块：喝点什么 -->
        <div class="section">
            <h3>喝点什么</h3>
            <ul>
                <li v-for="item in drinks" :key="item.id">{{ item.title }}</li>
            </ul>
        </div>

        <!-- 模块：点点穴 -->
        <div class="section">
            <h3>点点穴</h3>
            <ul>
                <li v-for="item in acupoints" :key="item.id">{{ item.title }}</li>
            </ul>
        </div>

        <!-- 模块：热门推送 -->
        <div class="hot-page">
            <div class="title">热门推送</div>
            <div class="hot-posts">
                <div v-for="post in hotPosts" :key="post.id" class="hot-post" @click="navigateToPost(post)">
                    <img :src="require(`@/assets/images/${post.image}`)" alt="Post Image" class="post-image">
                    <h3 class="post-title">{{ post.text }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'HistoryPage',
    data() {
        return {
            // 模拟的数据，可以从服务器或本地存储中获取实际数据
            foods: [
                { id: 1, title: '健康沙拉' },
                { id: 2, title: '养生粥' },
            ],
            drinks: [
                { id: 3, title: '绿茶' },
                { id: 4, title: '红枣茶' },
            ],
            acupoints: [
                { id: 5, title: '足三里穴' },
                { id: 6, title: '合谷穴' },
            ],
            hotPosts: [
                { id: 828, text: '反佐配伍的典范，始见于张仲景《伤寒杂病论》', image: 'post1.jpg' },
                { id: 286, text: '灸法的作用有哪些', image: 'post2.jpg' },
            ]
        };
    },
    setup() {
        const router = useRouter()

        const navigateToPost = (post) => {
            router.push({ name: 'PostPage', params: { id: post.id } })
        }

        const goBack = () => {
            router.push({ path: '/profile' })
        }

        return {
            navigateToPost,
            goBack
        }
    }
}
</script>

<style scoped>
.history-page {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.section {
    margin-bottom: 20px;
}

.section h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
    margin-left: 0px;
    border-radius: 10px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 5px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 8px 10px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.hot-page {
    padding: 10px;
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
    margin-left: 0px;
    border-radius: 10px;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hot-posts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.hot-post {
    cursor: pointer;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-image {
    width: 100%;
    height: auto;
    border-radius: 4px;
}

.post-title {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
}
</style>
