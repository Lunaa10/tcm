<!-- PostPage.vue -->
<template>
    <div class="post-page">
        <button @click="goBack" class="back-button">返回</button>
        <h1 class="post-title">帖子详情</h1>
        <div v-if="post" class="post-content">
            <p class="post-text">{{ post.text }}</p>
            <h2>问答部分：</h2>
            <ul class="annotations-list">
                <li v-for="(annotation, index) in post.annotations" :key="index" class="annotation-item">
                    <strong>{{ annotation.Q }}</strong>
                    <p>{{ annotation.A }}</p>
                </li>
            </ul>
        </div>
        <div v-else class="loading-message">
            <p>加载中...</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'PostPage',
    setup() {
        const route = useRoute()
        const router = useRouter() // 获取路由器实例
        const postId = route.params.id
        const post = ref(null)

        const goBack = () => {
            router.push({ name: 'Home' })
        }
        onMounted(async () => {
            try {
                const response = await fetch('/train.json')
                const postsData = await response.json()
                post.value = postsData.find(p => p.id === Number(postId))
            } catch (error) {
                console.error('Failed to load post data:', error)
            }
        })

        return {
            post,
            goBack
        }
    }
}
</script>

<style scoped>
.post-page {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    position: relative;
    /* 为了定位返回按钮 */
}

.back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.back-button:hover {
    background-color: #2980b9;
}

.post-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #2c3e50;
}

.post-content {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-text {
    font-size: 18px;
    margin-bottom: 20px;
    color: #333;
}

.annotations-list {
    list-style-type: none;
    padding: 0;
}

.annotation-item {
    margin-bottom: 15px;
}

.annotation-item strong {
    display: block;
    margin-bottom: 5px;
    color: #2c3e50;
}

.loading-message {
    text-align: center;
    font-size: 18px;
    color: #999;
}
</style>