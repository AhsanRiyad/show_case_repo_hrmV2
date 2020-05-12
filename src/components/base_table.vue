<template>
	<span>
		<v-card>
			<v-card-title>
				<v-btn tile color="red darken-1" dark @click.stop="dialog = true" >Open Dialog</v-btn>
				<v-spacer></v-spacer>
				<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="Search"
				single-line
				hide-details
				></v-text-field>
			</v-card-title>
			<v-data-table
			:headers="table_header"
			:items="desserts"
			:search="search"
			class="elevation-1 table-header scroll-y"
			>
			<template v-slot:item.actions="item">
				hellow {{ checkingHeaders(item) }}
			</template>
		</v-data-table>
	</v-card>

	<v-row justify="center">
		<v-dialog v-model="dialog" persistent max-width="800px">
			<v-card>
				<v-toolbar class="white--text" color="red darken-1">
					City Bank
				</v-toolbar>
				<v-container>
					<v-form ref="form">
						<slot ref="slot_form" name="form"> </slot>
					</v-form>
				</v-container>

				<v-card-text>
					<v-container>
						<v-row>

						</v-row>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
					<v-btn color="red darken-1" text @click.stop="submit">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>

</span>
</template>

<script>
	export default {
		name: 'base_table',
		components: {
		},
		props: ['table_header' , 'form_array'],
		data: () => ({
			dialog: false,

			search: '',
			headers: [],

			desserts: [
			{
				name: 'Frozen Yogurt',
				calories: 159,
				fat: 6.0,
				carbs: 24,
				protein: 4.0,
				iron: '1%',
			},
			{
				name: 'Ice cream sandwich',
				calories: 237,
				fat: 9.0,
				carbs: 37,
				protein: 4.3,
				iron: '1%',
			},
			{
				name: 'Eclair',
				calories: 262,
				fat: 16.0,
				carbs: 23,
				protein: 6.0,
				iron: '7%',
			},
			{
				name: 'Cupcake',
				calories: 305,
				fat: 3.7,
				carbs: 67,
				protein: 4.3,
				iron: '8%',
			},
			{
				name: 'Gingerbread',
				calories: 356,
				fat: 16.0,
				carbs: 49,
				protein: 3.9,
				iron: '16%',
			},
			{
				name: 'Jelly bean',
				calories: 375,
				fat: 0.0,
				carbs: 94,
				protein: 0.0,
				iron: '0%',
			},
			{
				name: 'Lollipop',
				calories: 392,
				fat: 0.2,
				carbs: 98,
				protein: 0,
				iron: '2%',
			},
			{
				name: 'Honeycomb',
				calories: 408,
				fat: 3.2,
				carbs: 87,
				protein: 6.5,
				iron: '45%',
			},
			{
				name: 'Donut',
				calories: 452,
				fat: 25.0,
				carbs: 51,
				protein: 4.9,
				iron: '22%',
			},
			{
				name: 'KitKat',
				calories: 518,
				fat: 26.0,
				carbs: 65,
				protein: 7,
				iron: '6%',
			},
			],
		}),
		methods: {
			checkingHeaders(item){
				console.log(item);
			},
			submit(){
				console.log(this.$refs.form);
				console.log(this.form_array );

				this.$awn.success(`Saved successfully`);
			}
		},
		created(){
			console.log('this is attrs');
			console.log(this.$attrs);
		}
	};
</script>

<style scoped></style>

<style lang="scss" scoped>
	.table-header {
		thead {
			border-width: 1px;
			border-style: solid;
			border-color: #8e8a8b transparent;
			background: linear-gradient(to top, #ececf3 0%, white 100%);
			text-decoration: white;
		}
		th {
			position: sticky !important;
			background: linear-gradient(to top, #ececf3 0%, white 100%);
			color: #f5f5f5;
			font-weight: 600;
		}
		.column{
			font-weight: 5px;
			font-size: 1.15em;
			color: #564e5f;
		}
	}
	table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
		padding: 0 .1em;
	}

	.v-icon--link {
		padding-top: 0.6em;
	}
/*tr:first-child .v-icon--link /deep/{
	padding-top: .5em;
	}*/
	.v-datatable tbody tr:first-child td:last-child i:first-child {
		margin-left: 1.35em;
	}

	.v-card__title {
		padding : 0;
		min-height: 6em;
	}
	.v-datatable__actions {
		display: none !important;
	}

	.v-label {
		color: white;
	}
</style>
