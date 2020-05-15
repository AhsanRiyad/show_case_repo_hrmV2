//vue
import Vue from 'vue';
import Vuex from 'vuex';

import VueCookies from 'vue-cookies'

import axios from 'axios'

//accessible modules , tab menu
import accessibleModules from './roleBased/accessibleModules';

//imported state
import workStructure from './modules/workStructure';
import admin from './modules/admin';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		name: 'riyad',
		apiBase: "http://localhost:8090/hrm-server/api",
		activeRouteName: 'hellow',
		activePathName: '',
	},
	getters: {
		getTabsMenuList : state => state.accessibleModules.admin,
		getState : state => state,
		getApiBase: state => state.apiBase,
		getActiveRouteName: state => state.activeRouteName,
		getActivePathName: state => state.activePathName,
	},
	mutations: {
		setActiveRouteName(state , name){
			state.activeRouteName = name;
		},
		setActivePathName(state , name){
			state.activePathName = name;
		}
	},
actions: {
	testActions: context => {
		console.log(context);
		return new Promise( (resolve)=>{
			resolve('from promise');
		} )
	},
	callApi: (context, data) => {
		return new Promise( (resolve , reject)=>{
			let url = context.state.apiBase+data.api;
			console.log(url);
			let headers = {
				'Authorization': 'Bearer ' + VueCookies.get('accessToken') ,
				'Content-Type': 'application/json;charset=UTF-8',
				'createdBy': VueCookies.get('username')
			}

			console.log(headers);

			console.log(data);
			axios( {  method: data.method, url: url , data: data.data , headers: headers } ).then( ( response )=>{
				console.log("in the dispatch");
				console.log(response);
				resolve(response.data);
			}).catch((error)=>{
				reject(error);
			})
		})
	}
},
modules: {
	workStructure: workStructure,
	accessibleModules: accessibleModules,
	admin: admin,
}
});
