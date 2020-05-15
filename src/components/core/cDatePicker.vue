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
    :rules="fieldRulesProp( rules.required , rules.name )"
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
  import commonMixins from '@/mixins/commonMixins'

  export default {
    name:'cDatePicker',
    props:['value', 'label', 'min', 'max', 'rules'],
    mixins: [commonMixins],
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
          this.$emit('input', val);
        }
      }
    },
    methods: {
      getDateFormatted(date){
        return this.moment(date).format('DD-MM-YYYY');
      },
      handleValue(val){
        this.$emit('input', val);
      },
    },
    mounted(){
      this.date = this.value;
    },
    watch:{
      value: {
        handler: function(){
        },
        immediate: true,
      },
      min: {
        handler: function(){
        },
        immediate: true,
      },
      max: {
        handler: function(){
        },
        immediate: true,
      },
      date: {
        handler: function(){
          this.dateFormatted = this.moment(this.date).format('DD-MM-YYYY');
          this.dateFormatted == 'Invalid date' ? this.dateFormatted = "": '';

        },
        immediate: true,
      }
    },
    updated(){
    }
  }
</script>