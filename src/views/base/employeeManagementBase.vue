<template>
	<span>
		<childPageItems :root-path="pageRouteName" />
		<router-view></router-view>
	</span>

</template>

<script>
	export default {
		name: 'employeeManagement',
		title: 'Employee Management',
		data: () => ({
			pageRouteName: 'employeeManagement',
			isLoading: false
		}),
		created() {
			console.log('hi I am riyad');
		},
		methods: {},
		mounted() {}
	};
</script>
