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

        //
        newOrviewOrEditOrCorrection: '',


        //for all form input
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
        actionIsView(item) {
            this.newOrviewOrEditOrCorrection = 'view';
            //add timestamp if in the view mode
            this.addTimeStamp(item);
            //make readonly
            this.formArray.forEach((n, i, k) => {
                k[i].readonly = true;
                k[i].clearable = false;
            })
        },
        actionIsEdit(item) {
            this.newOrviewOrEditOrCorrection = 'edit';
            //add timestamp if in the view mode
            this.removeTimeStamp(item);
            //make readonly
            this.formArray.forEach((n, i, k) => {
                k[i].readonly = false;
                k[i].clearable = true;
            })
        },
        actionIsNew(item) {
            this.newOrviewOrEditOrCorrection = 'new';
            //add timestamp if in the view mode
            this.removeTimeStamp(item);
            //clearInput
            this.clearInput(item);
            //make readonly
            this.formArray.forEach((n, i, k) => {
                k[i].readonly = false;
                k[i].clearable = true;
            })
        },
        //view item
        doActionOnItem(action, { item }) {
            console.log('checking the items');
            console.log(item);

            if (action == 'view') {
                this.actionIsView(item);
            } else if (action == 'edit') {
                this.actionIsEdit(item);
            }

            //this will make the dialog visible
            this.myDialogVisible = true;

        },
        //closes the commonDialog
        myDialogClose() {
            this.myDialogVisible = false;
            this.getData("/getAll/active");
        },
        clearInput(items) {
            this.$store.commit("setNewOrOldChecker", 'new');
            items.forEach((n, i, a) => {
                a[i].value = null;
            })
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
        submit(newOrviewOrEditOrCorrection) {
            //this is for input form validation
            new Promise((res) => {
                //remove timestamp if there is any
                this.removeTimeStamp();
                //this is only for form validation issues, connected with allFormInputs components
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
            this.apiRequestData.method = newOrviewOrEditOrCorrection == 'new' ? 'post' : 'put';
            this.apiRequestData.api = this.$store.getters.getActivePathName;
            this.apiRequestData.data = formInputValues;
            //this will help decide the header if it will be createdBy or updatedBy
            this.apiRequestData.newOrviewOrEditOrCorrection = newOrviewOrEditOrCorrection;

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
        getData(extention) {
            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.apiRequestData.method = "get";
            this.apiRequestData.api = this.$store.getters.getActivePathName + extention;
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
