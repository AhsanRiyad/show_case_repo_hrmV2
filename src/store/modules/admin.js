export default {
    state: {
        subModules: [
            {
                name: 'User Management',
                icon: 'mdi-folder-open',
                children: [
                    {
                        name: 'Unlock Account',
                        link: 'unlock',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        name: 'Never Lock Accounts',
                        link: 'neverlock',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        name: 'Users',
                        link: 'users',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        name: 'Roles',
                        link: 'role',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        name: 'Modules',
                        link: 'privileges',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        name: 'Assign Role & Modules',
                        link: 'assign_roles_privileges',
                        icon: 'mdi-file-document-outline'
                    }
                ]
            }
        ]
    }
};
