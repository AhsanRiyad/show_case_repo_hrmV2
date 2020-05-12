<template>
	<span>
		<base_table v-bind="$attrs"	:table_header="table_header" :form_array="form_array">
		<template v-slot:form>

			<all_form_inputs :form_array.sync="form_array" >
			</all_form_inputs>


		</template>
		</base_table>
	</span>
</template>

<script>
	import common_mixins from '@/mixins/common_mixins'
	export default {
		name: 'business_group',
		components: {
		},
		props: ['age'],
		mixins: [common_mixins],
		data: vm => ({

			name: 'riyad',

			table_header: [
			{
				text: 'Dessert (100g serving)',
				align: 'start',
				sortable: false,
				value: 'name',
			},
			{ text: 'Calories', value: 'calories' },
			{ text: 'Fat (g)', value: 'fat' },
			{ text: 'Carbs (g)', value: 'carbs' },
			{ text: 'Protein (g)', value: 'protein' },
			{ text: 'Iron (%)', value: 'iron' },
			{ text: 'Actions', value: 'actions' },
			],

			form_array: [
			{
				type: 'v_text_area',
				label: 'Name',
				v_model: '',
				fun: vm.ch,
			},
			{
				type: 'v_text_field',
				label: 'Name',
				v_model: '',
			},
			{
				type: 'v_text_field',
				v_model: '',
				label: 'Age',
			},
			{
				type: 'v_autocomplete',
				v_model: '',
				label: 'city',
			},
			{
				type: 'v_datepicker',
				v_model: '',
				label: 'Start Date',
				max: 'End Date',

			},
			{
				type: 'v_datepicker',
				v_model: '',
				label: 'End Date',
				min: 'Start Date', 

			},

			]

		}),
		computed: {
		},
		watch: {},
		created(){

		}
	};
</script>

<style scoped></style>
