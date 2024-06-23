<template>
    <div class="hot-page">
        <div class="title">热门推送</div>
        <div class="hot-posts">
            <!-- 使用动态加载图片的方式 -->
            <div v-for="post in hotPosts" :key="post.id" class="hot-post" @click="navigateToPost(post)">
                <img :src="require(`@/assets/images/${post.image}`)" alt="Post Image" class="post-image">
                <h3 class="post-title">{{ post.text }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'HotPage',
    data() {
        return {
            hotPosts: [
                { id: 828, text: '反佐配伍的典范，始见于张仲景《伤寒杂病论》', image: 'post1.jpg' }, // 使用相对路径
                { id: 286, text: '灸法的作用有哪些', image: 'post2.jpg' },
                { id: 1173, text: '中医将颈椎病大致分为四型', image: 'post3.jpg' },
                { id: 1032, text: '刮痧治疗的有哪些', image: 'post4.jpg' }
            ]
        }
    },
    setup() {
        const router = useRouter()

        const navigateToPost = (post) => {
            router.push({ name: 'PostPage', params: { id: post.id } })
        }

        return {
            navigateToPost
        }
    }
}
</script>

<style scoped>
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
    /* 圆角边框 */
    background-color: #f5f5f5;
    /* 背景颜色 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 盒子阴影 */
    margin-bottom: 10px;
    /* 底部外边距 */
}

.hot-posts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 2列布局 */
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