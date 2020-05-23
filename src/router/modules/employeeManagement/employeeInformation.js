//const EmpListPage = () => import('../../../views/admin/Employees');
//const NewEmpPage = () => import('../../../views/admin/NewEmployee');

export default [
    {
        path: 'create-employee',
        name: 'new_emp',
        component: () =>
            import(
                /* webpackChunkName: "employee_management" */ '../../../views/emp-management/emp-information/NewEmployee'
            ),
        meta: {
            breadcrumb: [
                { name: 'Employee Management', link: 'employee_management' },
                { name: 'Employee Information', link: 'emp_information' },
                { name: 'New Employee' }
            ]
        }
    },
];
