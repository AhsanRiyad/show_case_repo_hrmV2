import { eventBus } from '@/main';
export default {
    data: () => ({
        //table items, autcomplete items
        items: [],

        //
        profilePic: require("@/assets/noImage.jpg"),
        signature: require("@/assets/noImage.jpg"),

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
            item: {},
        },
        //for common dialog props
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
            },
            {
                type: "cTextField",
                label: "Created At",
                name: "createdAt",
                value: "",
                required: false,
                readonly: true,
            },
            {
                type: "cTextField",
                label: "Updated By",
                name: "updatedBy",
                value: "",
                required: false,
                readonly: true,
            },
            {
                type: "cTextField",
                label: "Updated At",
                name: "updatedAt",
                value: "",
                required: false,
                readonly: true,
            }
        ]
    }),
    computed: {
        //get the button name that shows in the baseTable
        getFrontButtonName() {
            //get it from router
            return this.R.toUpper('new ' + this.componentName);
        }
    },
    methods: {
        //format the date as required, here i used moment library
        getDateFormatted(date) {
            if (this.R.isNil(date)) return '';
            return this.moment(date).format("DD-MM-YYYY");
        },
        //end getDateFormatted
        actionIsView(infoOfaId) {
            this.newOrviewOrEditOrCorrection = 'view';

            //add timestamp if in the view mode
            this.addTimeStamp(infoOfaId);
            //make readonly
            this.formArray.forEach((n, i, a) => {
                a[i].readonly = true;

                //this is for file uploading purpose, for employeeManagement->educationInfo
                if (n.name == 'file') {
                    a[i].haveBtn = true;
                    a[i].href = n.href + infoOfaId.fileName;
                }
            })
            // this.fillItemsIntheForm method will be called at add timestamp method
        },
        actionIsEdit(infoOfaId) {
            this.$store.commit("setRequestMethod", "put");
            this.newOrviewOrEditOrCorrection = 'edit';
            //decision making point for file upload option
            //for employee->educationInfo

            //this is applicable only for organization tree as there is not table. that why no props
            //add timestamp if in the view mode
            this.removeTimeStamp(infoOfaId);
            this.fillItemsIntheForm(infoOfaId);
            //make readonly
            this.formArray.forEach((n, i, a) => {
                a[i].readonly = false;
                //this is for file uploading purpose, for employeeManagement->education info 
                if (n.name == 'file') {
                    a[i].haveBtn = true;
                    a[i].rules = [() => true];
                    a[i].href = n.href + infoOfaId.fileName;
                }
            });
        },
        actionIsNew(item) {
            this.newOrviewOrEditOrCorrection = 'new';

            //add timestamp if in the view mode
            !this.R.isNil(item) ? this.removeTimeStamp(item) : '';
            this.myDialogVisible = true;
            this.$store.commit("setRequestMethod", "post");
        },
        //view item
        doActionOnItem(action, { item }) {
            console.log('checking the items');
            console.log(item);

            //for photo upload
            let apiBase = this.apiBase;
            if (this.apiBase == '/em/ei/employee/profilePic/'){
                apiBase = '/em/ei/employee/getActive/';
            }


            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.$store.commit('setRequestMethod', 'get');
            this.apiRequestData.api = apiBase + 'getActive/' + item.id;
            this.apiRequestData.item = {};

            //table loader
            this.tableLoading = true;

            //axios calling, actions will be dispatched asynchronously
            this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                this.tableLoading = false;

                //this variable will send the value to the commonDialog forms so that it can have the data
                //when it needs to submit
                console.log('getting the response');
                console.log(response);

                console.log(this.$props);
                console.log(this.R.has('infoOfaId', this.$props));

                //for preventing the props from mutation
                !this.R.has('infoOfaId', this.$props) ? this.infoOfaId = { ...response } :
                    this.infoOfaIdFromProps = { ...response };

                //this event bus is fired here and will be received in employee.vue, editEmployee, employeeBasic, personalInfo component to update the form
                console.log('firing the event bus');
                setTimeout(() => {
                    //this is for holding the employee id, this is required for employeeManagement , creating familyMemberInfo, nomineeInfo and others.
                    this.apiBase == '/em/ei/employee/' ? this.$store.commit('setEmployeeId', response.id) : '';
                    eventBus.$emit('updateForm', response);
                }, 1000);

                //saves the items from the database in the table
                if (action == 'view') {
                    //decision making point
                    if (this.apiBase == '/em/ei/employee/' && action == 'view') return;
                    this.actionIsView(response);
                }
                else if (action == 'edit') {
                    this.actionIsEdit(response);
                }
                else if (action == 'correction') {
                    this.actionIsEdit(response);
                }
            });
            //this will make the dialog visible
            if (this.apiBase == '/em/ei/employee/' && action == 'view') {
                this.newOrviewOrEditOrCorrection = 'view';
                //this event bus will be received by employeeBasic.vue
                this.complexView = true;
            } else {
                this.myDialogVisible = true;
            }
        },
        //closes the commonDialog
        myDialogClose() {
            this.myDialogVisible = false;
            //here is a decision point for organization tree
            this.$store.getters.getActiveRouteName !== 'organization' ? this.getDataByDecisionMaking() : '';
        },
        clearInput(items) {
            items.forEach((n, i, a) => {
                // this is because checkbox should be null, it should be boolean
                n.type == 'cCheckBox' ? a[i].value = false :
                    //invisible field's value should not be removed, used in organization tree
                    !n.clearData ? a[i].value = n.value :
                        a[i].value = null;
            })
        },
        removeTimeStamp() {
            //time stamp should be removed for creating new item
            this.formArray.some(n => n.name == "createdBy")
                ? this._.times(4, () => { this.formArray.pop() })
                : "";



        },
        fillItemsIntheForm(infoOfaId) {
            console.log('i am called from the employeeBasic from updated');
            //formArray.name == key of infoOfaId matches
            //this is used for view an item's details
            this.formArray.forEach((n, i) => {
                if (this.R.has(n.name, infoOfaId)) {
                    this.formArray[i].value = infoOfaId[n.name];
                }
            });
        },
        addTimeStamp(infoOfaId) {
            console.log("firing event bus");
            //this will ensure that timspamp is not being added multiple times
            //timestamp should be added for edit/view mode
            !this.formArray.some(n => n.name == "createdBy")
                ? this.timestamp.forEach(n => {
                    this.formArray.push(n);
                })
                : "";
            //formArray.name == key of infoOfaId matches
            this.fillItemsIntheForm(infoOfaId);

        },
        //form validation rules, working for all pages
        fieldRulesProp(required, fieldName) {
            /* this vuex variable is used in allFormInputs, commonMixins, baseTable,
            all are connected for validation */
            if (!required) {
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
        //base table functions starts
        submit(newOrviewOrEditOrCorrection) {

            console.log('in the submit method');
            console.log(this.$store.getters.getRequestMethod);

            //this is for input form validation
            new Promise((resolve) => {
                //remove timestamp if there is any
                this.removeTimeStamp();
                //this is only for form validation issues, connected with allFormInputs components
                resolve();
            }).then(() => {
                console.log(this.formArray);

                //validate the form
                if (!this.$refs.form.validate()) return;

                //remove the search or non-takenable fields
                let formArray = [...this.R.reject(n => n.shouldInclude == false)(this.formArray)];
                console.log('should include')
                console.log(formArray);

                //organize the input form, first formate the array using map, then make the a an object using mergeAll
                let formInputValues =
                    this.R.pipe(
                        this.R.map((n) => { return { [n.name]: n.value } }),
                        this.R.mergeAll()
                    )(formArray)
                console.log(formInputValues);
                console.log(this.apiBase);
                //for preventing the props from mutation
                let mergedVal = this.R.has('infoOfaId', this.$props) && this.R.isNil(this.infoOfaIdFromProps) ? this.infoOfaId : this.infoOfaIdFromProps;

                console.log('in the submit function');
                console.log(mergedVal);

                // merge the value that is required for updating a entity
                newOrviewOrEditOrCorrection == 'edit' || newOrviewOrEditOrCorrection == 'correction' ? formInputValues = { ...mergedVal, ...formInputValues } : '';
                console.log('after merging');
                console.log(formInputValues);

                //this is for employeeManagement -> family member , where employeeId is required for posting data
                this.apiBase == "/em/familyMember/" || this.apiBase == "/em/nominee/" || this.apiBase == "/em/ei/bankAccount/" || this.apiBase == "/em/careerDetail/" || this.apiBase == "/em/probation/" || this.apiBase == "/em/eduQualification/" || this.apiBase == "/em/professionalQua/" ? formInputValues = { ...formInputValues, employeeId: this.$store.getters.getEmployeeId } : '';

                //this is for  file upload problem
                if (this.apiBase == "/em/eduQualification/" || this.apiBase == "/em/professionalQua/" || this.apiBase == "/em/ei/employee/profilePic/") {
                    let formData = new FormData();
                    let file = '';
                    try {
                        file = this.R.find(n => n.name == 'file')(this.formArray).value[0];
                    } catch (error) {
                        console.log(error)
                    }
                    formInputValues = { ...formInputValues, file: file };
                    this.R.forEachObjIndexed((v, k) => { formData.append(k, v) }, formInputValues);
                    formInputValues = formData;
                    console.log(formInputValues);
                    // return;
                }

                //a very common getData function for baseTable, will be call at the created lifeCycle hook
                // this.apiRequestData.method = newOrviewOrEditOrCorrection == 'new' ? 'post' : 'put';
                this.apiRequestData.api = this.apiBase;
                this.apiRequestData.item = formInputValues;
                //this will help decide the header if it will be createdBy or updatedBy
                this.apiRequestData.newOrviewOrEditOrCorrection = newOrviewOrEditOrCorrection;
                //axios calling, actions will be dispatched asynchronously
                this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                    //reload the form
                    //exception for organization tree , when there is a child node successfully inserted this, should
                    this.$store.getters.getActiveRouteName == 'organization' ? this.addChild(response) :
                        this.doActionOnItem(newOrviewOrEditOrCorrection, this.apiRequestData);

                    if (this.$store.getters.getActiveRouteName == 'organization') {
                        this.addChild(response);
                    } else if (this.apiBase == "/em/eduQualification/" || this.apiBase == "/em/professionalQua/") {
                        this.apiRequestData.item = { ...response };
                        this.doActionOnItem(newOrviewOrEditOrCorrection, this.apiRequestData);
                    } else {
                        this.doActionOnItem(newOrviewOrEditOrCorrection, this.apiRequestData);
                    }
                    console.log(this.infoTree);
                    console.log(response);
                    //success dialog                
                    this.$awn.success(`Successfully`);
                }).catch(() => {
                    this.$awn.alert(`Connection Error`);
                    this.tableLoading = false;
                });
            })
        },
        getData(extention) {
            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.$store.commit('setRequestMethod', 'get');
            this.apiRequestData.api = this.apiBase + extention;
            this.apiRequestData.item = {};
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
        },
        getAndFillDataByApi(extention) {
            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.$store.commit('setRequestMethod', 'get');
            this.apiRequestData.api = extention;
            this.apiRequestData.item = {};
            //axios calling, actions will be dispatched asynchronously
            this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                //saves the items from the database in the table
                this.infoOfaIdFromProps = this.items = response;
                this.fillItemsIntheForm(this.items);
                //this is form employeeManagement->bankAccount for checking if bankAccount exists or not
            }).catch(() => {

            });
        },
        //base table funcitons ends, this function is not required
        reset() {
            this.$refs.form.reset();
        },
        //this  function is  basically useful for employee management
        nativeSubmit() {
            !this.R.isNil(this.isBankAccountExists) && !this.isBankAccountExists ? (this.$store.commit("setRequestMethod", "post"), this.submit("new")) :
                (this.$store.commit("setRequestMethod", "put"), this.submit("edit"));
        },
        //update subfield for form field
        updateDependentField(idOrValue, dependentFieldName, dependentApi) {
            console.log("in the update subtype");
            console.log(idOrValue);
            let index = this.R.findIndex(this.R.propEq("name", dependentFieldName))(
                this.formArray
            );
            console.log(index);
            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.$store.commit("setRequestMethod", "get");
            this.apiRequestData.api = dependentApi + idOrValue;
            this.apiRequestData.item = {};

            //axios calling, actions will be dispatched asynchronously
            this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                console.log(response);
                this.formArray[index].type = 'cAutoComplete';
                this.formArray[index].items = response;
            });
            // this.formArray[index].items = [{ name: "cc", id: "cc" }];
            // this.formArray[index].type ='cTextField';
        },
        //an exceptional dependent field for adding nominee information for employee, here is two fields for update that's why it is different
        updateDependentFieldForNominee(idOrValue, dependentFieldName, dependentApi) {
            //a very common getData function for baseTable, will be call at the created lifeCycle hook
            this.$store.commit("setRequestMethod", "get");
            this.apiRequestData.api = dependentApi + idOrValue;
            this.apiRequestData.item = {};
            //axios calling, actions will be dispatched asynchronously
            this.$store.dispatch("callApi", this.apiRequestData).then(response => {
                console.log('in the nominee dependent');
                console.log(response);
                let index = this.R.findIndex(this.R.propEq("name", 'familyRelationTypeName'))(
                    this.formArray
                );
                this.formArray[index].value = response.familyRelationTypeName;
                index = this.R.findIndex(this.R.propEq("name", 'dateOfBirth'))(
                    this.formArray
                );
                this.formArray[index].value = response.dateOfBirth;
            });
            // this.formArray[index].items = [{ name: "cc", id: "cc" }];
            // this.formArray[index].type ='cTextField';
        },
        getDataByDecisionMaking() {
            //this is for employeeManagement -> family member , where employeeId is required for posting data
            this.apiBase == "/em/familyMember/" || this.apiBase == "/em/nominee/" || this.apiBase == "/em/careerDetail/" || this.apiBase == "/em/probation/" || this.apiBase == "/em/eduQualification/" || this.apiBase == "/em/professionalQua/" ? this.getData("getAll/active?empId=" + this.$store.getters.getEmployeeId + "&page=0&pageSize=50") : this.getData("getAll/active?page=0&pageSize=50");
        }
    },
    watch: {},
    mounted() { }
};
