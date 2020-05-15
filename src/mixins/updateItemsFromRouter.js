export default {
    data: () => ({
        items: []
    }),
    watch: {
        $route() {
            this.updateItemsMixins();
        }
    },
    mounted() {

        
        this.updateItemsMixins();
    }
};
