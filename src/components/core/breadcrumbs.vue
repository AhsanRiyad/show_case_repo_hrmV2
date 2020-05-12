<template>
    <div>
        <v-subheader
        >  {{ get_sub_header }}  <v-divider inset></v-divider
            ></v-subheader>

            <v-breadcrumbs :items="items" class="breadcrumbs" divider="/">
                <template slot="item" slot-scope="props">
                    <router-link :to="{ name: props.item.link }" class="link">

                        {{
                            props.item.name
                        }}

                    </router-link>
                </template>
            </v-breadcrumbs>

        </div>

    </template>

    <script>
        import updateItemsMixin from '@/mixins/update_items_from_router';
        import * as R from 'ramda'

        export default {
            mixins: [updateItemsMixin],
            name: 'breadcrumbs',
            data: () => ({
              items: [
              {
                name: 'Dashboard',
                disabled: false,
                link: 'breadcrumbs_dashboard',
            },
            {
                name: 'Link 1',
                disabled: false,
                link: 'breadcrumbs_link_1',
            },
            {
                name: 'Link 2',
                disabled: true,
                link: 'breadcrumbs_link_2',
            },
            ],
        }),
            methods: {
                updateItemsMixins() {
                    this.items = this.$route.meta.breadcrumb;


                    console.log(this.$route);



                }
            },
            computed: {
                get_sub_header(){
                    if( !R.isNil(this.$route.meta.childPages) ){
                        return "Select to Nevigate";
                    }else {
                        console.log(this.$route);
                        return this.$route.meta.title;
                    }

                }
            },
        };
    </script>

    <style scoped>
        .breadcrumbs .link {
            text-decoration: none;
            color: #737373;
            font: bold 12px Sans-Serif;
            letter-spacing: -1px;
            white-space: nowrap;
            display: inline-block;
            position: relative;
            font-size: 1.1em;
        }
    </style>
