<template>
	<div class="mdui-list" style="padding: 0px;" v-loading="loading">
		<div class="mdui-card mdui-ripple" style="margin-top: 2%;margin-bottom:12px;">
		    <div class="mdui-card-primary">
			    <div class="mdui-card-primary-title">{{art.title}}</div>
				<div class="mdui-card-primary-subtitle" style="margin-top: 10px;">
					<font v-for="tag in art.tag.split(',')" :key="tag" style="background-color:#00C853;color: #FFFFFF;font-size: small;padding: 1px 5px;border-radius: 5px;margin-right:10px">{{ tag }}</font>
					<i class="mdui-icon material-icons" style="font-size: 16px;">&#xe916;</i>&nbsp;{{art.updateDate}}&emsp;
				</div>
		    </div>
		    <div class="mdui-card-content mlist"> 
		    	{{art.mdcontent}}
		    </div>
		    <div class="mdui-divider-inset-dark" style="margin:10px 20px"></div>
		    <div class="mdui-card-primary" style="padding: 10px 24px;">
			    <div class="mdui-card-primary-subtitle">
						<i class="mdui-icon material-icons" style="font-size: 14px;">&#xe54e;</i>{{art.topicName}}
		    	</div>
		    </div>
		</div>
		<div class="mdui-float-left" v-if="preArt !== null">
			<button class="mdui-btn  mdui-btn-icon mdui-btn-dense mdui-color-blue-grey mdui-ripple" @click="preHand(preArt.id)">
				<li class="mdui-icon material-icons ">&#xe408;</li>
			</button>&emsp;{{preArt.title}}
		</div>
		<div class="mdui-float-right" v-if="nextArt !== null">
			{{nextArt.title}} &emsp;<button class="mdui-btn  mdui-btn-icon mdui-btn-dense mdui-color-theme mdui-ripple" @click="nextHand(nextArt.id)">
				<i class="mdui-icon material-icons">&#xe409;</i>
			</button>
		</div>
	</div>
</template>

<script>
import { getRequest } from '@/apis/fetch'
export default {
	data(){
		return{
			loading:true,
			art:{},
			preArt:{},
			nextArt:{}
		}
	},
  created(){
	 this.loadData(this.$route.params.id)
  },
  methods:{
     preHand(id){
		this.loadData(id)
	 },
	 nextHand(id){
		this.loadData(id)
	 },
	 loadData(id){
		loading:true 
		getRequest('/front/queryByKey/'+ id).then(resp=>{
			if (resp.data.success) {
				this.art = resp.data.result.art
				console.log('resp.data.result.preArt' + resp.data.result.preArt)
			    this.preArt = resp.data.result.preArt
				this.nextArt = resp.data.result.nextArt
				this.loading = false
			}
		})
	 }
  }
}
</script>

<style>
</style>