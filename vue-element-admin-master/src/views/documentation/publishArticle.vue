<template>
	<el-container class="app-container calendar-list-container" v-loading="loading">
		<el-header class="header">
			<el-select v-model="article.topic" placeholder="请选择所属栏目" style="width: 300px;">
         <el-option
          v-for="item in topicList"
          :key="item.id"
          :label="item.topicName"
          :value="item.id">
        </el-option>
			</el-select>
			<el-input v-model="article.title" placeholder="请输入标题..." style="width: 400px;margin-left: 10px"></el-input>
			<el-tag
				:key="tag"
				v-for="tag in article.dynamicTags"
				closable
				:disable-transitions="false"
				@close="handleClose(tag)" style="margin-left: 10px">
				{{tag}}
			</el-tag>
			<el-input
				class="input-new-tag"
				v-if="tagInputVisible"
				v-model="tagValue"
				ref="saveTagInput"
				size="small"
				@keyup.enter.native="handleInputConfirm"
				@blur="handleInputConfirm">
			</el-input>
			<el-button v-else class="button-new-tag" type="primary" size="small" @click="showInput">+Tag</el-button>
		</el-header>
		<el-main class="main">
			<div id="editor">
				<mavon-editor style="height: 100%;width: 100%;" ref=md @imgAdd="imgAdd" code_style="dracula"
							@imgDel="imgDel" v-model="article.mdcontent"></mavon-editor>
			</div>
			<div style="display: flex;align-items: center;margin-top: 15px;justify-content: flex-end">
				<el-button @click="cancelEdit" v-if="this.from!=undefined">放弃修改</el-button>
				<template v-if="this.from==undefined || this.from=='draft'">
					<el-button @click="saveBlog(0)">保存到草稿箱</el-button>
					<el-button type="primary" @click="saveBlog(1)">发表文章</el-button>
				</template>
				<template v-else>
					<el-button type="primary" @click="saveBlog(1)">保存修改</el-button>
				</template>
			</div>
   		</el-main>
	</el-container>
</template>

<script>
  import { postRequest, getRequest } from '@/api/fetch'
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import { isNotNullORBlank } from '@/utils/validate'
  export default {
    data() {
      return {
        tagInputVisible: false,
        loading: false,
        tagValue: '',
        from: '',
        topicList: [],
        article: {
          id: '-1',
          dynamicTags: [],
          title: '',
          mdcontent: '',
          topic: ''
        }
      }
    },
    components: {
      mavonEditor
    },
    created() {
      this.from = this.$route.query.from
      this.topicInit()
      if (this.from != null && this.from !== '' && this.from !== undefined) {
        this.id = this.$route.query.id
        this.loading = true
        getRequest('/article/queryByKey/' + this.id).then(resp => {
          this.loading = false
          if (resp.status === 200) {
            this.article = resp.data.result
            if (this.article.tag !== '') {
              this.article.dynamicTags = this.article.tag.split(',')
            }
          } else {
            this.$message({ type: 'error', message: '页面加载失败!' })
          }
        }, resp => {
          this.loading = false
          this.$message({ type: 'error', message: '页面加载失败!' })
        })
      }
    },
    methods: {
      handleClose(tag) {
        this.article.dynamicTags.splice(this.article.dynamicTags.indexOf(tag), 1)
      },
      showInput() {
        this.tagInputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm() {
        const tagValue = this.tagValue
        if (tagValue) {
          this.article.dynamicTags.push(tagValue)
        }
        this.tagInputVisible = false
        this.tagValue = ''
      },
      imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData()
        formdata.append('image', $file)
      },
      imgDel(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData()
        formdata.append('image', $file)
      },
      cancelEdit() {
        this.$router.go(-1)
      },
      topicInit() {
        getRequest('/topic/queryAllList').then(resp => {
          if (resp.data.success) {
            this.topicList = resp.data.result.rows
          }
        })
      },
      saveBlog(state) {
        if (!(isNotNullORBlank(this.article.title, this.article.mdcontent, this.article.topic))) {
          this.$message({ type: 'error', message: '录入信息不完整!' })
          return
        }
        this.loading = true
        postRequest('/article/save', {
          id: this.article.id,
          title: this.article.title,
          topic: this.article.topic,
          dynamicTags: this.article.dynamicTags,
          mdcontent: this.article.mdcontent,
          htmlcontent: this.$refs.md.d_render,
          flag: state
        }).then(resp => {
          this.loading = false
          if (resp.status === 200 && resp.data.success) {
            this.article.id = resp.data.msg
            this.$message({ type: 'success', message: state === 0 ? '保存成功!' : '发布成功!' })
            if (state === 1) {
              this.$router.replace({ path: '/documentation/index' })
            }
          }
        }, resp => {
          this.loading = false
          this.$message({ type: 'error', message: state === 0 ? '保存草稿失败!' : '博客发布失败!' })
        })
      },
      update() {

      }
    }
  }
</script>

<style>
  .app-container > .main > #editor {
    width: 100%;
    height: 550px;
    text-align: left;
  }

  .app-container > .header {
    margin-top: 10px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
  }

  .app-container > .main {
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    padding-top: 0px;
  }

  .app-container > .header > .el-tag + .el-tag {
    margin-left: 10px;
  }

  .app-container > .header > .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .app-container > .header > .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>