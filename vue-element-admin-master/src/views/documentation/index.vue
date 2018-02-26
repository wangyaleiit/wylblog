<template>
  <el-container class="app-container calendar-list-container">
    <el-main class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
          <!-- <keep-alive> -->
            <tab-pane v-if='activeName==item.key' :type='item.key'></tab-pane>
          <!-- </keep-alive> -->
        </el-tab-pane>
        <el-tab-pane label="博客配置" name="blogcfg">
    	    <blogCfg></blogCfg>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import tabPane from './components/BlogTable'
import blogCfg from './components/BlogCfg'
export default {
  data() {
    return {
      tabMapOptions: [
        { label: '已发表', key: '1' },
        { label: '草稿箱', key: '0' },
        { label: '回收站', key: '2' }
      ],
      activeName: '1'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    tabPane,
    blogCfg
  }
}
</script>

<style>
</style>