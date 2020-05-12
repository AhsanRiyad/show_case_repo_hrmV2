<template>
  <v-menu
  ref="menu"
  v-model="menu"
  :close-on-content-click="false"
  :return-value.sync="date"
  transition="scale-transition"
  offset-y
  min-width="290px"
  >
  <template v-slot:activator="{ on }">
    <v-text-field
    v-model="dateFormatted"
    :label="label"
    color="red darken-1"
    prepend-icon="event"
    readonly
    clearable
    v-on="on"
    :rules="field_rules_prop('date')"
    ></v-text-field>
  </template>
  <v-date-picker 
  :min="min"
  :max="max"
  @input="handleValue"
  v-model="date"
  no-title scrollable
  >
  <v-spacer></v-spacer>
  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
  <v-btn text color="primary" @click="$refs.menu.save(date)" >OK</v-btn>
</v-date-picker>
</v-menu>
</template>

<script>
  import common_mixins from '@/mixins/common_mixins'

  export default {
    name:'v_datepicker',
    props:['value', 'label', 'min', 'max'],
    mixins: [common_mixins],
    data: () => ({
      date: "",
      dateFormatted: "" , 
      menu: false,
      modal: false,
      menu2: false,
    }),
    computed: {
      inputVal: {
        get() {
          return this.value;
        },
        set(val) {
          this.date = val;
          console.log('in the set function');
          console.log(val);
          this.$emit('input', val);
        }
      }
    },
    methods: {
      getDateFormatted(date){
        return this.moment(date).format('DD-MM-YYYY');
      },
      handleValue(val){
        console.log('value input');
        console.log(val);
        this.$emit('input', val);

        console.log('value printing');
        console.log(this.value);

      },
    },
    mounted(){
      this.date = this.value;
      console.log('min date');
      console.log(this.min);
      console.log('max date');
      console.log(this.max);
    },
    watch:{
      value: {
        handler: function(newVal, oldVal){
          console.log('inside watch handler datePicker');
          console.log(newVal);
          console.log(oldVal);
        },
        immediate: true,
      },
      min: {
        handler: function(newVal, oldVal){
          console.log('inside watch handler datePicker min change');
          console.log(newVal);
          console.log(oldVal);
        },
        immediate: true,
      },
      max: {
        handler: function(newVal, oldVal){
          console.log('inside watch handler datePicker max change');
          console.log(newVal);
          console.log(oldVal);
        },
        immediate: true,
      },
      date: {
        handler: function(newVal, oldVal){
          console.log('date watch');
          console.log('new val '+ newVal);
          console.log('old val ' +oldVal);
          this.dateFormatted = this.moment(this.date).format('DD-MM-YYYY');
          this.dateFormatted == 'Invalid date' ? this.dateFormatted = "": '';

        },
        immediate: true,
      }
    },
    updated(){
      console.log('in the updated hook');
      console.log(this.date);
    }
  }
</script>