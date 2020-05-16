<template>
  <v-content>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols xs="12" sm="8" md="8" lg="6" my-3 py-3>
          <v-card class="elevation-5">
            <v-card-text>
              <v-img :src="require('../../assets/220px.png')" contain height="120" style="padding: 0"></v-img>
              <v-card-text>
                <h1
                  class="text-xs-center text-md-center display-1 font-weight-light my-1 py-1"
                >Sign In</h1>
              </v-card-text>
              <v-form class="login">
                <v-text-field
                  color="red darken-1"
                  prepend-icon="person"
                  name="login"
                  label="Username"
                  type="text"
                  v-model="formData.username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="formData.password"
                  color="red darken-1"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-container fluid>
                <v-row align="center" justify="center" fill-height>
                  <v-col cols my-0 py-0 md="3" sm="3" lg="3">
                    <v-btn
                      @click="submit"
                      :loading="loading"
                      color="red darken-1 white--text"
                      class="mx-0 pl-3"
                    >
                      <v-icon class="mx-0 pr-2 white--text">exit_to_app</v-icon>Sign In
                    </v-btn>
                  </v-col>
                  <v-col cols my-0 py-0 md="3" sm="3" lg="3">
                    <v-btn color="red darken-1 white--text" class="mx-0 pl-3">
                      <v-icon class="mx-0 pr-2 white--text">how_to_reg</v-icon>Single Sign In
                    </v-btn>
                  </v-col>
                </v-row>
                <br />
                <v-row justify="center">
                  <v-col cols md="6" justify="center">
                    <v-btn
                      tile
                      color="grey darken-3"
                      class="mx-0 pl-3 white--text"
                    >Forgot Password ?</v-btn>
                  </v-col>
                  <commonDialog :dialogVisible="myDialogVisible" @close="myDialogClose" />
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import commonMixins from "../../mixins/commonMixins";
export default {
  name: "login",
  mixins: [commonMixins],
  components: {},
  data: () => {
    return {
      // button loading
      loading: false,
      //form data
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      //button loading
      this.loading = true;

      //data and config for axios
      this.apiRequestData.method = "post";
      this.apiRequestData.api = "/auth/signin";
      this.apiRequestData.item = this.formData;

      this.$store
        .dispatch("callApi", this.apiRequestData)
        .then(response => {
          this.loading = false;
          //set cookie
          this.$cookies.set("accessToken", response.accessToken);
          this.$cookies.set("username", this.formData.username);

          //show msg
          this.$awn.success("Success");

          //push to next page
          this.$router.push({ name: "workStructure" });
        })
        .catch(() => {
          this.loading = false;
          this.$awn.alert("Failed");
        });
    }
  },
  mounted() {
    // this.myDialogVisible = true;

    //remove all cookies
    this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
  }
};
</script>

<style scoped lang="scss">
.v-btn {
  min-width: 200px;
}
</style>
