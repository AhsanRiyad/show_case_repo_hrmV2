<template>
  <span>
    <v-form ref="form">
      <allFormInputs :formArray.sync="formArray"></allFormInputs>
    </v-form>

    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan="2" class="grey lighten-3 black--text text-center">Employee Information</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
          <tr>
            <td  colspan="2" class="text-center">
              <v-btn  small color="red darken-1" class="white--text mb-10">Reset Password</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </span>
</template>
<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "unlockAccount",
  components: {},
  mixins: [commonMixins],
  data: vm => ({
    formArray: [
      {
        type: "cAutoComplete",
        label: "Employee*",
        name: "employeeId",
        api: "/em/ei/employee/getAll/active/dropdown/",
        required: true,
        items: [],
        value: "",
        height: 20,
      },
      {
        type: "cTextField",
        label: "Search Employee*",
        name: "searchEmployee",
        value: "",
        filled: true,
        appendIcon: "search",
        required: false,
        keyUpEvent: vm.updateDependentField,
        dependentFieldName: "employeeId",
        dependentApi: "/em/ei/employee/getAll/active/dropdown/",
        shouldInclude: false,
        height: 20,
      }
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159
      },
      {
        name: "Ice cream sandwich",
        calories: 237
      },
      {
        name: "Eclair",
        calories: 262
      },
      {
        name: "Cupcake",
        calories: 305
      },
      {
        name: "Gingerbread",
        calories: 356
      },
      {
        name: "Jelly bean",
        calories: 375
      },
      {
        name: "Lollipop",
        calories: 392
      },
      {
        name: "Honeycomb",
        calories: 408
      },
      {
        name: "Donut",
        calories: 452
      },
      {
        name: "KitKat",
        calories: 518
      }
    ]
  }),
  computed: {},
  methods: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
