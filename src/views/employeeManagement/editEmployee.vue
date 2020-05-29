<template>
  <v-card>
    <employeeBasic />

    <v-tabs v-model="tab" background-color="red darken-1" centered dark>
      <v-tabs-slider></v-tabs-slider>
      <v-tab @click="changeTab" v-for="n in tabItems" :href="'#'+n.href" :key="n.href">{{ n.title }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="n in tabItems" :value="n.href" :key="n.href">
        <v-card flat>
          <v-card-text>
            <component ref="componentR" v-bind="{ complexView: true}" v-bind:is="n.component">
              <template v-slot:buttons="{ funAction  }">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-btn color="red darken-1" class="white--text" @click="funAction.reset">Reset</v-btn>
                    </v-col>
                    <v-col align="right">
                      <v-btn color="red darken-1" class="white--text" @click="funAction.submit">Submit</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </template>
            </component>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-bottom-navigation
      dark
      background-color="red darken-1"
      v-model="activeTab"
      :value="true"
      color="primary"
      horizontal
    >
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
import { eventBus } from "@/main";
export default {
  name: "editEmployee",
  mixins: [commonMixins],
  components: {
    /*eslint-disable */
    /*eslint-enable */
    businessGroup: () => import("../workStructure/businessGroup"),
    employeeBasic: () => import("./employeeInformation/employeeBasic"),
    personalInfo: () => import("./employeeInformation/personalInfo"),
    officeInfo: () => import("./employeeInformation/officeInfo"),
    others: () => import("./employeeInformation/others"),
    bankAccount: () => import("./employeeInformation/bankAccount"),
    employeeAddress: () => import("./employeeInformation/employeeAddress"),
    employeeEmail: () => import("./employeeInformation/employeeEmail"),
    employeePicture: () => import("./employeeInformation/employeePicture"),
    employeeSignature: () => import("./employeeInformation/employeeSignature"),
    employeeFamilyMember: () => import("./employeeInformation/employeeFamilyMember"),
    nomineeInfo: () => import("./employeeInformation/nomineeInfo"),
    educationInfo: () => import("./employeeInformation/educationInfo"),
    careerDetails: () => import("./employeeInformation/careerDetails"),
    probation: () => import("./employeeInformation/probation"),
    professionalInfo: () => import("./employeeInformation/professionalInfo")
  },
  data() {
    return {
      activeBtn: 1,
      activeTab: "",
      tab: null,
      infoOfaId: {},

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
        },
        {
          href: "others",
          title: "Others",
          component: "others"
        },
        {
          href: "bankAccount",
          title: "Bank Account",
          component: "bankAccount"
        },
        {
          href: "employeeAddress",
          title: "Address",
          component: "employeeAddress"
        },
        {
          href: "email",
          title: "Email",
          component: "employeeEmail"
        },
        {
          href: "employeePicture",
          title: "Picture",
          component: "employeePicture"
        },
        {
          href: "employeeSignature",
          title: "Signature",
          component: "employeeSignature"
        },
      ],

      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      bottomTabs: [
        {
          name: "Family Member Info",
          cName: "employeeFamilyMember"
        },
        {
          name: "Nominee Info",
          cName: "nomineeInfo"
        },
        {
          name: "Education Info",
          cName: "educationInfo"
        },
        {
          name: "Career Detail",
          cName: "careerDetails"
        },
        {
          name: "Probation",
          cName: "probation"
        },
        {
          name: "Professional Info",
          cName: "professionalInfo"
        },
        
         /*,
            {
                name: 'Working Condition',
                cName: 'workingCondition'
            }*/
      ]
    };
  },
  methods: {
    reset() {
      alert("in my reset function");
      console.log(this.$refs);
    },
    changeTab() {
      console.log("change tab clicked");
      setTimeout(() => {
        eventBus.$emit("updateThisForm", this.infoOfaId);
      }, 1000);
    },
    openDialog(name) {
      console.log(this);
      console.log(name);
      console.log(this.activeTab);
      this.myDialogVisible = true;
    }
  },
  created() {
    eventBus.$on("updateForm", infoOfaId => {
      console.log("receiving the bus");
      console.log(infoOfaId);
      this.infoOfaId = infoOfaId;
      eventBus.$emit("updateThisForm", infoOfaId);
    });
  }
};
</script>
