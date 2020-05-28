<template>
  <v-card>
    <employeeBasic />

    <v-tabs v-model="tab" background-color="red darken-1" centered dark>
      <v-tabs-slider></v-tabs-slider>
      <v-tab @click="tabClick" v-for="n in tabItems" :href="'#'+n.href" :key="n.href">{{ n.title }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="n in tabItems" :value="n.href" :key="n.href">
        <v-card flat>
          <v-card-text>
            <keep-alive>
                <component ref="componentR" v-bind="{ complexView: true}" v-bind:is="n.component">
                  <template v-slot:buttons="reset">
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-btn color="red darken-1" class="white--text" @click="reset.reset">Reset</v-btn>
                        </v-col>
                        <v-col align="right">
                          <v-btn color="red darken-1" class="white--text">Submit</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                </component>
            </keep-alive>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-bottom-navigation dark background-color="red darken-1" v-model="activeTab" :value="true" color="primary" horizontal>
      <v-btn
        v-for="(n, i) in bottomTabs"
        :key="i"
        :value="n.cName"
        @click="()=>openDialog(n.cName)"
        class="red darken-1 white--text"
      >{{ n.name }}</v-btn>
    </v-bottom-navigation>

    <commonDialog @close="myDialogClose" :dialogVisible="myDialogVisible" ref="commonDialog">
      <template v-slot:otherDialog>
        <component v-bind:is="activeTab"></component>
      </template>
    </commonDialog>
  </v-card>
</template>

<script>
import commonMixins from "@/mixins/commonMixins";
export default {
  name: "editEmployee",
  mixins: [commonMixins],
  components: {
    /*eslint-disable */
    /*eslint-enable */
    businessGroup: () => import("../workStructure/businessGroup"),

    employeeBasic: () =>
      import("./employeeInformation/employeeBasic"),
    personalInfo: () =>
      import("./employeeInformation/personalInfo"),
    officeInfo: () =>
      import("./employeeInformation/officeInfo")
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
  },
  methods: {
    reset(){
      alert('in my reset function');
      console.log(this.$refs);
    },
    tabClick() {
      console.log(this);
    },
    openDialog(name) {
      console.log(this);

      console.log(name);
      console.log(this.activeTab);
      this.myDialogVisible = true;
    }
  }
};
</script>
