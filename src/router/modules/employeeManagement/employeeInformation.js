//const EmpListPage = () => import('../../../views/admin/Employees');
//const NewEmpPage = () => import('../../../views/admin/NewEmployee');

export default [
    {
        path: 'new-employee',
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
    {
        path: 'employee',
        name: 'employee',
        component: () =>
            import(
                /* webpackChunkName: "employee_management" */ '@/views/employeeManagement/employeeInformation/employee'
            ),
        meta: {
            title: "Employee",
            breadcrumb: [
                {  title: 'Employee Management' , name: 'employeeManagement' },
                {  title: 'Employee Information' , name: 'employeeInformation' },
                {  title: 'Employee List' , name: '' }
            ],
            
        }
    },
];
