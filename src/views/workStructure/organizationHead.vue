<template>
  <span>
    <baseTable
      :tableHeader="tableHeader"
      :formArray="formArray"
      booleanValueInTheTable="costCenter"
    >
      <template v-slot:formBaseTable=" age2 ">
        <allFormInputs :age2="age2" :formArray.sync="formArray"></allFormInputs>
      </template>
    </baseTable>
  </span>
</template>
<script>
import commonMixins from "../../mixins/commonMixins";
export default {
  name: "organizationHead",
  components: {},
  props: ["age"],
  mixins: [commonMixins],
  data: (vm) => ({
    tableHeader: [
      {
        text: "Organization Name",
        align: "start",
        sortable: false,
        value: "organizationName"
      },
      { text: "Employee Name", value: "employeeName" },
      { text: "Employee Id", value: "employeeId" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Actions", value: "actions" }
    ],
    formArray: [
      {
        type: "cTreeSelect",
        label: "Select Organiztion",
        name: "orgParentId",
        value: null,
        visible: true,
        required: true
      },
      {
        type: "cAutoComplete",
        label: "Employee*",
        name: "supervisorId",
        api: "/em/employee/getAll/active?page=0&pageSize=50",
        required: true,
        value: ""
      },
      {
        type: "cTextField",
        label: "Search Employee*",
        name: "searchSupervisor",
        value: "",
        filled: true,
        appendIcon: "search",
        required: false,
        keyUpEvent: vm.updateSuperVisorList,
        shouldInclude: false,
      },
      {
        type: "cDatePicker",
        value: "",
        label: "Start Date*",
        name: "startDate",
        required: true,
        max: "endDate"
      },
      {
        type: "cDatePicker",
        value: "",
        label: "End Date",
        name: "endDate",
        required: false,
        min: "startDate"
      }
    ]
  }),
  methods:{

    
        updateEmployeeSubType(id) {
            console.log("in the update subtype");
            console.log(id);
            let index = this.R.findIndex(this.R.propEq("name", "employeeSubtypeId"))(
                this.officeInfo
            );
            console.log(index);

            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.$store.commit('setRequestMethod', 'get');
            this.apiRequestData.api = "/em/employeeSubtype/getActive/" + id;
            this.apiRequestData.item = {};

            //axios calling, actions will be dispatched asynchronously
            this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                console.log(response);
                this.officeInfo[index].items = response;
            });

            // this.officeInfo[index].items = [{ name: "cc", id: "cc" }];
            // this.officeInfo[index].type ='cTextField';
        },
        updateSuperVisorList(n) {
            let index = this.R.findIndex(this.R.propEq("name", "supervisorId"))(
                this.officeInfo
            );
            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.$store.commit('setRequestMethod', 'get');
            this.apiRequestData.api = "/em/employeeSubtype/getActive/" + n.id;
            this.apiRequestData.item = {};
            //axios calling, actions will be dispatched asynchronously
            this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                this.officeInfo[index].items = response;
            });
        },


  },
  computed: {},
  watch: {},
  created() {}
};
</script>
<style scoped></style>
