<template>
    <v-content>
        <v-container fluid fill-height>
            <v-row align="center" justify="center" >
                <v-col cols xs="12" sm="8" md="8" lg="6" my-3 py-3 >
                    <v-card class="elevation-5" >
                        <!--<v-toolbar color="white" flat>
                            <v-card-text>
                                <h1
                                    class="text-xs-center display-2 font-weight-thin  my-4 py-4"
                                >
                                    Login Form
                                </h1>
                            </v-card-text>
                            <v-spacer></v-spacer>
                        </v-toolbar>-->
                        <v-card-text>
                            <v-img
                            :src="require('@/assets/220px.png')"
                            contain
                            height="120"
                            style="padding: 0"
                            ></v-img
                            ><v-card-text>
                                <h1
                                class="text-xs-center text-md-center display-1 font-weight-light  my-1 py-1"
                                >
                                Sign In
                            </h1>
                        </v-card-text>
                        <v-form class="login">
                            <v-text-field
                            color="red darken-1"
                            prepend-icon="person"
                            name="login"
                            label="Username"
                            type="text"
                            autofocus
                            required
                            ></v-text-field>
                            <v-text-field
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
                        <v-container fluid >
                            <v-row
                            align="center"
                            justify="center"
                            fill-height
                            >
                            <v-col cols my-0 py-0 md="3" sm="3" lg="3">
                                <v-btn
                                
                                color="red darken-1 white--text"
                                class="mx-0 pl-3"
                                ><v-icon class=" mx-0 pr-2 white--text"
                                >exit_to_app</v-icon
                                >Sign In</v-btn
                                >
                            </v-col>
                            <v-col  cols my-0 py-0 md="3" sm="3" lg="3" >
                                <v-btn
                                
                                color="red darken-1 white--text"
                                class="mx-0 pl-3"
                                ><v-icon class=" mx-0 pr-2 white--text"
                                >how_to_reg</v-icon
                                >Single Sign In</v-btn
                                >
                            </v-col>
                        </v-row>
                        <br />
                        <v-row justify="center">
                            <v-col cols md="6" justify="center">
                                <v-btn
                                tile
                                color="grey darken-3"
                                class="mx-0 pl-3 white--text"
                                >Forgot Password ?</v-btn
                                >
                            </v-col>
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

</script>

<style scoped lang="scss">
    .v-btn  {
        min-width: 200px;
    }
</style>
