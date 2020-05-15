import { eventBus } from '@/main';

export default {
    data: () => ({

        //table items, autcomplete items
        items: [],

        //baseTable dialog
        myDialogVisible: false,

        //table loader
        tableLoading: false,

        //msg dialog
        dialog: false,

        //table search
        search: "",

        //baseTable slot name variable
        nameOfSlot: 'formBaseTable',

        //for get, post, put , update, delete
        apiRequestData: {
            method: 'get',
            api: '',
            data: {},
        }
    }),
    computed: {
        //get the button name that shows in the baseTable
        getFrontButtonName() {
            //get it from router
            return this.R.toUpper('new ' + this.$route.meta.title);
        }
    },
    methods: {
        viewItem({ item }) {
            //this will make the dialog visible
            this.myDialogVisible = true;
            console.log(item);
        //setTimeout is useful for firing the event in the first time, other than this it will be fired on the second time
            setTimeout(function () {
                eventBus.$emit('updateForm', item);
                // alert("Hello"); 
            },
            50);

            //this bus will be captured in the allFormInput components
        },
        //closes the commonDialog
        myDialogClose() {
            this.myDialogVisible = false;
            this.getData();
        },
        clearInput(items) {
            this.$store.commit("setNewOrOldChecker", 'new');
            items.forEach((n, i, a) => {
                a[i].value = null;
            })

            setTimeout(function () {
                eventBus.$emit('removeTimestamp');
            },
            50);


        },
        //form validation rules, working for all pages
        fieldRulesProp(required, fieldName) {
            if (!required || this.$store.getters.getNewOrOldChecker == 'new') {
                return ([
                    v => !!v || true,
                ]);
            }
            else if (/(Email|email)/g.test(fieldName)) {

                return ([
                    v => !!v || fieldName + ' is required',
                    v => /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g.test(v) || 'Invalid'
                ]);
                
            }
            else if (/(name)/g.test(fieldName)) {

                return ([
                    v => !!v || fieldName + ' is required',
                    // v => /^[a-zA-Z]{1}[a-zA-Z1-9._]{3,15}@[a-zA-Z]{1}[a-zA-Z1-9]{3,15}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2})*$/g.test(v) || 'Invalid'
                ]);
            }
             else if (/(startDate|date|endDate)/g.test(fieldName)) {
                return ([
                    v => !!v || fieldName + ' is required',
                ]);
            } else {
                return ([
                    v => !!v || "Field is Required",
                ]);
            }
        },
        solveInputValidation(){
            console.log('in the solve funcitons');
            this.$store.commit('setNewOrOldChecker', 'updated');
        },
        //base table functions starts
        submit() {
            //this is for input form validation
            this.$store.commit("setNewOrOldChecker", 'updated');

            setTimeout(() => {
                //validate the form
                if (!this.$refs.form.validate()) return;

                //organize the input form, first formate the array using map, then make the a an object using mergeAll
                let formInputValues =
                    this.R.pipe(
                        this.R.map((n) => { return { [n.name]: n.value } }),
                        this.R.mergeAll()
                    )(this.formArray)
                console.log(formInputValues);

                console.log(this.apiBase);
                // debugger;

                //a very common getData function for baseTable, will be call at the created lifeCycle hook
                this.apiRequestData.method = "post";
                this.apiRequestData.api = this.$store.getters.getActivePathName;
                this.apiRequestData.data = formInputValues;

                //axios calling, actions will be dispatched asynchronously
                this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                    console.log(response);
                    //success dialog                
                    this.$awn.success(`Successfully`);
                }).catch(() => {
                    this.tableLoading = false;
                });









            }, 50);



        },
        getData() {
            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.apiRequestData.method = "get";
            this.apiRequestData.api = this.$store.getters.getActivePathName + "/getAll/active";
            this.apiRequestData.data = {};

            //table loader
            this.tableLoading = true;

            //axios calling, actions will be dispatched asynchronously
            this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                this.tableLoading = false;
                //saves the items from the database in the table
                this.items = response;
            }).catch(() => {
                this.tableLoading = false;
            });
        }
        //base table funcitons ends

    },
    watch: {},
    mounted() { }
};
