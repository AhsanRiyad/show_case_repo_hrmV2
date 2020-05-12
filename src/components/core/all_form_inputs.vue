<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="12" :md="n.type == 'v_text_area' ?  12 : 6" v-for="(n, i) in form_array" :key="i" >

				<v-textarea
				v-if=" n.type == 'v_text_area' "
				filled
				rows="2"
				:label="n.label"
				v-model="n.v_model"
				:rules="field_rules_prop(n.label)"
				></v-textarea>

				<v-text-field 
				v-if=" n.type == 'v_text_field' "
				color="red darken-1"
				:label="n.label"
				v-model="n.v_model"
				:rules="field_rules_prop(n.label)"
				></v-text-field>

				<v_autocomplete 
				v-if="n.type == 'v_autocomplete' "
				:label="n.label"
				v-model="n.v_model"
				:rules="field_rules_prop(n.label)"
				>
				</v_autocomplete>
				
				<v_datepicker 
				v-if="n.type == 'v_datepicker'"
				:label="n.label"
				v-model="n.v_model"
				:min=" !R.isNil(n.min) ? R.find(R.propEq('label' , n.min))(form_array).v_model : '' "
				:max=" !R.isNil(n.max) ? R.find(R.propEq('label' , n.max))(form_array).v_model : '' "
				>
				</v_datepicker>

			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import common_mixins from '@/mixins/common_mixins'


	export default {
		name:'all_form_input',
		props:['form_array'],
		mixins: [common_mixins],
		data(){
			return {
				
			}
		},
		methods:{

		},
		mounted(){
			console.log(this.form_array);
		},
		watch: {
			form_array: {

				handler(newVal, oldVal){
					console.log('inside watch handler all_form_input');
					console.log(newVal);
					console.log(oldVal);
				},
				immediate: true,
				deep: true,
			}
		}
	}
</script>