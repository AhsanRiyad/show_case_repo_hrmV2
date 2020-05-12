import Vue from 'vue';
import Router from 'vue-router';


import work_structure from './modules/work_structure';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/sign_in',
            name: 'sign_in',
            component: () =>
                import(/* webpackChunkName: "auth" */ '../views/authenitcations/sign_in')
        },
        work_structure,
    ]
});
