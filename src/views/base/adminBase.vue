<template>
	<span>
		<childPageItems :root-path="pageRouteName" />
		<router-view></router-view>
	</span>

</template>

<script>
	export default {
		name: 'admin',
		title: 'Admin',
		data: () => ({
			pageRouteName: 'admin',
			isLoading: false
		}),
		created() {
			console.log('hi I am riyad');
		},
		methods: {},
		mounted() {}
	};
</script>
