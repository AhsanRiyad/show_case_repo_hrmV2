const business_group = () => import('@/views/work_structure/business_group');

export default {
	path: '/work_structure',
	name: 'work_structure',
	title: 'Work Structure',
	component: () =>
	import(
		/* webpackChunkName: "work_structure" */ '@/views/base/work_structure_base'
		),
	children:[
	{
		path: 'business_group',
		name: 'business_group',
		component: business_group,
		meta: {
			title: 'Business Group',
			breadcrumb: [
			{ name: 'Work Structure', link: 'work_structure' },
			{ name: 'Business Group' }
			]
		}
	},
	],
	meta : {
		breadcrumb: [{ name: 'Work Structure' }],
		childPages: [
		{ name: 'Business group', link: 'business_group' },
		{ name: 'Office Type', link: 'office_type' },
		{ name: 'Office', link: 'office' },
		{ name: 'Organization Type', link: 'organization_type' },
		{ name: 'Organization Head', link: 'organization_head' },
		{ name: 'Organization Tree', link: 'organization_tree' },
		{ name: 'Designation', link: 'designation' },
		{
			name: 'Company Classification Type',
			link: 'company_classification_type'
		},
		{ name: 'Grade', link: 'grade' },
		{ name: 'Location', link: 'location' }
		]
	}
};
