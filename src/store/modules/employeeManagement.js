export default {
    state: {
        subModules: [
            {
                title: 'Employee Information',
                name: 'employeeInformation',
                icon: 'mdi-folder-open',
                children: [
                    {
                        title: 'New Employee',
                        icon: 'mdi-file-document-outline',
                        name: 'newEmployee'
                    },
                    {
                        title: 'Employees List',
                        icon: 'mdi-file-document-outline',
                        name: 'employee'
                    } /*
                    {
                        title: 'Email Assignment',
                        icon: 'mdi-file-document-outline',
                        name: 'per_emp_email'
                    },*/,
                    {
                        title: 'Bank Account Assignment',
                        icon: 'mdi-file-document-outline',
                        name: 'bankAccountAssignment'
                    }
                ]
            },
            {
                title: 'Business Card Requisition',
                icon: 'mdi-file-document-outline',
                name: 'em_business_card_requisition'
            },
            {
                title: 'Joining Process',
                icon: 'mdi-file-document-outline',
                items: [
                    {
                        title: 'Add Employee',
                        icon: 'mdi-file-document-outline',
                        name: 'new_emp'
                    },
                    {
                        title: 'Employees',
                        icon: 'mdi-file-document-outline',
                        name: 'emp_list'
                    }
                ]
            }
        ]
    }
};
