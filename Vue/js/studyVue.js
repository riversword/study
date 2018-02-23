var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Fourtreen!'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: '页面加载于' + new Date().toLocaleString()
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            {text: 'Fourtreen'},
            {text: '丰川节能科技'},
            {text: '维度绿色科技'}
        ]
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('');
        }
    }
});

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue!'
    }
});


/*
Vue.component('todo-item', {
    template: '<li>这是一个待办事项</li>'
});
*/


Vue.component('todo-item', {
    //todo-item组件现在接受一个"prop",类似于一个自定义属性，这个属性名为 todo。
    props: ['todo'],
    template: '<li> {{ todo.text }} </li>'
});

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            {id: 0, text: '蔬菜'},
            {id: 1, text: '水果'},
            {id: 2, text: '肉'}
        ]
    }
});

var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },
    computed: {
        //计算属性的方法
        reverseMessage: function(){
            //this指向vm实例
            return this.message.split('').reverse().join('');
        },

        now: function () {
            return Date.now();
        }
    },
    //在组件中
    methods: {
        reverseMessage2: function () {
            return this.message.split('').reverse().join('');
        },
        now2: function () {
            return Date.now();
        }
    }
});

/*
var vm2 = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    watch: {
        firstName: function (val) {
            this.fullName = val + ' ' + this.lastName;
        },
        lastName: function (val) {
            this.fullName = this.firstName + val;
        }
    }
});
*/

var vm2 = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        }
    }
});

var vm3 = new Vue({
    el: '#demo2',
    data: {
        firstName: 'New',
        lastName: 'Jean'
    },
    computed: {
        fullName: {
            //getter
            get: function(){
                return this.firstName + ' ' + this.lastName;
            },
            //setter
            set: function(newValue){
                var names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
});