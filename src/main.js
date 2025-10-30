import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';  
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';

Vue.use(Vuesax);
Vue.use(ElementUI);

Vue.config.productionTip = false

// Vérifier l'authentification au démarrage de l'app
store.dispatch('auth/checkAuth').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})