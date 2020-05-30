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
    }
];
