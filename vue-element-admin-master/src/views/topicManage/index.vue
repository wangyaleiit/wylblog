<template>
	<el-container class="app-container calendar-list-container">
		<el-header>
	    <el-input placeholder="请输入新增栏目名称" style="width: 300px;" v-model="topicName"></el-input>
			<el-button type="primary" size="small" style="margin-left: 10px" @click="addNewTopic">新增栏目</el-button>
		</el-header>
		<el-main class="main">
			<el-table
			  border
				ref="multipleTable"
				:data="topicList"
				style="width: 100%"
				@selection-change="handleSelectionChange" v-loading="loading">
				    <el-table-column
							fixed
							type="index"
							width="50">
				    </el-table-column>
					  <el-table-column
							type="selection"
						  prop="id"
							width="55" align="left">
					  </el-table-column>
						<el-table-column
							label="栏目名称"
							min-width="300px" align="left">
								<template slot-scope="scope">
									<template v-if="scope.row.edit">
										<el-input class="edit-input" size="small" v-model="scope.row.topicName"></el-input>
										<el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
									</template>
									<span v-else>{{ scope.row.topicName }}</span>
								</template>
						</el-table-column>
						<el-table-column
							prop="createDate"
							label="创建时间" align="left">
						</el-table-column>
				  	<el-table-column label="操作" width="300" fixed="right" align="left">
							<template slot-scope="scope">
								<el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="mini" icon="el-icon-circle-check-outline">确定</el-button>
								<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="mini" icon="el-icon-edit">编辑</el-button>
								<el-button type="danger" @click="deleteByKey(scope.row)" size="mini" icon="el-icon-delete">删除</el-button>
							</template>
						</el-table-column>
			</el-table>
			<el-button type="danger" :disabled="this.selItems.length==0" style="margin-top: 10px;width: 110px;" 
			@click="deleteAll" icon="el-icon-minus" v-if="this.topicList.length>0">批量删除
			</el-button>
		</el-main>
	</el-container>
</template>
<script>
// import { MDinput } from '@/components/MDinput'
import { postRequest, putRequest, deleteRequest, getRequest } from '@/api/fetch'

import store from '@/store'
export default {
  data() {
    return {
      topicName: '',
      selItems: [],
      topicList: [],
      loading: false
    }
  },
  // components: { 'MDinput': MDinput },
  created() {
    this.refresh()
  },
  methods: {
    addNewTopic: function() {
      this.loading = true
      postRequest('/topic/save', { topicName: this.topicName }).then(resp => {
        if (resp.data.success) {
          this.refresh()
        }
      })
    },
    deleteByKey: function(row) {
      this.$confirm('确认删除 ' + row.topicName + ' ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(row.id)
      }).catch(() => {
        this.loading = false
      })
    },
    deleteAll: function() {
      this.$confirm('确认删除这 ' + this.selItems.length + ' 条数据?', '提示', {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let ids = ''
        this.selItems.forEach(element => {
          ids += element.id + ','
        })
        this.handleDelete(ids.substring(0, ids.length - 1))
      }).catch(() => {
        this.loading = false
      })
    },
    handleDelete(ids) {
      this.loading = true
      deleteRequest('/topic/del/' + ids).then(resp => {
        if (resp.data.success) {
          this.refresh()
        }
      })
    },
    handleSelectionChange: function(val) {
      this.selItems = val
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.topicName
      putRequest('/topic/update', { topicName: row.topicName, id: row.id, updateUser: store.getters.id }).then(resp => {
        if (resp.data.success) {
          this.refresh()
        }
      })
    },
    refresh() {
      getRequest('/topic/queryAllList').then(resp => {
        if (resp.data.success) {
          this.topicList = resp.data.result.rows
          this.loading = false
        }
      })
    }
  }
}
</script>

<style>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.app-container > .main {
	padding-top: 0px;
}

</style>