<template>
	<span>
		<baseTable v-bind="$attrs"	:tableHeader="tableHeader" :formArray="formArray" apiBase="ws/companyClassType/">
		<template v-slot:formBaseTable=" age2 " >

			<allFormInputs :age2="age2" :formArray.sync="formArray" >
			</allFormInputs>

		</template>
		</baseTable>
	</span>
</template>

<script>
	import commonMixins from '@/mixins/commonMixins'
	export default {
		name: 'companyClassType',
		components: {
		},
		props: ['age'],
		mixins: [commonMixins],
		data: vm => ({
			name: 'riyad',
			tableHeader: [
			{
				text: 'Name',
				align: 'start',
				sortable: false,
				value: 'name',
			},
			{ text: 'Description', value: 'description' },
			{ text: 'Start Date', value: 'startDate' },
			{ text: 'End Date', value: 'endDate' },
			{ text: 'Actions', value: 'actions' },
			
			],

			formArray: [
			{
				type: 'cTextArea',
				label: 'Name',
				value: '',
				fun: vm.ch,
			},
			{
				type: 'cTextField',
				label: 'Name',
				value: '',
			},
			{
				type: 'cTextField',
				value: '',
				label: 'Age',
			},
			{
				type: 'cAutoComplete',
				value: '',
				label: 'city',
			},
			{
				type: 'cDatePicker',
				value: '',
				label: 'Start Date',
				max: 'End Date',

			},
			{
				type: 'cDatePicker',
				value: '',
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
