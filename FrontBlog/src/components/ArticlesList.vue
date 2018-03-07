<template>
	<div>
	<div class="mdui-list" style="padding: 0px;">
		<router-link  v-for="art in articleList" :key="art.id"  :to="'/detail/'+ art.id">
			<div class="mdui-card mdui-ripple" style="margin-top: 2%;">
			    <div class="mdui-card-primary">
				    <div class="mdui-card-primary-title">{{art.title}}</div>
				    <div class="mdui-card-primary-subtitle" style="margin-top: 10px;">
				    	<font v-for="tag in art.tag.split(',')" :key="tag" style="background-color:#00C853;color: #FFFFFF;font-size: small;padding: 1px 5px;border-radius: 5px;margin-right:10px">{{ tag }}</font>
				    	<i class="mdui-icon material-icons" style="font-size: 16px;">&#xe916;</i>&nbsp;{{art.updateDate}}&emsp;
				    </div>
			    </div>
			    <div class="mdui-card-content mlist"> 
			    	{{art.summary}}
			    </div>
			    <div class="mdui-divider-inset-dark" style="margin:10px 20px"></div>
			    <div class="mdui-card-primary" style="padding: 10px 24px;">
				    <div class="mdui-card-primary-subtitle">
			    		<i class="mdui-icon material-icons" style="font-size: 14px;">&#xe54e;</i>{{art.topicName}}
			    	</div>
			    </div>
			</div>
		</router-link>
	</div>
		<div class="pagination-footer" style="margin-top: 10px;text-align:center">
		  <!-- <el-pagination
		  	background
		  	class="center"
		    layout="prev, pager, next"
				:page-size="pageSize"
		    :total="totalCount" @current-change="currentChange">
		  </el-pagination> -->
			 <Page :total="totalCount" :page-size="pageSize" @on-change="currentChange" v-if="articleList.length > 0"></Page>
	    </div>
	</div>
</template>

<script>
import { getRequest } from '@/apis/fetch'
export default {
	data(){
		return{
			loading:true,
			articleList:[],
			currentPage: 1,
      totalCount: -1,
      pageSize: 10		
		}
	},
  created(){
		this.$Loading.start()
		let topic = this.$route.query.topicId === undefined ? '' : this.$route.query.topicId;
		this.loadBlogs(1,topic)
  },
  methods:{
      //翻页
      currentChange(currentPage){
        this.currentPage = currentPage;
				this.$Loading.start()
        this.loadBlogs(currentPage,'')
			},
			loadBlogs(currentPage,topic){
				getRequest('/front/queryArticle?topic='+ topic + '&pageNumber=' + currentPage).then(resp=>{
						if (resp.data.success) {
							this.articleList = resp.data.result.rows
							this.totalCount = resp.data.result.total
							this.$Loading.finish()
						}
				})
			}
  }
}
</script>

<style>
 .pagination-footer .el-pagination{
    float:right;
    margin-top:8px;
    margin-bottom:8px;
  }
</style>