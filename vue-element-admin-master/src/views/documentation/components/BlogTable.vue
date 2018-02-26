<template>
<div>
  <el-table
    :data="tableData"
    border
    @selection-change="handleSelectionChange" 
    style="width: 100%" v-loading="loading">
    <el-table-column
      fixed
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      type="selection"
      width="50" align="left">
    </el-table-column>
    <el-table-column
      label="标题"  width="350" align="left">
        <template slot-scope="scope">
        	<span style="color: #409eff;cursor: pointer;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
        	{{ scope.row.title}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="topicName"
      min-width="300"
      label="所属分类">
    </el-table-column>
    <el-table-column
      prop="updateDate"
      min-width="130"
      label="最近编辑时间">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      min-width="110px">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" size="mini">编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text" size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  
  <el-button type="danger"  style="margin-top: 10px;width: 110px;" 
        @click="handleDeleteAll" icon="el-icon-minus" :disabled="this.selItems.length==0" v-if="this.tableData.length>0">批量删除
  </el-button>
</div>
</template>

<script>
  import { putRequest, deleteRequest, getRequest } from '@/api/fetch'
  export default {
    props: {
      type: {
        type: String,
        default: '1'
      }
    },
    data() {
      return {
        selItems: [],
        loading: false,
        tableData: []
      }
    },
    created() {
      this.loadBlogs(1, 2)
    },
    methods: {
      handleEdit(row) {
        this.$router.push({ path: '/documentation/publishArticle', query: { from: this.type, id: row.id }})
      },
      handleDelete(row) {
        this.delete(row.id)
      },
      handleSelectionChange(val) {
        this.selItems = val
      },
      handleDeleteAll() {
        let ids = ''
        this.selItems.forEach(element => {
          ids += element.id + ','
        })
        this.delete(ids.substring(0, ids.length - 1))
      },
      delete(ids) {
        this.$confirm(this.type !== '2' ? '将该文件放入回收站，是否继续?' : '永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          if (this.type === '2') {
            deleteRequest('/article/del/' + ids).then(resp => {
              if (resp.data.success) {
                this.loadBlogs(1, 2)
              }
            })
          } else {
            putRequest('/article/toDust/' + ids).then(resp => {
              if (resp.data.success) {
                this.loadBlogs(1, 2)
              }
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      loadBlogs(page, count) {
        var url = '/article/queryByMap' + '?pageNumber=' + page + '&flag=' + this.type
        getRequest(url).then(resp => {
          if (resp.data.success) {
            this.tableData = resp.data.result.rows
            this.loading = false
          }
        }).catch(resp => {
          this.loading = false
          this.$message({ type: 'error', message: '数据加载失败!' })
        })
      }
    }
  }
</script>

<style>
</style>