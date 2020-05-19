const businessGroup = () => import('../../views/workStructure/businessGroup');
const companyClassType = () => import('../../views/workStructure/companyClassType');
const officeType = () => import('../../views/workStructure/officeType');
const office = () => import('../../views/workStructure/office');
const organizationType = () => import('../../views/workStructure/organizationType');
const designation = () => import('../../views/workStructure/designation');
const grade = () => import('../../views/workStructure/grade');
const location = () => import('../../views/workStructure/location');
const organizationHead = () => import('../../views/workStructure/organizationHead');
const organizationTree = () => import('../../views/workStructure/organizationTree');

export default {
	path: '/ws',
	name: 'workStructure',
	title: 'Work Structure',
	component: () =>
		import(
		/* webpackChunkName: "workStructure" */ '../../views/base/workStructureBase'
		),
	children: [{
		path: 'business-group',
		name: 'businessGroup',
		component: businessGroup,
		meta: {
			title: 'Business Group',
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
		path: 'organization',
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
		path: 'organization-tree',
		name: 'organizationTree',
		component: organizationTree,
		meta: {
			title: 'Organization Tree',
			breadcrumb: [
				{ title: 'Work Structure', name: 'workStructure' },
				{ title: 'Organization Tree' }
			]
		}
	}
	],
	meta: {
		breadcrumb: [{ title: 'Work Structure' }],
		childPages: [
			{ title: 'Business group', name: 'businessGroup' },
			{ title: 'Office Type', name: 'officeType' },
			{ title: 'Office', name: 'office' },
			{ title: 'Organization Type', name: 'organizationType' },
			{ title: 'Organization Head', name: 'organizationHead' },
			{ title: 'Organization Tree', name: 'organizationTree' },
			{ title: 'Designation', name: 'designation' },
			{
				title: 'Company Classification Type',
				name: 'companyClassType'
			},
			{ title: 'Grade', name: 'grade' },
			{ title: 'Location', name: 'location' }
		]
	}
};
