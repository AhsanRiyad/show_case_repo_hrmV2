import toolbar from '@/components/core/toolbar';
import breadcrumbs from '@/components/core/breadcrumbs';
import child_page_items from '@/components/child_page_items';
import base_table from '@/components/base_table';
import v_autocomplete from '@/components/core/v_autocomplete';
import v_datepicker from '@/components/core/v_datepicker';
import all_form_inputs from '@/components/core/all_form_inputs';


export function setupComponents(Vue) {
    Vue.component('toolbar', toolbar);
    Vue.component('breadcrumbs', breadcrumbs);
    Vue.component('child_page_items', child_page_items);
    Vue.component('base_table', base_table);
    Vue.component('v_autocomplete', v_autocomplete);
    Vue.component('v_datepicker', v_datepicker);
    Vue.component('all_form_inputs', all_form_inputs);
}
