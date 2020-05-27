export default {
    state: {
        subModules: [
            {
                title: 'User Management',
                icon: 'mdi-folder-open',
                children: [
                    {
                        title: 'Unlock Account',
                        name: 'unlock',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Never Lock Accounts',
                        name: 'neverlock',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Users',
                        name: 'users',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Roles',
                        name: 'role',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Modules',
                        name: 'privileges',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Assign Role & Modules',
                        name: 'assign_roles_privileges',
                        icon: 'mdi-file-document-outline'
                    }
                ]
            }
        ]
    }
};
