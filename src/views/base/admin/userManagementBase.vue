<template>
	<span>
		<childPageItems :root-path="pageRouteName" />
		<router-view></router-view>
	</span>
</template>

<script>
	export default {
		name: 'userManagement',
		title: 'User Management',
		data: () => ({
			pageRouteName: 'userManagement',
			isLoading: false
		}),
		created() {
			console.log('hi I am riyad');
		},
		methods: {},
		mounted() {}
	};
</script>
