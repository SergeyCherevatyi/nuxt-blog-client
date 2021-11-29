import Vue from 'vue'
import VueMarkdown from "vue-markdown/src/VueMarkdown";
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

import DateFilter from '../common/date.filter'

import VueConfirmDialog from 'vue-confirm-dialog'
import VModal from 'vue-js-modal'

Vue.component('v-modal', VModal)

Vue.use(VModal, {
  dynamicDefaults: {
    draggable: true,
    height: 'auto'
  }
})


Vue.use(VueToast, {
  duration: 5000,
  position: 'top-right'
})

Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.use(VueConfirmDialog)

Vue.component('vue-mark', VueMarkdown)
Vue.use(VueMarkdown)


Vue.filter('date', DateFilter)



