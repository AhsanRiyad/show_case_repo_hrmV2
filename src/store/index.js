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

import * as R from 'ramda'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		//this is the base api of the project 
		// apiBase: "http://localhost:8090/hrm-server/api",
		// apiBase: "http://192.168.10.220:9085/hrm-server-v2/api",
		apiBase: "http://hrm.babl.xyz/hrm-server-v2/api",
		//will be used in calling the url using route name, being used in index.js of router
		activeRouteName: 'hellow',
		//will be used in making api automatic, being used in index.js of router
		activePathName: '',
		//this checker will be used in allProfileInput components for solving form error issue, and will be 
		//connected with baseTable createNew method
		newOrOldChecker: 'old',
		//tree saver
		// treeInfo: [],

	},
	getters: {
		getTabsMenuList : state => state.accessibleModules.admin,
		getState : state => state,
		getApiBase: state => state.apiBase,
		getActiveRouteName: state => state.activeRouteName,
		getActivePathName: state => state.activePathName,
		getNewOrOldChecker: state => state.newOrOldChecker,
		// getTreeInfo: state => state.treeInfo,
	},
	mutations: {
		setActiveRouteName(state , name){
			state.activeRouteName = name;
		},
		setActivePathName(state , name){
			state.activePathName = name;
		},
		setNewOrOldChecker(state , name){
			state.newOrOldChecker = name;
		},
		/* setTreeInfo(state , name){
			state.treeInfo = name;
		}, */
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
				[!R.isNil(data.newOrviewOrEditOrCorrection) && data.newOrviewOrEditOrCorrection == 'edit' ? 
					'updatedBy' : 'createdBy']: !R.isNil(data.newOrviewOrEditOrCorrection) && data.newOrviewOrEditOrCorrection == 'correction' ? data.item.updatedBy : VueCookies.get('userId')
			}
			console.log(headers);
			console.log(data);
			axios( {  method: data.method, url: url , data: data.item , headers: headers } ).then( ( response )=>{
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
