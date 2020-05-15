<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        :md="n.type == 'cTextArea' ?  12 : 6"
        v-for="(n, i) in formArray"
        :key="i"
        @click.stop="solveInputValidation"
      >
        <v-textarea
          
          v-if=" n.type == 'cTextArea' "
          filled
          rows="2"
          :label="n.label"
          v-model="n.value"
          :rules="fieldRulesProp(n.required ,  n.name)"
          clearable
        ></v-textarea>

        <!-- here setNewOrOldChecker is for creating new value and for form validation, all are linked up -->
        <v-text-field
          
          v-if=" n.type == 'cTextField' "
          color="red darken-1"
          :label="n.label"
          v-model="n.value"
          :rules="fieldRulesProp(n.required ,  n.name)"
          clearable
        ></v-text-field>

        <cAutoComplete
          v-if="n.type == 'cAutoComplete' "
          :label="n.label"
          v-model="n.value"
          :api=" !R.isNil(n.api) ? n.api : '' "
          :rules="{ required: n.required , name: n.Name }"
        ></cAutoComplete>

        <cDatePicker
          v-if="n.type == 'cDatePicker'"
          :label="n.label"
          v-model="n.value"
          :min=" !R.isNil(n.min) ? R.find(R.propEq('name' , n.min))(formArray).value : '' "
          :max=" !R.isNil(n.max) ? R.find(R.propEq('name' , n.max))(formArray).value : '' "
          :rules="{ required: n.required , name: n.Name }"
        ></cDatePicker>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import { eventBus } from "@/main";
export default {
  name: "allFormInput",
  props: ["formArray", "age2"],
  mixins: [commonMixins],
  data() {
    return {
      counter: 0
    };
  },
  methods: {},
  created() {
    //this event is being fired from baseTable viewItem function, the the definition is in the common mixins file
    eventBus.$on("updateForm", itemFromBaseTable => {
      console.log("firing event bus");
      // console.log(item);

      // console.log("this is form array");
      // console.log(this.formArray);
      // this.formArray[2].value ="2020-02-02";
      this.formArray.forEach((n, i) => {
        if (this.R.has(n.name, itemFromBaseTable)) {
          console.log(itemFromBaseTable[n.name]);
          this.formArray[i].value = itemFromBaseTable[n.name];
        }
      });
    });
  },
  updated() {
    // this.$store.commit("setNewOrOldChecker", "updated");
    console.log(this.$store.getters.getNewOrOldChecker);
  },
  destroy() {},
  watch: {
    formArray: {
      handler() {},
      immediate: true,
      deep: true
    }
  }
};
</script>