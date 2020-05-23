const companyClassType = () => import('../../views/workStructure/companyClassType');
const officeType = () => import('../../views/workStructure/officeType');
const office = () => import('../../views/workStructure/office');
const organizationType = () => import('../../views/workStructure/organizationType');
const designation = () => import('../../views/workStructure/designation');
const grade = () => import('../../views/workStructure/grade');
const location = () => import('../../views/workStructure/location');
const organizationHead = () => import('../../views/workStructure/organizationHead');
const organization = () => import('../../views/workStructure/organization');


// import EmployeeInformationRouter from './employeeManagement/employeeInformation';

const employeeInformationBase = () =>
    import(
        /* webpackChunkName: "emp_information" */ '../../views/base/employeeManagement/employeeInformationBase'
    );


export default {
    path: '/em',
    name: 'employeeManagement',
    title: 'Employee Management',
    component: () =>
        import(
		/* webpackChunkName: "workStructure" */ '../../views/base/employeeManagementBase'
        ),
    children: [{
        path: 'employee-information',
        name: 'employeeInformation',
        component: employeeInformationBase,
        // children: EmployeeInformationRouter,
        meta: {
            title: 'Employee Information',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Business Group' }
            ]
        }
    },
    {
        path: 'company-class-type',
        name: 'companyClassType',
        component: companyClassType,
        meta: {
            title: 'Company Classification Type',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Company Classification Type' }
            ]
        }
    },
    {
        path: 'office-type',
        name: 'officeType',
        component: officeType,
        meta: {
            title: 'Office Type',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Office Type' }
            ]
        }
    },
    {
        path: 'office',
        name: 'office',
        component: office,
        meta: {
            title: 'Office',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Office' }
            ]
        }
    },
    {
        path: 'organization-type',
        name: 'organizationType',
        component: organizationType,
        meta: {
            title: 'Organization Type',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Organization Type' }
            ]
        }
    },
    {
        path: 'designation',
        name: 'designation',
        component: designation,
        meta: {
            title: 'Designation',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Designation' }
            ]
        }
    },
    {
        path: 'grade',
        name: 'grade',
        component: grade,
        meta: {
            title: 'Grade',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Grade' }
            ]
        }
    },
    {
        path: 'organization-head',
        name: 'organizationHead',
        component: organizationHead,
        meta: {
            title: 'Organization Head',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Organization Head' }
            ]
        }
    },
    {
        path: 'location',
        name: 'location',
        component: location,
        meta: {
            title: 'Location',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Location' }
            ]
        }
    },
    {
        path: 'organization',
        name: 'organization',
        component: organization,
        meta: {
            title: 'Organization',
            breadcrumb: [
                { title: 'Work Structure', name: 'workStructure' },
                { title: 'Organization' }
            ]
        }
    }
    ],
    meta: {
        breadcrumb: [{ title: 'Employee Management' }],
        childPages: [
            { title: 'Employee Information', name: 'businessGroup' },
            
        ]
    }
};
