//const EmpListPage = () => import('../../../views/admin/Employees');
//const NewEmpPage = () => import('../../../views/admin/NewEmployee');

export default [
    {
        path: 'unlock-account',
        name: 'unlockAccount',
        component: () =>
            import(
                /* webpackChunkName: "employee_management" */ '../../../views/admin/userManagement/unlockAccount'
            ),
        meta: {
            title: "Unlock Account",
            breadcrumb: [
                { title: 'Admin', name: 'admin' },
                { title: 'User Management', name: 'userManagement' },
                { title: 'Unlock Account', name: '' }
            ],

        }
    },
    {
        path: 'never-lock-account',
        name: 'neverLockAccount',
        component: () =>
            import(
                /* webpackChunkName: "employee_management" */ '../../../views/admin/userManagement/neverLockAccount'
            ),
        meta: {
            title: "Never Lock Account",
            breadcrumb: [
                { title: 'Admin', name: 'admin' },
                { title: 'User Management', name: 'userManagement' },
                { title: 'Never Lock Account', name: '' }
            ],
        }
    },
    {
        path: 'user',
        name: 'adminUser',
        component: () =>
            import(
                /* webpackChunkName: "employee_management" */ '../../../views/admin/userManagement/adminUser'
            ),
        meta: {
            title: "User",
            breadcrumb: [
                { title: 'Admin', name: 'admin' },
                { title: 'User Management', name: 'userManagement' },
                { title: 'User', name: '' }
            ],
        }
    },
    {
        path: 'role',
        name: 'adminRole',
        component: () =>
            import(
                /* webpackChunkName: "employee_management" */ '../../../views/admin/userManagement/adminRole'
            ),
        meta: {
            title: "Role",
            breadcrumb: [
                { title: 'Admin', name: 'admin' },
                { title: 'User Management', name: 'userManagement' },
                { title: 'Role', name: '' }
            ],
        }
    },
    {
        path: 'menu',
        name: 'adminMenu',
        component: () =>
            import(
                /* webpackChunkName: "employee_management" */ '../../../views/admin/userManagement/adminMenu'
            ),
        meta: {
            title: "Menu",
            breadcrumb: [
                { title: 'Admin', name: 'admin' },
                { title: 'User Management', name: 'userManagement' },
                { title: 'Menu', name: '' }
            ],
        }
    },
    {
        path: 'submenu',
        name: 'adminSubMenu',
        component: () =>
            import(
                /* webpackChunkName: "employee_management" */ '../../../views/admin/userManagement/adminSubMenu'
            ),
        meta: {
            title: "Menu",
            breadcrumb: [
                { title: 'Admin', name: 'admin' },
                { title: 'User Management', name: 'userManagement' },
                { title: 'Sub Menu', name: '' }
            ],
        }
    }
];
