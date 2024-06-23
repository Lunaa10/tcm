<template>
    <div class="registration-page">
        <h2>注册页面</h2>
        <form @submit.prevent="handleRegistration" class="registration-form">
            <input type="text" v-model="username" placeholder="用户名" required>
            <input type="password" v-model="password" placeholder="密码" required>
            <button type="submit">注册</button>
        </form>
        <div v-if="message" :class="messageClass">{{ message }}</div>
        <!-- 返回按钮 -->
        <button class="back-button" @click="handleBack">返回</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            message: '',
            messageClass: ''
        };
    },
    methods: {
        async handleRegistration() {
            try {
                // 发送请求到后端注册 API
                const response = await axios.post('http://localhost:3000/api/users/register', {
                    username: this.username,
                    password: this.password


                });

                // 根据后端响应更新界面
                if (response.status === 201) {
                    this.message = '注册成功！';
                    this.messageClass = 'success';
                    // 清空表单数据
                    this.username = '';
                    this.password = '';
                    // 注册成功后跳转到登录页面
                    this.$router.push('/mypage/login');
                }
            } catch (error) {
                if (error.response) {
                    // 服务器返回了一个非 2xx 的状态码
                    console.error('注册失败:', error.response.data);
                    this.message = error.response.data.message || '注册失败，请稍后再试。';
                } else if (error.request) {
                    // 请求已经发出，但没有收到响应
                    console.error('没有收到服务器响应:', error.request);
                    this.message = '没有收到服务器响应，请检查网络连接。';
                } else {
                    // 发送请求时出现问题
                    console.error('发送请求时出现问题:', error.message);
                    this.message = '发送请求时出现问题，请检查您的输入或稍后再试。';
                }
                this.messageClass = 'error';
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
.registration-page {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.registration-form {
    display: flex;
    flex-direction: column;
}

input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
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

.message {
    margin-top: 20px;
    font-size: 16px;
}

.success {
    color: green;
}

.error {
    color: red;
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
