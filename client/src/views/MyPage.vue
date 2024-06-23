<template>
    <div class="guest-page">
        <h1>欢迎访问</h1>
        <p>您还未登录，请登录或注册。</p>
        <button @click="showLoginForm">登录</button>
        <button @click="showRegistrationForm">注册</button>
    </div>
</template>

<script>
// import { useRouter } from 'vue-router';

export default {
    name: 'GuestPage',
    methods: {
        showLoginForm() {
            this.$router.push('/mypage/login');
        },
        showRegistrationForm() {
            this.$router.push('/mypage/register');
        }
    }
};
</script>

<style scoped>
.guest-page {
    padding: 20px;
    height: 844px;
    font-family: Arial, sans-serif;
    text-align: center;
    background: linear-gradient(to bottom, #efd998 0.5%, #fdfdfd 99.5%);
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
