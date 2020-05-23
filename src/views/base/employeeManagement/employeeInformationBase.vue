<template>
    <span>
        <child-menus :root-path="pageRouteName" />
        <router-view></router-view>
    </span>
</template>

<script>
export default {
    name: 'EmployeeInformationBase',
    data: () => ({
        pageRouteName: 'emaployeeInformation'
    })
};
</script>

<style scoped></style>
