// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mdui from 'mdui'
import 'mdui/dist/css/mdui.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'


import hljs from 'highlight.js'
import 'highlight.js/styles/dracula.css' // 样式文件
// Vue.use(ElementUI)

Vue.use(iView)
Vue.config.productionTip = false

Vue.directive('highlight', function(el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
