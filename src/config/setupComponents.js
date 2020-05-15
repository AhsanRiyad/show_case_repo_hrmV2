import toolbar from '@/components/core/toolbar';
import breadcrumbs from '@/components/core/breadcrumbs';
import childPageItems from '@/components/childPageItems';
import baseTable from '@/components/baseTable';
import cAutoComplete from '@/components/core/cAutoComplete';
import cDatePicker from '@/components/core/cDatePicker';
import allFormInputs from '@/components/core/allFormInputs';
import commonDialog from '@/components/core/commonDialog';


export function setupComponents(Vue) {
    Vue.component('toolbar', toolbar);
    Vue.component('breadcrumbs', breadcrumbs);
    Vue.component('childPageItems', childPageItems);
    Vue.component('baseTable', baseTable);
    Vue.component('cAutoComplete', cAutoComplete);
    Vue.component('cDatePicker', cDatePicker);
    Vue.component('allFormInputs', allFormInputs);
    Vue.component('commonDialog', commonDialog);
}
