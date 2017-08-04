import Index from './pages/Index/app.js'
import consultIndex from './pages/consult/app.js'
import channelIndex from './pages/channel/channelIndex/app.js'
import channelList from './pages/channel/channelList/app.js'
import channelClass from './pages/channel/channelClass/app.js'
import consultList from './pages/consult/consultList/app.js'
// 配置路由
export default [{
    path: '/',
    component: Index,
    children: [{
        path: '/channel',
        component: channelIndex,
        children: [{
            path: '/channel/channelClass',
            component: channelClass
        }, {
            path: '/channel/channelList',
            component: channelList
        }]
    }, {
        path: '/consult',
        component: consultIndex,
        children: [{
            path: "/consult/consultList/:viewType", //全部咨询、未跟进
            component:consultList
        }]
    }]
}]