<template>
	<span>
		<childPageItems :root-path="pageRouteName" />
		<router-view></router-view>
	</span>

</template>

<script>
	export default {
		name: 'workStructureBase',
		title: 'Work Structure',
		data: () => ({

			pageRouteName: 'workStructure',
			isLoading: false

		}),
		created() {

			console.log('hi I am riyad');


		},
		methods: {},
		mounted() {}
	};
</script>
