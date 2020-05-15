<template>
  <v-app>
    <!-- basic condition is if the route is sign-in then do not show the toobar and breadcrumbs -->
    <toolbar v-if="showOrHideMenu"></toolbar>
    <v-content>
    <!-- basic condition is if the route is sign-in then do not show the toobar and breadcrumbs -->
      <breadcrumbs v-if="showOrHideMenu" />
      <router-view ></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import * as R from 'ramda'
export default {
  name: "app",
  data: () => {
    return {};
  },
  computed: {
    showOrHideMenu() {
      //this is for getting last route name, this will be set on the index page of router directory
      if(this.$store.getters.getActiveRouteName == "signIn"){
        return false;
      }
      return true;
    }
  },
};
</script>
