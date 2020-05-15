// import { eventBus } from '@/main';

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
        },

        timestamp: [
            {
                type: "cTextField",
                label: "Created By",
                name: "createdBy",
                value: "",
                required: false,
                readonly: true,
                clearable: false
            },
            {
                type: "cTextField",
                label: "Created At",
                name: "createdAt",
                value: "",
                required: false,
                readonly: true,
                clearable: false
            },
            {
                type: "cTextField",
                label: "Updated By",
                name: "UpdatedBy",
                value: "",
                required: false,
                readonly: true,
                clearable: false
            },
            {
                type: "cTextField",
                label: "Updated At",
                name: "UpdatedAt",
                value: "",
                required: false,
                readonly: true,
                clearable: false
            }
        ]
    }),
    computed: {
        //get the button name that shows in the baseTable
        getFrontButtonName() {
            //get it from router
            return this.R.toUpper('new ' + this.$route.meta.title);
        }
    },
    methods: {
        //view item
        viewItem({ item }) {
            
            
            this.formArray.forEach( (n, i , k)=>{
                k[i].readonly = true;
                k[i].clearable = false;
            })

            
            //this will make the dialog visible
            this.myDialogVisible = true;
            console.log(item);
            //setTimeout is useful for firing the event in the first time, other than this it will be fired on the second time
            /* setTimeout(function () {
                eventBus.$emit('updateForm', item);
                // alert("Hello"); 
            },
                50); */





            this.addTimeStamp(item);

            //this bus will be captured in the allFormInput components
        },
        //closes the commonDialog
        myDialogClose() {
            this.myDialogVisible = false;
            this.getData();
        },
        clearInput(items) {
            this.removeTimeStamp();
            this.$store.commit("setNewOrOldChecker", 'new');
            items.forEach((n, i, a) => {
                a[i].value = null;
            })
            /* setTimeout(function () {
                eventBus.$emit('removeTimestamp');
            },
            50); */
        },
        removeTimeStamp() {
            this.formArray.some(n => n.name == "createdBy")
                ? this._.times(4, () => { this.formArray.pop() })
                : "";
        },
        addTimeStamp(itemFromBaseTable) {
            console.log("firing event bus");
            //this will ensure that timspamp is not being added multiple times
            !this.formArray.some(n => n.name == "createdBy")
                ? this.timestamp.forEach(n => {
                    this.formArray.push(n);
                })
                : "";
            //formArray.name == key of itemFromBaseTable matches
            this.formArray.forEach((n, i) => {
                if (this.R.has(n.name, itemFromBaseTable)) {
                    this.formArray[i].value = itemFromBaseTable[n.name];
                }
            });


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
        solveInputValidation() {
            console.log('in the solve funcitons');
            this.$store.commit('setNewOrOldChecker', 'updated');
        },
        //base table functions starts
        submit() {
            //this is for input form validation
            new Promise((res) => {
                //remove timestamp if there is any
                this.removeTimeStamp();
                this.$store.commit("setNewOrOldChecker", 'updated');
                res();
            }).then(() => {
                if (!this.$refs.form.validate()) return;
            })

            // setTimeout(() => {
            //validate the form

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









            // }, 50);



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
