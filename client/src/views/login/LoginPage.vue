<template>
    <div class="login-page">
        <h2>登录页面</h2>
        <form @submit.prevent="handleLogin" class="login-form">
            <input type="text" v-model="username" placeholder="用户名" required>
            <input type="password" v-model="password" placeholder="密码" required>
            <button type="submit">登录</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <!-- 返回按钮 -->
        <button class="back-button" @click="handleBack">返回</button>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
// import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            username: '',
            password: '',
            error: null // 用于存储错误信息
        };
    },
    methods: {
        ...mapActions(['login']),
        async handleLogin() {
            try {
                // 发送请求到后端
                const response = await axios.post('http://localhost:3000/api/users/login', {
                    username: this.username,
                    password: this.password
                });

                // 假设响应包含用户信息
                const userInfo = response.data;

                // 成功时更新 Vuex 状态
                this.login(userInfo);

                // 跳转到 "我的" 页面
                this.$router.push('/profile');
            } catch (error) {
                // 处理错误，例如显示错误消息
                this.error = '登录失败，请检查您的用户名和密码。';
            }
        },
        handleBack() {
            // 返回到“我的”页面
            this.$router.push('/mypage');
        }
    }
};
</script>

<style scoped>
.login-page {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.login-form {
    display: flex;
    flex-direction: column;
}

input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ffffff;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.error {
    color: red;
    margin-top: 10px;
}

.back-button {
    margin-top: 20px;
    padding: 10px;
    background-color: #d3d3d3;
    color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.back-button:hover {
    background-color: #ffffff;

}
</style>
