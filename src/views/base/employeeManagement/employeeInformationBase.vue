<template>
    <span>
        <childPageItems :root-path="pageRouteName" />
        <router-view></router-view>
    </span>
</template>

<script>
export default {
    name: 'EmployeeInformationBase',
    data: () => ({
        pageRouteName: 'employeeInformation'
    })
};
</script>

<style scoped></style>
