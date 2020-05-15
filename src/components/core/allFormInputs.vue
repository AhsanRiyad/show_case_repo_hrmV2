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
          :rules="fieldRulesProp( !R.isNil(n.required) ? n.required : true ,  n.name)"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
          :clearable="!R.isNil(n.clearable) ? n.clearable : true"
        ></v-textarea>

        <!-- here setNewOrOldChecker is for creating new value and for form validation, all are linked up -->
        <v-text-field
          v-if=" n.type == 'cTextField' "
          color="red darken-1"
          :label="n.label"
          v-model="n.value"
          :rules="fieldRulesProp( !R.isNil(n.required) ? n.required : true ,  n.name)"
          :readonly="!R.isNil(n.readonly) ? n.readonly : false"
          :clearable="!R.isNil(n.clearable) ? n.clearable : true"
        ></v-text-field>

        <cAutoComplete
          v-if="n.type == 'cAutoComplete' "
          :label="n.label"
          v-model="n.value"
          :api=" !R.isNil(n.api) ? n.api : '' "
          :rules="{ required: !R.isNil(n.required) ? n.required : true , name: n.Name }"
        ></cAutoComplete>

        <cDatePicker
          v-if="n.type == 'cDatePicker'"
          :label="n.label"
          v-model="n.value"
          :min=" !R.isNil(n.min) ? R.find(R.propEq('name' , n.min))(formArray).value : '' "
          :max=" !R.isNil(n.max) ? R.find(R.propEq('name' , n.max))(formArray).value : '' "
          :rules="{ required: !R.isNil(n.required) ? n.required : true , name: n.Name }"
        ></cDatePicker>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
import { eventBus } from "@/main";
import { mapGetters } from "vuex";
export default {
  name: "allFormInput",
  props: ["formArray", "age2"],
  mixins: [commonMixins],
  data() {
    return {
      timestamp: [
        {
          type: "cTextField",
          label: "Created By",
          name: "createdBy",
          value: "",
          required: false,
          readonly: true,
          clearable: false
        },
        {
          type: "cTextField",
          label: "Created At",
          name: "createdAt",
          value: "",
          required: false,
          readonly: true,
          clearable: false
        },
        {
          type: "cTextField",
          label: "Updated By",
          name: "UpdatedBy",
          value: "",
          required: false,
          readonly: true,
          clearable: false
        },
        {
          type: "cTextField",
          label: "Updated At",
          name: "UpdatedAt",
          value: "",
          required: false,
          readonly: true,
          clearable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getNewOrOldChecker"])
  },
  methods: {},
  created() {
    //this event will remove extra timestamp field
    eventBus.$on("removeTimestamp", () => {
      this.formArray.some(n => n.name == "createdBy")
        ? this._.times( 4 , ()=>{ this.formArray.pop() } )
        : "";
    });


    //this event is being fired from baseTable viewItem function, the the definition is in the common mixins file
    eventBus.$on("updateForm", itemFromBaseTable => {
      console.log("firing event bus");
      //this will ensure that timspamp is not being added multiple times
      !this.formArray.some(n => n.name == "createdBy")
        ? this.timestamp.forEach(n => {
            this.formArray.push(n);
          })
        : "";

      //formArray.name == key of itemFromBaseTable matches
      this.formArray.forEach((n, i) => {
        if (this.R.has(n.name, itemFromBaseTable)) {
          this.formArray[i].value = itemFromBaseTable[n.name];
        }
      });
    });
  },
  updated() {
    // this.$store.commit("setNewOrOldChecker", "updated");
  },
  destroy() {},
  watch: {
    getNewOrOldChecker: {
      handler(newVal) {
        console.log("this is map getters");
        console.log(newVal);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>