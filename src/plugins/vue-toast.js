import Vue from 'vue';
import 'vue-awesome-notifications/dist/styles/style.css';
import VueAWN from 'vue-awesome-notifications';

let options = {};
options.durations = {
    global: 4000
};
options.labels = {
    warning: 'Warning',
    info: 'Status'
};

Vue.use(VueAWN, options);
