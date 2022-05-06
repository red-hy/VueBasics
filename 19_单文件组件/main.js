// main.js  入口文件
//创建vm
import App from './App';   //同import App from './App.vue';,可省略文件扩展名
//如果文件
new Vue({
    el: '#root',
    template:`<App></App>`,
    components:{
        App
    }
});