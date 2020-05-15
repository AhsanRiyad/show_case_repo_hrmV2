<template>
    <span>
        <v-container>
          <v-row justify="center">
            <v-col
            cols
            md="auto"
            lg="auto"
            v-for="(n, i) in items"
            :key = "i"
            >
            <v-hover
            v-slot:default="{ hover }"
            open-delay="200"
            >
            <v-card
            :elevation="hover ? 1 : 8"
            height="300"
            width="250"
            ripple
            class="rounded-card ml-5"
            style="border-radius: 20px;"
            :to="{ name: n.name }"
            >
            <v-card-text class="text-left" style="padding-top: 130px;"  >
                <div
                class="font-weight-light grey--text subheading mb-2"
                >
                Click to open
            </div>
            <h3
            class="title font-weight-light black--text mb-2"
            >
            {{ n.title }}
        </h3>
    </v-card-text>
</v-card>
</v-hover>
</v-col>
</v-row>
</v-container>
</span>
</template>
<script>
    import updateItemsMixin from '../mixins/updateItemsFromRouter';
    export default {
        name: 'childPageItems',
        props: {
            rootPath: {
                type: String,
                required: true
            }
        },
        mixins: [updateItemsMixin],
        methods: {
            updateItemsMixins() {
                this.items = this.$route.meta.childPages;
                console.log(this.items);
                console.log(this.$route)
            }
        }
    };
</script>

<style scoped>
    .rounded-card{
        border-radius:30px;
    }

    .v-application .grey--text{
        padding-top: 60px;
    }

</style>


<style lang="scss" scoped>


</style>