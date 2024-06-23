<template>
    <div class="book-detail">
        <!-- 返回按钮 -->
        <button @click="goBack" class="back-button">返回</button>
        <h1>{{ book.title }}</h1>
        <p class="author">作者: {{ book.author }}</p>
        <p class="dynasty">朝代: {{ book.dynasty }}</p>
        <p class="description">{{ book.description }}</p>
        <div class="chapters">
            <h2>章节</h2>
            <ul>
                <li v-for="chapter in book.chapters" :key="chapter.chapter_title" class="chapter-card">
                    <h3>{{ chapter.chapter_title }}</h3>
                    <p>{{ chapter.content }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title'], // 接受路由传递的title参数
    data() {
        return {
            book: {}
        }
    },
    async mounted() {
        try {
            // 使用 fetch 异步加载 public 目录中的 tcm_books.json 文件
            const response = await fetch('/tcm_books.json')
            const booksData = await response.json()
            // 根据title查找对应的书籍信息
            this.book = booksData.books.find(b => b.title === this.title) || {}
        } catch (error) {
            console.error("Failed to load book data:", error)
        }
    },
    methods: {
        goBack() {
            // 使用 Vue Router 导航回 home 页面
            this.$router.push({ path: '/home' });
        }
    }
}
</script>

<style scoped>
/* 全局布局 */
.book-detail {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Helvetica Neue', Arial, sans-serif;
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

/* 标题样式 */
.book-detail h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
    color: #333;
}

/* 作者和朝代样式 */
.book-detail .author,
.book-detail .dynasty {
    font-size: 1.2em;
    margin-bottom: 0.5em;
    color: #666;
}

/* 描述样式 */
.book-detail .description {
    font-size: 1em;
    line-height: 1.6;
    margin-bottom: 1.5em;
    color: #444;
}

/* 章节容器样式 */
.chapters {
    margin-top: 20px;
}

.chapters h2 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    color: #333;
}

/* 章节卡片样式 */
.chapter-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.chapter-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.chapter-card h3 {
    margin-top: 0;
    font-size: 1.2em;
    color: #444;
}

.chapter-card p {
    font-size: 1em;
    line-height: 1.6;
    color: #555;
}

/* 响应式设计 */
@media (max-width: 600px) {
    .book-detail {
        padding: 10px;
    }

    .book-detail h1 {
        font-size: 1.5em;
    }

    .book-detail .author,
    .book-detail .dynasty {
        font-size: 1em;
    }

    .chapter-card {
        padding: 10px;
    }

    .chapter-card h3 {
        font-size: 1em;
    }

    .chapter-card p {
        font-size: 0.9em;
    }
}
</style>