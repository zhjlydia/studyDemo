var data = {
    title: '基本例子',
    isAdmin: true,
    list: [
        {
            name: '文艺',
            age: 15,
            description: "dsadasdSadsadasdasdasdaw",
            yes: false
        },
        {
            name: '博客',
            age: 15,
            description: "dsadasdSadsadasdasdasdaw",
            yes: true,
            labels:[
                {
                    name:"看书",
                    type:"like"
                },{
                    name:"博客",
                    type:"like"
                }
            ]
        },
        {
            name: '摄影',
            age: 15,
            description: "dsadasdSadsadasdasdasdaw",
            yes: true,
            labels:[
                {
                    name:"搞摄影",
                    type:"like"
                }
            ]
        },
        {
            name: '电影',
            age: 15,
            description: "dsadasdSadsadasdasdasdaw",
            yes: false
        },
        {
            name: '民谣',
            age: 15,
            description: "dsadasdSadsadasdasdasdaw",
            yes: true,
            labels:[
                {
                    name:"听民谣",
                    type:"like"
                }
            ]
        },
        {
            name: '旅行',
            age: 15,
            description: "dsadasdSadsadasdasdasdaw",
            yes: false
        },
        {
            name: '吉他',
            age: 15,
            description: "dsadasdSadsadasdasdasdaw",
            yes: true,
            labels:[
                {
                    name:"看书",
                    type:"like"
                }
            ]
        }]
};

//试验 子模板嵌套
var html = template('list', data);

document.getElementById('content').innerHTML = html;

var d = document.querySelectorAll("#content ul");
//试验  行级点击事件
d[0].addEventListener('click', function (e) {
    alert(e.target.innerText)
})
//试验 按钮点击事件
var clickme = function (i) {
    alert(i);
    event.stopPropagation();
}