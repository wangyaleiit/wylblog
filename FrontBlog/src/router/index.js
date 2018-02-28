import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ArticlesList from '@/components/ArticlesList'
import ArticlesInfo from '@/components/ArticlesInfo'
import TimeLine from '@/components/TimeLine'
import NotFoundPage from '@/errorPage/404'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		component: Index,
		children: [
			{
				path: '/',
				component: ArticlesList
			},
			// {
			// 	path: '/:topicId',
			// 	component: ArticlesList
			// },
			{
				path: '/info/:id',
				component: ArticlesInfo
			},{ path: '/timeline',component:TimeLine }
		]
	},

	{ path: '/404',component:NotFoundPage, hidden: true },
	{ path: '*', redirect: '/404', hidden: true }
	]
})