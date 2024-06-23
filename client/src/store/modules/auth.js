// store/modules/auth.js
export default {
    namespaced: true,
    state: {
        loggedIn: false,
        userInfo: {
            avatar: require('@/assets/avatar.png'), // 确保路径正确
            nickname: '',
        }
    },
    mutations: {
        setLoggedIn(state, status) {
            console.log('Setting loggedIn to:', status); // 调试输出
            state.loggedIn = status;
        },
        // setUserInfo(state, userInfo) {

        //     console.log('Setting userInfo to:', userInfo); // 调试输出
        //     state.userInfo = userInfo;
        // }
        setUserInfo(state, userInfo) {
            console.log('Setting userInfo to:', userInfo); // 调试输出
            if (userInfo.avatar && userInfo.nickname) {
                state.userInfo = userInfo;
            } else {
                console.error('Invalid userInfo:', userInfo);
            }
        }
    },
    actions: {
        login({ commit }, userInfo) {
            console.log('Logging in with:', userInfo); // 调试输出
            commit('setLoggedIn', true);
            commit('setUserInfo', userInfo);
            // 持久化状态
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log('LocalStorage loggedIn:', localStorage.getItem('loggedIn'));
            console.log('LocalStorage userInfo:', localStorage.getItem('userInfo'));
        },
        logout({ commit }) {
            commit('setLoggedIn', false);
            commit('setUserInfo', {
                avatar: require('@/assets/avatar.png'), // 确保路径正确
                nickname: 'wwl',
            });
            // 清除持久化状态
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('userInfo');
        },
        // initializeStore({ commit }) {
        //     const loggedIn = localStorage.getItem('loggedIn') === 'true';
        //     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        //     if (loggedIn && userInfo) {
        //         commit('setLoggedIn', true);
        //         commit('setUserInfo', userInfo);
        //     }
        // }
        initializeStore({ commit }) {
            const loggedIn = localStorage.getItem('loggedIn') === 'true';
            const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {
                avatar: '', // 默认值
                nickname: ''
            };

            if (loggedIn) {
                commit('setLoggedIn', true);
            }
            if (userInfo) {
                commit('setUserInfo', userInfo);
            }
        },

    },
    getters: {
        isLoggedIn: state => state.loggedIn,
        getUserInfo: state => state.userInfo
    }
};
