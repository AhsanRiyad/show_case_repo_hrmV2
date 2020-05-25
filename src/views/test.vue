<template>
  <v-card>
    <v-tabs v-model="tab" background-color="red darken-1" centered dark >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">Personal</v-tab>

      <v-tab href="#tab-2">Office</v-tab>

      <v-tab href="#tab-3">Nearby</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-3">
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item value="tab-2">
        <v-card flat>
          <officeInfo />
        </v-card>
      </v-tab-item>

      <v-tab-item value="tab-1">
        <v-card flat>
          <personalInfo />
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-bottom-navigation dark :active.sync="activeTab" :value="true" color="primary" horizontal>
      <v-btn
        v-for="(n, i) in bottomTabs"
        :key="i"
        :value="n.cName"
        class="red darken-1 white--text"
      >{{ n.name }}</v-btn>
    </v-bottom-navigation>
  </v-card>
</template>

<script>
export default {
  name: "test",
  components: {
    personalInfo: () =>
      import("./employeeManagement/employeeInformation/personalInfo"),
    officeInfo: () =>
      import("./employeeManagement/employeeInformation/officeInfo")
  },
  data() {
    return {
      activeBtn: 1,
      activeTab: '',
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      bottomTabs: [
        {
          name: "Family Member Info",
          cName: "familyMember"
        },
        {
          name: "Nominee Info",
          cName: "nomineeInfo"
        },
        {
          name: "Education Info",
          cName: "educationalQualification"
        },
        {
          name: "Career Detail",
          cName: "career"
        },
        {
          name: "Probation",
          cName: "probation"
        },
        {
          name: "Professional Info",
          cName: "professionalQualification"
        } /*,
            {
                name: 'Working Condition',
                cName: 'workingCondition'
            }*/
      ]
    };
  }
};
</script>