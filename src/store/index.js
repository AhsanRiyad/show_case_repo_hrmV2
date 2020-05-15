//vue
import Vue from 'vue';
import Vuex from 'vuex';

//accessible modules , tab menu
import accessible_modules from './role_based/accessible_modules';

//imported state
import work_structure from './modules/work_structure';
import admin from './modules/admin';


Vue.use(Vuex);

export default new Vuex.Store({
state: {
	name: 'riyad',
},
getters: {
	get_tabs_menu_list : state => state.accessible_modules.admin,
	get_state : state => state,


},
mutations: {
SET_ACCESSIBLE_MODULES(state) {
let role = state.roles.toLowerCase();
/* todo: handle with API */
if (role === 'admin') {
state.availableModules = state.accessible_modules.admin;
} else if (role === 'hr') {
state.availableModules = state.accessible_modules.hr;
} else if (role === 'employee') {
state.availableModules = state.accessible_modules.employee;
} else if (role === '') {
//this.$router.push('/login');

//this will be deleteted
state.availableModules = state.accessible_modules.admin;

}
},
INVALIDATE_USER(state) {
localStorage.removeItem('user-token');
localStorage.removeItem('username');
localStorage.removeItem('name');
localStorage.removeItem('role');
localStorage.removeItem('photo');
state.photo = '';
},
},
actions: {},
modules: {

work_structure: work_structure,
accessible_modules: accessible_modules,
admin: admin,

}
});
