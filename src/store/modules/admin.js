export default {
    state: {
        subModules: [
            {
                title: 'User Management',
                name: 'userManagement',
                icon: 'mdi-folder-open',
                children: [
                    {
                        title: 'Unlock Account',
                        name: 'unlockAccount',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Never Lock Accounts',
                        name: 'neverLockAccount',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Users',
                        name: 'adminUser',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Roles',
                        name: 'adminRole',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Menu',
                        name: 'adminMenu',
                        icon: 'mdi-file-document-outline'
                    },
                    {
                        title: 'Sub Menu',
                        name: 'adminSubMenu',
                        icon: 'mdi-file-document-outline'
                    },
                ]
            }
        ]
    }
};
