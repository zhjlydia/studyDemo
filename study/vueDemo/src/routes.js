import channelIndex from './pages/channel/index/app.js'
import channelList from './pages/channel/channelList/app.js'
import channelClass from './pages/channel/channelClass/app.js'
// 配置路由
export default [
    {
        path: '/channel',
        component: channelIndex,
        children: [
            { path: '/', component: channelList },
            { path: 'channelClass', component: channelClass },
            { path: 'channelList', component: channelList }
        ],
    }
]