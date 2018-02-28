<template>
	<div id="index">
		<header class="mdui-appbar mdui-appbar-fixed" style="background-color: #FFFFFF;">
			<div class="mdui-toolbar" >
				<img class="mdui-card-header-avatar" src="../assets/img/100.jpg" style="margin-right: 0;"/>
				<a href="./" class="mdui-typo-title " style="margin-left: 5px;">程序猿wyl</a>
				<a href="./" style="margin-left: 50px;" class="mst mdui-hidden-xs">知识星球</a>
				<!-- <a href="" class="mst mdui-hidden-xs">推荐书单</a> -->
				<!-- <a href="" class="mst mdui-hidden-xs">开源书籍</a> -->
				<a href="/timeline" class="mst mdui-hidden-xs">归档</a>
				<a href="" class="mst mdui-hidden-xs">关于</a>
				<div class="mdui-toolbar-spacer mdui-hidden-xs"></div>
				<div>
					<div class="mdui-textfield mdui-textfield-expandable mdui-float-right mdui-hidden-xs">
					  <button class="mdui-textfield-icon mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i></button>
					  <input class="mdui-textfield-input" type="text" placeholder="Search"/>
					  <button class="mdui-textfield-close mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">close</i></button>
					</div>
				</div>
			</div>
		</header>
		<div class="mdui-container-fluid">
			<div class="mdui-row" >
	  			<div class="mdui-col-xs-12 mdui-col-md-3 mdui-hidden-xs" align="right" style="margin-top: 2%;">
	  				<div class="mdui-card"  style="width: 70%;">
						  <div class="mdui-card-header">
						  </div>
					    <div class="mdui-card-media" align="center">
						    <img src="../assets/img/123.png" style="width: 150px;height: 150px;">
					  	</div>
						<div class="mdui-card-primary" align="center">
						    <div class="mdui-card-primary-title">攻城狮wyl</div>
						</div>
						<div class="mdui-card-primary" align="center">
						           测试是来表明<sup><strong style="color: red;">bug</strong></sup>的存在
						    <div class="mdui-card-primary-subtitle" style="margin-top: 15px;"><i class="mdui-icon material-icons" style="font-size: 14px;">&#xe0c8;</i>中国-山东-济南-fujisoft</div>
						</div>
					    <div class="mdui-card-content" align="center">
					    	<button style="border-radius: 50px;" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent">关注我</button>
					    </div>
					</div>
	  			</div>
	  			<div class="mdui-col-xs-12 mdui-col-md-6" style="margin-top: 1%;">
					<router-view/> 
					<!-- <articlesList></articlesList> -->
	  			</div>
	  			<div class="mdui-col-xs-12 mdui-col-md-3 mdui-hidden-xs" style="margin-top: 1%;padding-left: 15px;">
	  				<div>
	  					<h3>公告</h3>
	  					<div class="mdui-card" style="margin-top: 2%;background-color: #F2DEDF;">
						    <div class="mdui-card-content" style="line-height: 20px;"> 
								<h5 style="margin: 0;">声明：本网站构建在最低端的阿里云ESC（1G内存）,访问速度你懂的 O(∩_∩)O~ 
									<br/> <span class="mdui-color-red">因采用ES6语法,请使用IE11以上版本访问</span>
								</h5>
								<h5 style="margin: 0;">有鸡没有巴，文明你我他 ^_^</h5>
						    </div>
						</div>
	  				</div>
	  				<div style="margin-top: 30px;">
	  					<h3>专题内容</h3>
	  					<ul class="mdui-list">
							<li v-for="topic in topicList" :key="topic.id" @click="showArt(topic.id)" class="mdui-list-item mdui-ripple">
							<!-- <router-link tag="li" v-for="topic in topicList" :key="topic.id" :to="'/'+ topic.id ">  -->
								<i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;
								<div class="mdui-list-item-content" style="color: #26A69A;">{{topic.topicName}}({{ topic.articleNum }})</div>
							<!-- </router-link> -->
							</li>
						</ul>
	  				</div>
	  				<div style="margin-top: 30px;">
	  					<h3>标签云</h3>
	  				</div>
	  			</div>
			</div>
			<div class="mdui-fab-wrapper" id="fab" @click="showFab">
			    <button class="mdui-fab mdui-ripple mdui-color-pink-accent">
			        <i class="mdui-icon material-icons">add</i>
			        <i class="mdui-icon mdui-fab-opened material-icons">mode_edit</i>
			    </button>
			    <div class="mdui-fab-dial">
			        <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-pink"><i class="mdui-icon material-icons">backup</i></button>
			        <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-red"><i class="mdui-icon material-icons">bookmark</i></button>
			        <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-orange"><i class="mdui-icon material-icons">access_alarms</i></button>
			        <button class="mdui-fab mdui-fab-mini mdui-ripple mdui-color-blue"><i class="mdui-icon material-icons">touch_app</i></button>
			    </div>
			</div>
		</div>
		<div class="mdui-divider-dark" style="margin-top: 50px;"></div>
		<div class="doc-footer-nav mdui-color-black mdui-hidden-xs">
			<div class="mdui-container-fluid" >
			   <div class="mdui-row">
			   		<div class="mdui-col-xs-6 mdui-col-md-3" style="padding-left: 150px;margin-top: 30px;">
			   			<h3 style="padding-left:18px ;">其他平台</h3>
	  					<ul class="mdui-list" style="padding-top: 0px;">
	  						<li class="mdui-list-item" style="min-height: 30px;height: 30px;">
							    <i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;
							    <div class="mdui-list-item-content plt"><a href="https://github.com/" target="_blank">GitHub</a></div>
							</li>
							<li class="mdui-list-item" style="min-height: 30px;height: 30px;">
							    <i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;
							    <div class="mdui-list-item-content plt"><a href="https://gitee.com/" target="_blank">码云</a></div>
							</li>
							<li class="mdui-list-item" style="min-height: 30px;height: 30px;">
							    <i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;
							    <div class="mdui-list-item-content plt"><a href="https://www.jianshu.com/" target="_blank">简书</a></div>
							</li>
							<li class="mdui-list-item" style="min-height: 30px;height: 30px;">
							    <i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;
							    <div class="mdui-list-item-content plt"><a href="https://www.zhihu.com/signup?next=%2F" target="_blank">知乎</a></div>
							</li>
							<li class="mdui-list-item" style="min-height: 30px;height: 30px;">
							    <i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;
							    <div class="mdui-list-item-content plt"><a href="http://www.oschina.net/" target="_blank">开源中国</a></div>
							</li>
						</ul>
			   		</div>
			   		<div class="mdui-col-xs-6 mdui-col-md-3" style="margin-top: 30px;">
			   			<h3 style="padding-left:18px ;">联系方式</h3>
	  					<ul class="mdui-list" style="padding-top: 0px;">
	  						<li class="mdui-list-item" style="min-height: 30px;height: 30px;">
							    <i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;
							    <div class="mdui-list-item-content plt">微信:sd-wangyl</div>
							</li>
							<li class="mdui-list-item" style="min-height: 30px;height: 30px;">
							    <i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;
							    <div class="mdui-list-item-content plt">QQ:764198025</div>
							</li>
							<li class="mdui-list-item" style="min-height: 30px;height: 30px;">
							    <i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;
							    <div class="mdui-list-item-content plt">邮箱:764198025@qq.com</div>
							</li>
						</ul>
			   		</div>
			   		<div class="mdui-col-xs-4 mdui-col-md-3" style="margin-top: 30px;padding-right:100px; ">
			   			<h3 style="padding-left:10px ;">友情链接</h3>
	  						<span class="mdui-chip-title"><i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;<a href="https://springcloud.cc/" target="_blank">Spring Cloud中文网</a></span>
						    <span class="mdui-chip-title"><i class="mdui-icon material-icons" style="font-size: smaller;color: #BBBBBB;">&#xe037;</i>&nbsp;<a href="http://www.spring4all.com/" target="_blank">Spring For All社区</a></span>
			   		</div>
			   		<div class="mdui-col-xs-12 mdui-col-md-3" style="margin-top: 30px;">
			   			<h3 style="padding-left:18px ;">我的公众号</h3>
			   			<img  src="../assets/img/123.png" style="width: 160px;height: 160px;margin-left: 20px;"/>
			   		</div>
			   </div>
			</div>
		</div>
	</div>
</template>
<script>
import { getRequest } from '@/apis/fetch'
// import articlesList from '@/components/ArticlesList'
import mdui from 'mdui'
export default {
  name: 'ArticlesList',
  data(){
	return {
		topicList:[]
	}
  },
//   components:{articlesList},
  created(){
	  getRequest('/front/queryTopic').then(resp=>{
		  if (resp.data.success) {
			  this.topicList = resp.data.result
		  }
	  })
  },
  methods:{
  	showFab:function(){
		var inst = new mdui.Fab('#fab');
		var fab = document.getElementById('fab');
		fab.addEventListener('open.mdui.fab', function () {
		    inst.open();
		})
	},
	showArt(id){
		this.$router.push({path: '/', query: {topicId : id}})
		location.reload()
	}
	  
  }
}
</script>

<style>
	.post-title-link {
	    color: #3f51b5;
	    position: relative;
	    display: inline-block;
	}
	.post-time {
	    line-height: 24px;
	    font-weight: bold;
	}
	.mst{
		font-weight: 300;
	}
	.mlist{
		padding:0 16px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		line-height: 30px;
	}
</style>