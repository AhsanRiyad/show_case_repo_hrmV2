//const EmpListPage = () => import('../../../views/admin/Employees');
//const NewEmpPage = () => import('../../../views/admin/NewEmployee');

export default [
    {
        path: 'create-employee',
        name: 'newEmployee',
        component: () =>
            import(
                /* webpackChunkName: "employee_management" */ '@/views/employeeManagement/employeeInformation/newEmployee'
            ),
        meta: {
            title: "New Employee",
            breadcrumb: [
                {  title: 'Employee Management' , name: 'employeeManagement' },
                {  title: 'Employee Information' , name: 'employeeInformation' },
                {  title: 'New Employee' , name: '' }
            ],
            
        }
    },
];
