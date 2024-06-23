<template>
  <nav-bar>
    <template v-slot:default>
      <span class="brand-title">中医小馆</span>
    </template>
  </nav-bar>

  <banner :bannerdata="banners" class="banners" @bannerClick="navigateToBook"></banner>
  <TestSelf class="test-self-container" />
  <LifeStyle class="life-style-container" />
  <HotPosts class="hot-posts-container" />
  <div style="height: 50px;"></div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/topnav/NavBar.vue'
import banner from './BannerPage.vue'
import TestSelf from './TestSelf.vue'
import LifeStyle from './LifeStyle.vue'
import HotPosts from './HotPage.vue'


export default {
  components: {
    NavBar,
    banner,
    TestSelf,
    LifeStyle,
    HotPosts
  },
  setup() {
    const state = reactive({
      books: [], // 用于存储书籍数据
      banners: []
    })

    const router = useRouter()

    onMounted(async () => {
      try {
        // 使用 fetch 异步加载 public 目录中的 tcm_books.json 文件
        const response = await fetch('/tcm_books.json')
        const booksData = await response.json()
        state.books = booksData.books
        state.banners = state.books.map(book => ({
          image: require(`@/assets/${book.image}`), // 使用require加载图片
          title: book.title
        }))
      } catch (error) {
        console.error("Failed to load books data:", error)
      }
    })
    const navigateToBook = (title) => {
      // 导航到对应的书籍详情页面
      router.push({ name: 'BookDetail', params: { title } })
    }

    return {
      ...toRefs(state),
      navigateToBook
    }
  }
}
</script>

<style scoped>
/* 全局背景颜色 */
body {
  background-color: #f0f0f0;
}

/* 顶部导航栏的样式 */
.brand-title {
  font-size: 24px;
  color: #f9fade;
  font-weight: bold;
}

/* 横幅样式 */
.banners {
  width: 100%;
  height: 300;
  margin-top: 50px;
}

/* 自测部分的样式 */
.test-self-container {
  margin-top: 10px;
  overflow: hidden;
}

/* 热门文章部分的样式 */
.hot-posts-container {
  margin-top: 20px;
}
</style>
