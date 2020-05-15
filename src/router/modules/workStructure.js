const businessGroup = () => import('@/views/workStructure/businessGroup');
const companyClassType = () => import('@/views/workStructure/companyClassType');

export default {
	path: '/ws',
	name: 'workStructure',
	title: 'Work Structure',
	component: () =>
		import(
		/* webpackChunkName: "workStructure" */ '@/views/base/workStructureBase'
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
	}
	],
	meta: {
		breadcrumb: [{ title: 'Work Structure' }],
		childPages: [
			{ title: 'Business group', name: 'businessGroup' },
			{ title: 'Office Type', name: 'office_type' },
			{ title: 'Office', name: 'office' },
			{ title: 'Organization Type', name: 'organization_type' },
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
