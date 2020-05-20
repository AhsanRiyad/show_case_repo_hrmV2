import Vue from 'vue';
import Router from 'vue-router';

import store from '../store/index'

import workStructure from './modules/workStructure';

import * as R from 'ramda'
import VueCookies from 'vue-cookies'

Vue.use(Router);

const routes = new Router({
    routes: [
        {
            path: '/sign-in',
            name: 'signIn',
            component: () =>
                import(/* webpackChunkName: "auth" */ '../views/authenitcations/signIn')
        },
        workStructure,
    ]
});

routes.beforeEach(function (to, from, next) {

    if (to.name != 'signIn' && R.isNil(VueCookies.get('accessToken'))) {
            next({ name: 'signIn' });
            return;
     }

    const camelCase = str => str.replace(/[-_]([a-z])/g, m => m[1].toUpperCase())
    // const snakeCase = str => str.replace(/([A-Z])/g, x => concat('_', x.toLowerCase()))

    console.log('in the router');
    console.log(to);
    store.commit('setActiveRouteName', to.name);
    store.commit('setActivePathName', camelCase(to.fullPath));
    // let a = store.getters.getActiveRouteName;
    let b = store.getters.getActivePathName
    // console.log(a);
    console.log(b);
    next();
})

export default routes;
