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
        	<span style="color: #409eff;cursor: pointer;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" @click="itemClick(scope.row)">
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
  <el-dialog
  title="预览"
  :visible.sync="dialogVisible"
  width="50%">
  <el-row>
        <el-col :span="24">
      <div>
        <div><h3 style="margin-top: 0px;margin-bottom: 0px">{{article.title}}</h3></div>
        <div style="width: 100%;margin-top: 5px;display: flex;justify-content: flex-end;align-items: center">
          <div style="display: inline; color: #20a0ff;margin-left: 50px;margin-right:20px;font-size: 12px;">
            Wyl
          </div>
          <span style="color: #20a0ff;margin-right:20px;font-size: 12px;">浏览 {{article.pageView==null?0:article.pageView}}</span>
          <span style="color: #20a0ff;margin-right:20px;font-size: 12px;"> {{article.updateDate}}</span>
          <!-- <el-tag type="success" v-for="tag in article.tag.split(',')" :key="tag" size="small"
                  style="margin-left: 8px">{{tag}}
          </el-tag> -->
          <span style="margin:0px 50px 0px 0px"></span>
        </div>
      </div>
    </el-col>
    <el-col>
          <div style="text-align: left" v-html="article.htmlcontent" v-highlight></div>

             <!-- <div style="text-align: left" v-html="compiledMarkdown"></div>  -->
        <!-- <div style="text-align: left">
          <mavon-editor style="height: 100%;width: 100%;" ref=md @imgAdd="imgAdd" code_style="dracula"
                @imgDel="imgDel" v-model="article.mdcontent" subfield="false" default_open=""></mavon-editor>
        </div> -->
    </el-col>
  </el-row>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
  import { putRequest, deleteRequest, getRequest } from '@/api/fetch'
  // import 'highlight.js/styles/dracula.css' // 样式文件
  // import Marked from 'marked'
  // import hljs from 'highlight.js'
  // Marked.setOptions({
  //   renderer: new Marked.Renderer(),
  //   gfm: true,
  //   tables: true,
  //   breaks: false,
  //   pedantic: false,
  //   sanitize: false,
  //   smartLists: true,
  //   smartypants: false,
  //   highlight: function(code, lang) {
  //     if (lang && hljs.getLanguage(lang)) {
  //       return hljs.highlight(lang, code, true).value
  //       // return hljs.highlightAuto(code).value
  //     } else {
  //       return hljs.highlightAuto(code).value
  //     }
  //   }
  // })

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
        tableData: [],
        article: {},
        dialogVisible: false
      }
    },
    // components: { Marked, hljs },
    created() {
      this.loadBlogs(1, 2)
    },
    // computed: {
    //   compiledMarkdown: function() {
    //     return Marked(this.article.mdcontent || '', { sanitize: true })
    //   }
    // },
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
      itemClick(row) {
        this.loading = true
        getRequest('/article/queryByKey/' + row.id).then(resp => {
          if (resp.data.success) {
            this.article = resp.data.result
          }
          this.loading = false
        }, resp => {
          this.loading = false
          this.$message({ type: 'error', message: '页面加载失败!' })
        })
        this.dialogVisible = true
        // this.$router.push({ path: '/documentation/blogDetail', query: { aid: row.id }})
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
blockquote{
  display:block;
  background: #fff;
  padding: 15px 20px 15px 45px;
  margin: 0 0 20px;
  position: relative;
 
  /*字体*/
  font-family: Georgia, serif;
  font-size: 16px;
  line-height: 1.2;
  color: #666;
  text-align: justify;
  
  /*边框 - (选项)*/
  border-left: 15px solid #c76c0c;
  border-right: 2px solid #c76c0c;
 
  /*盒子阴影 - (选项)*/
  -moz-box-shadow: 2px 2px 15px #ccc;
  -webkit-box-shadow: 2px 2px 15px #ccc;
  box-shadow: 2px 2px 15px #ccc;
}
blockquote::before{
  content: "\201C"; /*左双引号的Unicode编码*/
 
  /*字体*/
  font-family: Georgia, serif;
  font-size: 60px;
  font-weight: bold;
  color: #999;
 
  /*位置*/
  position: absolute;
  left: 10px;
  top:5px;
}
blockquote::after{
  content: ""; /*如果要显示右双引号，则写 content: "\201D"; */
}
</style>