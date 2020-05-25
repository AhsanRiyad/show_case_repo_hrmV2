<template>
  <v-card>
    <v-tabs v-model="tab" background-color="red darken-1" centered dark>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="n in tabItems" :href="'#'+n.href" :key="n.href">{{ n.title }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="n in tabItems" :value="n.href" :key="n.href">
        <v-card flat>
          <v-card-text>
            <keep-alive>
              <component v-bind:is="n.component"></component>
            </keep-alive>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-bottom-navigation dark v-model="activeTab" :value="true" color="primary" horizontal>
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
    /*eslint-disable */
    personalInfo: () =>
      import("./employeeManagement/employeeInformation/personalInfo"),
    officeInfo: () =>
      import("./employeeManagement/employeeInformation/officeInfo")
    /*eslint-enable */
  },
  data() {
    return {
      activeBtn: 1,
      activeTab: "",
      tab: null,

      tabItems: [
        {
          href: "personal",
          title: "Personal",
          component: "personalInfo"
        },
        {
          href: "office",
          title: "Office",
          component: "officeInfo"
        }
      ],

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
