const businessGroup = () => import('../../views/workStructure/businessGroup');
const companyClassType = () => import('../../views/workStructure/companyClassType');
const officeType = () => import('../../views/workStructure/officeType');
const office = () => import('../../views/workStructure/office');
const organizationType = () => import('../../views/workStructure/organizationType');

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
	}
	],
	meta: {
		breadcrumb: [{ title: 'Work Structure' }],
		childPages: [
			{ title: 'Business group', name: 'businessGroup' },
			{ title: 'Office Type', name: 'officeType' },
			{ title: 'Office', name: 'office' },
			{ title: 'Organization Type', name: 'organizationType' },
			{ title: 'Organization Head', name: 'organization_head' },
			{ title: 'Organization Tree', name: 'organization_tree' },
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
