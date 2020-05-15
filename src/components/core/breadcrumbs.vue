<template>
    <div>
        <v-subheader
        >  {{ getSubHeader }}  <v-divider inset></v-divider
            ></v-subheader>

            <v-breadcrumbs :items="items" class="breadcrumbs" divider="/">
                <template slot="item" slot-scope="props">
                    <router-link :to="{ name: props.item.name }" class="link">

                        {{
                            props.item.title
                        }}

                    </router-link>
                </template>
            </v-breadcrumbs>

        </div>

    </template>

    <script>
        import updateItemsMixin from '@/mixins/updateItemsFromRouter';
        import * as R from 'ramda'

        export default {
            mixins: [updateItemsMixin],
            name: 'breadcrumbs',
            data: () => ({
              items: [
              {
                name: 'Dashboard',
                disabled: false,
                link: 'breadcrumbsDashboard',
            },
            {
                name: 'Link 1',
                disabled: false,
                link: 'breadcrumbsLink1',
            },
            {
                name: 'Link 2',
                disabled: true,
                link: 'breadcrumbsLink2',
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
                getSubHeader(){
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
