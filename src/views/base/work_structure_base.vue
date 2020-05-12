<template>
	<span>
		<child_page_items :root-path="pageRouteName" />
		<router-view></router-view>
	</span>

</template>

<script>
	export default {
		name: 'work_structure_base',
		title: 'Work Structure',
		data: () => ({

			pageRouteName: 'work_structure',
			isLoading: false

		}),
		created() {

			console.log('hi I am riyad');


		},
		methods: {},
		mounted() {}
	};
</script>
