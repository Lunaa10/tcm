<template>
    <div class="xuewei-container">
        <!-- 返回按钮 -->
        <button @click="goBack" class="back-button">返回</button>
        <h1>点点穴</h1>
        <div v-if="Object.keys(groupedXuewei).length > 0" class="xuewei-list">
            <div v-for="(xueweis, category) in groupedXuewei" :key="category" class="category-group">
                <h2 class="category-title">{{ category }}</h2>
                <ul class="xuewei-names">
                    <li v-for="xuewei in xueweis" :key="xuewei.id" class="xuewei-name">{{ xuewei.name }}</li>
                </ul>
            </div>
        </div>
        <div v-else>
            <p>暂无数据</p>
        </div>
    </div>
    <!-- 底部空白，不然有部分无法显示 -->
    <div style="height: 50px;"></div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'XueweiPage',
    data() {
        return {
            xueweiList: [],
        };
    },
    computed: {
        groupedXuewei() {
            return this.xueweiList.reduce((acc, xuewei) => {
                const category = xuewei.category || '未分类';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(xuewei);
                return acc;
            }, {});
        }
    },
    created() {
        this.fetchXueweiData();
    },
    methods: {
        async fetchXueweiData() {
            try {
                const response = await axios.get('http://localhost:3000/api/xuewei');
                console.log(response.data); // 检查响应的数据
                this.xueweiList = response.data; // 赋值给 xueweiList
            } catch (error) {
                // 错误处理逻辑
                if (error.response) {
                    console.error('Server responded with a status:', error.response.status);
                    console.error('Response data:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error in request setup:', error.message);
                }
                console.error('Error config:', error.config);
            }
        },
        goBack() {
            // 使用 Vue Router 导航回 home 页面
            this.$router.push({ path: '/home' });
        }
    }
}
</script>

<style scoped>
.xuewei-container {
    padding: 20px;
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

.category-group {
    margin-bottom: 20px;
}

.category-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
}

.xuewei-names {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    /* 移除默认的margin */
}

.xuewei-name {
    width: 33.33%;
    padding: 10px;
    /* 增加一点内边距让它们看起来更美观 */
    box-sizing: border-box;
    /* 确保padding不影响宽度计算 */
    font-size: 16px;
    color: #333;
    text-align: center;
    /* 中心对齐 */
}

.xuewei-list {
    display: flex;
    flex-direction: column;
}
</style>
