<template>
  <div>
    <v-card>
      <!-- left navigation drawer starts -->
      <v-navigation-drawer fixed v-model="drawerLeftExpand" app clipped left>
        <v-treeview
          v-model="tree"
          :open="open"
          :items="itemsTreeView"
          activatable
          item-key="name"
          open-on-click
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon
              v-if="item.icon == 'mdi-folder-open'"
            >{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
            <v-icon v-else router :to="{ name: item.name }">{{ item.icon }}</v-icon>
          </template>

          <template slot="label" slot-scope="{ item }">
            <router-link
              :to="{ name: item.name }"
              style="color: black; text-decoration: none;"
            >{{ item.name }}</router-link>
          </template>
        </v-treeview>
      </v-navigation-drawer>
      <!-- left navigation drawer ends -->

      <!-- right navigation drawer starts -->
      <v-navigation-drawer fixed v-model="drawerRightExpand" app clipped right>
        <v-row justify="center">
          <v-expansion-panels flat active-class>
            <v-expansion-panel v-for="(item,i) in notificationItems" :key="i">
              <v-expansion-panel-header flat>
                <div>
                  <v-icon color="red darken-1">{{ item.icon }}</v-icon>

                  <v-badge color="red darken-1" content="6">
                    <span class="ml-3">{{ item.title }}</span>
                  </v-badge>
                </div>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-expansion-panels popout v-if=" !Array.isArray(item.item) ">{{ item.item }}</v-expansion-panels>
                <v-expansion-panels popout v-else>
                  <v-expansion-panel v-for="(n,i) in item.item" :key="i">
                    <v-expansion-panel-header>
                      <div>
                        <span>{{ n.title }}</span>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>{{ n.msg }}</v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-navigation-drawer>
      <!-- right navigation drawer ends -->

      <v-app-bar app fixed dark clipped-left clipped-right class="red darken-1 trying">
        <img src="../../assets/logo.png" width="46px" alt="logo" />

        <v-toolbar-title>EXPLORE</v-toolbar-title>

        <v-app-bar-nav-icon @click.stop="drawerLeftExpand = !drawerLeftExpand"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-btn icon @click.stop="drawerRightExpand = !drawerRightExpand">
          <v-icon>notifications</v-icon>
        </v-btn>

        <!-- future work -->
        <!-- state -->
        <v-subheader class="title white--text">Riyad Ahsan</v-subheader>

        <v-btn fab icon>
          <!-- future work -->
          <!-- state -->
          <v-avatar color="grey lighten-4" size="36">
            <img alt="photo" src="../../assets/logo.png" />
          </v-avatar>
        </v-btn>

        <v-btn color="white" class="black--text" rotuer :to="{ name: 'signIn' }" >Logout</v-btn>

        <template v-slot:extension>
          <v-tabs show-arrows v-model="active_tab">
            <v-tabs-slider  color="white"></v-tabs-slider>
            <v-tab
              v-for="item in $store.getters.getTabsMenuList"
              :key="item.title"
              class="tab-hover "
              @click="()=>changeTab(item)"
            >{{ item.title }}</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
    </v-card>
  </div>
</template>
<script>
// import * as R from 'ramda'
/* eslint-disable */

export default {
  name: "toolbar",
  data() {
    return {
      //toolbar height
      toolbarHeight: 38,

      //drawer left
      drawerLeftExpand: true,
      drawerRightExpand: true,

      //tree view
      open: ["public"],
      files: {
        html: "mdi-language-html5",
        js: "mdi-nodejs",
        json: "mdi-json",
        md: "mdi-markdown",
        pdf: "mdi-file-pdf",
        png: "mdi-file-image",
        txt: "mdi-file-document-outline",
        file: "mdi-file-document-outline",
        xls: "mdi-file-excel"
      },
      tree: [],
      itemsTreeView: [],

      //notification items
      notificationItems: [
        {
          title: "Your Notifications",
          icon: "notifications",
          item: "Test Conotentajfoejforejf oifjojrefo o jfreofjoref"
        },
        {
          title: "Line Notifications",
          icon: "supervised_user_circle",
          item: "Test"
        },
        {
          title: "Line Notifications",
          icon: "share",
          item: [
            {
              title: "Line Notifications",
              icon: "share",
              msg: "Test"
            }
          ]
        }
      ],
      //dummy data for tab
      active_tab : null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  "
    };
  },
  computed: {
    accessibleModules() {
      //this.$store.commit('SET_ACCESSIBLE_MODULES');
      // this.$store.commit('SET_ROLE_BASED_MODULES');
      return this.$store.state.availableModules;
    }
  },
  methods: {
    goToUrl(item) {
      console.log(item);
      // this.$router.push({ name: })
    },
    changeTab(tab) {
      console.log('this is the active tab');
      console.log(this.active_tab);

      console.log(tab.name);
      let leftSideBarItems = this.$store.getters.getState;
      // console.log(leftSideBarItems);
      // console.log(leftSideBarItems[tab.link].subModules);

      this.itemsTreeView = [...leftSideBarItems[tab.name].subModules];

      // console.log(leftSideBarItems.workStructureModule.subModules);
      console.log("in the tab");
      console.log(this.$route);

      //checks if i'am already in the same tab
      if (this.$route.name != tab.name) this.$router.push({ name: tab.name });
      // this.$router.push({ name: 'business_group' });
    }
  },
  created() {
    // console.log(this.$store.getters.get_tabs_menu_list);
    // console.log(this.$store.state);

    this.itemsTreeView = this.$store.getters.getState.workStructure.subModules;

  }
};
</script>

    <style lang="scss">
</style>