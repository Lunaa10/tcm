<template>
  <router-view />
  <div id="nav">
    <router-link class="tab-bar-item" to="/home">
      <div class="icon">
        <i class="el-icon-s-home"></i>
      </div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/search">
      <div class="icon">
        <i class="el-icon-present"></i>
      </div>
      <div>搜索</div>
    </router-link>
    <!-- <router-link class="tab-bar-item" to="/shopcart">
      <div class="icon">
        <i class="el-icon-shopping-cart-2"></i>
      </div>
      <div>搜索</div>
    </router-link> -->
    <router-link :to="myPageLink" class="tab-bar-item">
      <div class="icon">
        <i class="el-icon-user-solid"></i>
      </div>
      <div>我的</div>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();

    const myPageLink = computed(() => {
      return store.getters.isLoggedIn ? '/profile' : '/mypage';
    });

    return {
      myPageLink,
    };
  }
};
</script>

<style lang="less">
@import url('./assets/css/base.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #f9f9f9;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

#nav .tab-bar-item {
  flex: 1;
  text-align: center;
  height: 50px;
  font-size: 14px;
}

#nav .tab-bar-item .icon {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  display: inline-block;
  vertical-align: middle;
}

.router-link-exact-active {
  color: #9f9564;
}

.router-link {
  color: black;
}
</style>
