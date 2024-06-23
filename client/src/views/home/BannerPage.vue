<template>
    <div class="carousel-container">
        <el-carousel ref="carousel" :autoplay="true" :interval="3000" indicator-position="none" arrow="never">
            <el-carousel-item v-for="(item, index) in bannerdata" :key="index" class="el-carousel-item"
                @click.prevent="handleClick(item.title)">
                <h3>
                    <img :src="item.image" class="img" />
                </h3>
            </el-carousel-item>
        </el-carousel>

        <!-- 左右浮动箭头 -->
        <button class="carousel-arrow left-arrow" @click="prev">
            <span class="arrow-icon">&#8249;</span>
        </button>
        <button class="carousel-arrow right-arrow" @click="next">
            <span class="arrow-icon">&#8250;</span>
        </button>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: {
        bannerdata: {
            type: Array,
            default() {
                return []
            }
        }
    },
    emits: ['bannerClick'],
    setup(props, { emit }) {
        const carousel = ref(null)

        const prev = () => {
            if (carousel.value) {
                carousel.value.prev()
            }
        }

        const next = () => {
            if (carousel.value) {
                carousel.value.next()
            }
        }

        const handleClick = (title) => {
            // 使用异步操作避免立即影响轮播
            setTimeout(() => {
                emit('bannerClick', title)
            }, 100) // 延迟 100 毫秒
        }

        return {
            carousel,
            prev,
            next,
            handleClick
        }
    }
}
</script>

<style scoped>
.carousel-container {
    position: relative;
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
    overflow: hidden;
}

.el-carousel {
    width: 100%;
    height: 200px;
}

.el-carousel-item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.2);
}

.carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(157, 157, 157, 0.5);
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 10;
}

.carousel-arrow.left-arrow {
    left: 10px;
}

.carousel-arrow.right-arrow {
    right: 10px;
}

.carousel-container:hover .carousel-arrow {
    opacity: 1;
}

.arrow-icon {
    font-size: 14px;
}
</style>