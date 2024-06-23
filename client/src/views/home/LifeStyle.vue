<template>
    <div class="life-style-container">
        <div class="title">生活频道</div>
        <div class="sections">
            <div class="section" @click="navigateTo('foods')">
                <img src="@/assets/icons/eat.png" alt="吃点儿啥" class="icon" />
                <div class="text">吃点儿啥</div>
            </div>
            <div class="section" @click="navigateTo('drinks')">
                <img src="@/assets/icons/drink.png" alt="喝点儿啥" class="icon" />
                <div class="text">喝点儿啥</div>
            </div>
            <div class="section" @click="navigateTo('xuewei')">
                <img src="@/assets/icons/massage.png" alt="点点穴" class="icon" />
                <div class="text">点点穴</div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'LifeStyle',
    methods: {
        navigateTo(page) {
            if (page === 'foods') {
                this.$router.push({ name: 'FoodsPage' }); // 跳转到 FoodsPage
            } else if (page === 'drinks') {
                this.$router.push({ name: 'DrinksPage' }); // 跳转到 DrinksPage
            } else if (page === 'xuewei') {
                this.$router.push({ name: 'XueweiPage' });
            }
        }
    }
}
</script>

<style scoped>
.life-style-container {
    display: flex;
    /* justify-content: space-around; */
    flex-direction: column;
    /* / align-items: center; */
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    margin-top: 0px;
}

.title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
    margin-left: 5px;
    border-radius: 10px;
    /* 圆角边框 */
    background-color: #f5f5f5;
    /* 背景颜色 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 盒子阴影 */
    margin-bottom: 10px;
    /* 底部外边距 */
}

.sections {
    display: flex;
    /* 使用Flexbox布局 */
    justify-content: space-around; 
    /* 在各个子项之间均匀分布空间 */
    align-items: center;
    /* 垂直居中对齐 */
    gap: 70px;
    /* 子项之间的间距 */
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /* 内边距 */

}

.section {
    text-align: center;
    display: flex;
    flex-direction: column;
    /* 纵向堆叠内部元素 */
    align-items: center;
}

.icon {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
}

.text {
    font-size: 16px;
    font-weight: bold;
    color: #333;

}
</style>