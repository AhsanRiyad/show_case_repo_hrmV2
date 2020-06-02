import userManagementRouter from '@/router/modules/admin/userManagement';

const userManagementBase = () =>
    import(
        /* webpackChunkName: "emp_information" */ '@/views/base/admin/userManagementBase'
    );
export default {
    path: '/admin',
    name: 'admin',
    title: 'Admin',
    component: () =>
        import(
		/* webpackChunkName: "workStructure" */ '@/views/base/adminBase'
        ),
    children: [{
        path: 'um',
        name: 'userManagement',
        component: userManagementBase,
        children: userManagementRouter,
        meta: {
            title: 'Employee Information',
            breadcrumb: [
                { title: 'Admin', name: 'admin' },
                { title: 'User Management', name: 'userManagement' }
            ],
            childPages: [
                { title: 'Unlock Account', name: 'unlockAccount' },
                { title: 'Never Lock Account', name: 'neverLockAccount' },
                { title: 'Users', name: 'adminUser' },
                { title: 'Role', name: 'adminRole' },
                { title: 'Menu', name: 'adminMenu' },
                { title: 'Sub Menu', name: 'adminSubMenu' },
            ]
        }
    },


    ],
    meta: {
        breadcrumb: [{ title: 'User Management' }],
        childPages: [
            { title: 'User Management', name: 'userManagement' },

        ]
    }
};
