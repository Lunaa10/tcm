// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/home/HomePage.vue';
// import Articles from '../views/ArticlesDetails.vue';


// const routes = [
//   { path: '/', name: 'Home', component: Home },
//   {
//     path: '/articles/:id',
//     name: 'Article',
//     component: Articles,
//     props: true // 允许将:id作为prop传递给Articles组件
//   },


// ];
// // ../views/HomePage.vue
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });

// export default router;
import { createRouter, createWebHistory } from 'vue-router'
import BookDetail from '@/views/BookDetail.vue'
import Foodspage from '@/views/lifepage/Foodspage.vue';
import DrinksPage from '@/views/lifepage/Drinkingpage.vue';
import XueweiPage from '@/views/lifepage/XueweiPage.vue';
import PostPage from '@/components/PostPage.vue';
import SearchPage from '@/views/SearchPage.vue';
import MyPage from '@/views/MyPage.vue';
import LoginPage from '@/views/login/LoginPage.vue';
import RegistrationPage from '@/views/login/RegistrationPage.vue';
import HistoryPage from '@/components/HistoryPage.vue'; // 导入新页面组件
import FavoritesPage from '@/components/FavoritesPage.vue'; // 导入新页面组件
import ProfilePage from '@/views/ProfilePage.vue'; // 导入新页面组件
import MedicineDetail from '@/views/MedicineDetail.vue'; // 导入新页面组件
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/HomePage.vue'),
    meta: {
      title: '中医小馆'
    }

  },
  {
    path: '/book/:title',
    name: 'BookDetail',
    component: BookDetail,
    props: true, // 将路由参数传递给组件作为props
    meta: {
      title: '中医小馆'
    }
  },
  {
    path: '/otcpage/otcdetail',
    name: 'OtcDetail',
    component: () => import('@/components/otcpage/OtcDetail.vue'),
    props: route => ({
      symptomName: route.params.symptomName || '',
      showAllMedicines: route.query.showAllMedicines || false
    }),
    meta: {
      title: '中医小馆'
    }
  },
  {
    path: '/foodspage',
    name: 'FoodsPage',
    component: Foodspage,
    meta: {
      title: '中医小馆'
    }
  },
  {
    path: '/drinks',
    name: 'DrinksPage',
    component: DrinksPage,
    meta: {
      title: '中医小馆'
    }
  },
  {
    path: '/xuewei',
    name: 'XueweiPage',
    component: XueweiPage,
    meta: {
      title: '中医小馆'
    }
  },
  {
    path: '/post/:id', // 定义一个包含动态参数的路径
    name: 'PostPage',
    component: PostPage,
    props: true // 使组件可以通过 props 接收路由参数
  },
  {
    path: '/search', name: 'SearchPage', component: SearchPage, meta: {
      title: '中医小馆'
    }
  },
  {
    path: '/mypage', name: 'MyPage', component: MyPage, meta: {
      title: '中医小馆'
    }
  },
  {
    path: '/mypage/login', component: LoginPage, meta: {
      title: '中医小馆'
    }
  },
  {
    path: '/mypage/register', component: RegistrationPage, meta: {
      title: '中医小馆'
    }
  },
  {
    path: '/profile', name: 'ProfilePage', component: ProfilePage, meta: {
      title: '中医小馆'
    }
  },

  {
    path: '/history', // 定义历史记录页面的路由
    name: 'HistoryPage',
    component: HistoryPage
  },
  {
    path: '/favorites', // 定义我的收藏页面的路由
    name: 'FavoritesPage',
    component: FavoritesPage
  },
  {
    path: '/medicine/:name',
    name: 'MedicineDetail',
    component: MedicineDetail
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  next()
  document.title = to.meta.title
})



export default router