import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './plugins/vue-toast';

import '@/styles/variables.scss'


import axios from 'axios'
Vue.prototype.$axios = axios;


import * as R from 'ramda'
Vue.prototype.R = R;


import moment from 'moment'
Vue.prototype.moment = moment;


import _ from 'lodash'
Vue.prototype._ = _;


import { setupComponents } from './config/setupComponents';


Vue.config.productionTip = false
setupComponents(Vue);


new Vue({
	router,
	store,
	vuetify,
	icons: {
		iconfont: 'md',
	},
	render: h => h(App)
}).$mount('#app')
