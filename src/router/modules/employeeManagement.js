import employeeInformationRouter from '@/router/modules/employeeManagement/employeeInformation';

const employeeInformationBase = () =>
    import(
        /* webpackChunkName: "emp_information" */ '@/views/base/employeeManagement/employeeInformationBase'
    );
export default {
    path: '/em',
    name: 'employeeManagement',
    title: 'Employee Management',
    component: () =>
        import(
		/* webpackChunkName: "workStructure" */ '@/views/base/employeeManagementBase'
        ),
    children: [{
        path: 'ei',
        name: 'employeeInformation',
        component: employeeInformationBase,
        children: employeeInformationRouter,
        meta: {
            title: 'Employee Information',
            breadcrumb: [
                { title: 'Employee Management', name: 'employeeManagement' },
                { title: 'Employee Information', name: 'employeeInformation' }
            ],
            childPages: [
                { title: 'New Employee', name: 'newEmployee' },
            ]
        }
    },
    ],
    meta: {
        breadcrumb: [{ title: 'Employee Management' }],
        childPages: [
            { title: 'Employee Information', name: 'employeeInformation' },
        ]
    }
};
