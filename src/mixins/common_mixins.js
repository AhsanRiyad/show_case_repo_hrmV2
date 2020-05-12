export default {
    data: () => ({
        items: []
    }),
    methods: {
        ch(){
            console.log('let chfff');
            return 'this is  a fake label';
        },
        field_rules_prop(field_name){
            if(/(Email|email)/g.test(field_name))
            {

                return ([ 
                    v => !!v || field_name+' is required',
                    v => /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g.test(v) || 'invalide quantity'
                    ]);

            }else if( /(Date|date)/g.test(field_name) )
            {
                return ([ 
                    v => !!v || field_name+' is required',
                    ]);

            }else if( /(not_required)/g.test(field_name) )
            {
                return ([ 
                    v => !!v || true,
                    ]);

            }else{
                return ([ 
                    v => !!v || "Field is Required",
                    ]);
            }

        }
    },
    watch: {},
    mounted() {}
};
