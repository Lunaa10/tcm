<template>
    <div class="my-page">
        <h1>我的</h1>

        <!-- 用户信息 -->
        <div class="user-info">
            <img class="avatar" :src="avatarSrc" alt="Avatar">
            <div class="user-details">
                <h2 class="nickname">用户{{ userInfo.nickname }}</h2>
                <button class="logout" @click="handleLogout">退出登录</button>
            </div>
        </div>

        <!-- 功能列表 -->
        <div class="features">
            <ul>
                <li @click="goToHistoryPage">
                    <i class="icon icon-history"></i>
                    <span>历史记录</span>
                    <i class="icon icon-arrow"></i>
                </li>
                <li @click="goToFavoritesPage">
                    <i class="icon icon-favorites"></i>
                    <span>我的收藏</span>
                    <i class="icon icon-arrow"></i>
                </li>
                <li>
                    <i class="icon icon-consult"></i>
                    <span>在线咨询</span>
                    <i class="icon icon-arrow"></i>
                </li>
                <!-- 其他功能项省略，可根据需要添加 -->
            </ul>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'MyPage',
    setup() {
        const store = useStore();
        const router = useRouter();

        // 使用 computed 从 Vuex store 中获取状态
        const userInfo = computed(() => store.getters['auth/getUserInfo']);
        const avatarSrc = require('@/assets/avatar.png');

        const handleLogout = () => {
            store.dispatch('auth/logout');
            router.push('/mypage'); // 跳转到登录页面
        };

        const goToHistoryPage = () => {
            router.push('/history'); // 跳转到历史记录页面
        };

        const goToFavoritesPage = () => {
            router.push('/favorites'); // 跳转到我的收藏页面
        };

        return {
            userInfo,
            avatarSrc,
            handleLogout,
            goToHistoryPage,
            goToFavoritesPage
        };
    }
};
</script>

<style scoped>
.my-page {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.user-info {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 10px;
    margin-bottom: 20px;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
}

.user-details {
    display: flex;
    flex-direction: column;
}

.nickname {
    font-size: 18px;
    margin: 0;
}

.logout {
    margin-top: 10px;
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.logout:hover {
    background-color: #c9302c;
}

.features ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.features li {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    transition: background-color 0.3s;
}

.features li:hover {
    background-color: #f0f0f0;
}

.features i.icon {
    font-size: 20px;
    margin-right: 15px;
}

.icon-arrow {
    margin-left: auto;
    font-size: 16px;
}

.icon-history::before {
    content: "\f017";
    /* 假设使用 FontAwesome 图标 */
}

.icon-favorites::before {
    content: "\f005";
}

.icon-consult::before {
    content: "\f0e0";
}

.icon-cooperate::before {
    content: "\f1d8";
}

.icon-agreement::before {
    content: "\f15c";
}

.icon-privacy::before {
    content: "\f1c8";
}

.icon-update::before {
    content: "\f021";
}

.icon-version {
    margin-left: 5px;
    font-size: 14px;
    color: #999;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
