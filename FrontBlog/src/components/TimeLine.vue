<template>
    <div class="mdui-m-x-5">
       <Timeline>
           <router-link  v-for="line in timeLine" :key="line.id" :to="'/info/'+ line.id">
            <Timeline-item>
                <p class="time">{{line.date_time}}</p>
                <div class="mdui-card mdui-ripple" style="margin-top: 2%;">
                    <div class="mdui-card-primary" style="padding-top:0px;padding-bottom: 0px;">
                        <div class="mdui-card-primary-title">{{line.title}}</div>
                    </div>
                    <div class="mdui-divider-inset-dark" style="margin:5px 20px"></div>
                    <div class="mdui-card-primary" style="padding: 5px 24px;">
                        <div class="mdui-card-primary-subtitle">
                            <i class="mdui-icon material-icons" style="font-size: 14px;">&#xe54e;</i>{{line.topic_name}}
                        </div>
                    </div>
                </div>
            </Timeline-item>
        </router-link>
    </Timeline>  
        <div class="pagination-footer" style="margin-top: 10px;text-align:center">
            <Page :total="totalCount" :page-size="pageSize" @on-change="currentChange"></Page>
        </div>
    </div>
</template>
<script>
import { getRequest } from '@/apis/fetch'
export default {
	data(){
		return{
			timeLine:[],
			currentPage: 1,
            totalCount: -1,
            pageSize: 10		
        }
	},
   created(){
       	this.$Loading.start()
		this.loadBlogs(1)
   },
  methods:{
      //翻页
      currentChange(currentPage){
          this.$Loading.start()
          this.currentPage = currentPage;
          this.loadBlogs(currentPage)
		},
        loadBlogs(currentPage){
            getRequest('/front/queryTimeLine?pageNumber=' + currentPage).then(resp=>{
                    if (resp.data.success) {
                        console.log(resp.data.result.rows)
                        this.timeLine = resp.data.result.rows
                        this.totalCount = resp.data.result.total
                        this.$Loading.finish()
                    }
            })
        }
  }
}
</script>

<style scoped>
    .time{
        font-size: 16px;
        font-weight: bold;
    }
</style>