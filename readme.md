------------1.------------
<!--插值语法-->
<!--vue模版-->
<h1>hello, {{ name }}</h1>
el、data

注意双花括号中可以写js表达式
js表达式：一个表达式生成一个值，放在任何一个需要值的地方
    例如 (1).a (2) 1+b (3) demo(1) （4) x===y ? 1 : 0
js语句： if while for...


/**
* 注意:一个vue实例不可能去接管多个容器，如果有多个容器的情况，vue事例永远只接管第一个容器
* 不能多个vue实例同时来接管同一个容器，如果有多个的情况下永远是第一个vue实例来接管该容器
* vue实例与容器直接的对应关系是一对一的
*/

------------2.------------v-bind，:
插值语法。指令语法
    插值语法一般用在标签体的值{{}}
    指令语法:用于解析标签(标签体,标签属性, 绑定事件)上，类似于v-bind
v-bind绑定指令，就把下面的url当成一个js表达式去执行了
v-bind: 还可以简写为 :

------------3.------------v-model:value=/v-model=
单向数据绑定，双向数据绑定
<!--单项数据绑定:-->
    <!--<input type='text' v-bind:value="name"/>-->
    <!--<input type='text' :value="name"/>-->
<!--双向数据绑定:-->>
    <!--<input type='text' v-model:value="name"/>-->
    <!--<input type='text' v-model="name"/>-->
<!-- Vue中有2种数据绑定的方式： -->
    1.单向绑定(v-bind)：数据只能从data流向页面。
    2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
备注：
    1.双向绑定一般都应用在表单类【Value】（能收集用户输入的/有value值的）元素上（如：input、select等，）
    2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。

------------4.------------ vm.$mount('.root)/data:function(){}/data(){}
el与data的两种写法
data与el的2种写法
1.el有2种写法
    (1).new Vue时候配置el属性。
    (2).先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。
2.data有2种写法
    (1).对象式
    (2).函数式
    如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。
3.一个重要的原则：
    由Vue管理的函数(例如data)，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了，而成为窗口的实例！不行。


------------5. MVVM模型------------ 
MVVM模型
    1. M：模型(Model) ：data中的数据
    2. V：视图(View) ：模板代码
    3. VM：视图模型(ViewModel)：Vue实例
观察发现：
    1.data中所有的属性，最后都出现在了vm身上。
    2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。


------------6. 数据代理------------ 
1.Vue中的数据代理：
    通过vm对象来代理data对象中属性的操作（读/写）
2.Vue中数据代理的好处：
    更加方便的操作data中的数据
3.基本原理：
    通过Object.defineProperty()把data对象中所有属性添加到vm上。
    为每一个添加到vm上的属性，都指定一个getter/setter。
    在getter/setter内部去操作（读/写）data中对应的属性。

------------7. 事件处理 ------------v-on:xxx事件、@xxx事件
1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；
2.事件的回调需要配置在methods对象中，最终会在vm上；
3.methods中配置的函数，不要用箭头函数！否则this就不是vm了；
4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；

Vue中的事件修饰符：
1.prevent：阻止默认事件（常用）；@click.prevent："func1()"下填写方式同
2.stop：阻止事件冒泡（常用）；  
3.once：事件只触发一次（常用）；
4.capture：使用事件的捕获模式；
5.self：只有event.target是当前操作的元素时才触发事件；
6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
7.修饰符可以连续写，如@click.prevent："func1()" 加上阻止冒泡可以写成@click.prevent.stop="func1()"/@click.stop.prevent="func1",前者是先阻止默认事件，再阻止冒泡，后者是先阻止冒泡再阻止默认事件。

键盘修饰符：
@keydown.enter="func1"
@keyup.ctrl.y="func1"
@keyup.ctrl="func1"
@keydown.13 = "func1"    //不推荐使用键码
1.Vue中常用的按键别名：
    回车 => enter
    删除 => delete (捕获“删除”和“退格”键)
    退出 => esc
    空格 => space
    换行 => tab (特殊，必须配合keydown去使用)
    上 => up
    下 => down
    左 => left
    右 => right
2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）
3.系统修饰键（用法特殊）：ctrl、alt、shift、meta
            (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
            (2).配合keydown使用：正常触发事件。
4.也可以使用keyCode去指定具体的按键（不推荐）
5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

------------8. 计算属性 ------------computed
每一次vue中data内的值发生改变，都会触发网页模板的重新解析
计算属性：computed：{}
    1.定义：要用的属性不存在，要通过已有属性计算得来。
    2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
    3.get函数什么时候执行？
        (1).初次读取时会执行一次。
        (2).当依赖的数据发生改变时会被再次调用。
    4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
    5.备注：
        1.计算属性最终会出现在vm上，直接读取使用即可。
        2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变set(value){}。
    data：vm属性
    methods：vm方法
    computed:计算属性

------------9. 监视属性 ------------watch
监视属性watch：
    1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
    2.监视的属性必须存在，才能进行监视！！不然不报错也无法监视
    3.监视的两种写法：
        (1).new Vue时传入watch配置
        (2).通过vm.$watch监视
深度监视：deep: true, 
    (1).Vue中的watch默认不监测对象内部值的改变（一层）。多级属性：const类型变量不能改变的那种变化，才能监视到
    (2).配置deep:true可以监测对象内部值改变（多层）。
备注：
    (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以(想让它可以则配置deep:true)！
    (2).使用watch时根据数据的具体结构，决定是否采用深度监视。
computed和watch之间的区别：
    1.computed能完成的功能，watch都可以完成。
    2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。
两个重要的小原则：
    1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
    2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，
    这样this的指向才是vm 或 组件实例对象。


------------10. 绑定样式 ------------ class/style
绑定样式：
1. class样式
    写法 :class="xxx" xxx可以是字符串、对象、数组。
        字符串写法适用于：类名不确定，要动态获取。
        对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
        数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
2. style样式
        :style="{fontSize: xxx}"其中xxx是动态值。
        :style="[a,b]"其中a、b是样式对象。


------------11. 条件渲染 ------------ v-show/v-if/v-else-if/v-else!!!!-template
条件渲染：
1.v-if
    写法：
        (1).v-if="表达式"
        (2).v-else-if="表达式"
        (3).v-else
    适用于：切换频率较低的场景。
    特点：不展示的DOM元素直接被移除。
    注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。
2.v-show
    写法：v-show="表达式"
    适用于：切换频率较高的场景。
    特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。
4.使用template可以在不破坏DOM结构的情况下，控制具有相同条件的元素组合。
template与v-if组合使用；不能与v-show组合使用


------------12. Vue监视数据的原理 ------------Vue.set() / vm.$set() get/set 数组
Vue监视数据的原理：
1. vue会监视data中所有层次的数据。
2. 如何监测对象中的数据？
    通过setter实现监视，且要在new Vue时就传入要监测的数据。
    (1).对象中后追加的属性，Vue默认不做响应式处理
    (2).如需给后添加的属性做响应式，请使用如下API：
        Vue.set(target，propertyName/index，value) [Vue.set(vm._data.student, 'sex', '男')]或  
        vm.$set(target，propertyName/index，value)
3. 如何监测数组中的数据？
    通过包裹数组更新元素的方法实现，本质就是做了两件事：
        (1).调用原生对应的方法对数组进行更新。
        (2).重新解析模板，进而更新页面。
4. 在Vue修改数组中的某个元素一定要用如下方法：
    1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
    2.Vue.set() 或 vm.$set()
特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
注: 数据劫持可以理解成为vue对你写在data的数据会进行加工，让它们都变成响应式的


------------13. 收集表单数据 ------------ radio/checkbox/v-model.lazy/.number/.trim---ajax--json
收集表单数据：
若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
若：<input type="checkbox"/>
    1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
    2.配置input的value属性:
        (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
        (2)v-model的初始值是数组，那么收集的的就是value组成的数组，value值
备注：v-model的三个修饰符：
    lazy：失去焦点再收集数据
    number：输入字符串转为有效的数字
    trim：输入首尾空格过滤


------------14. 过滤器 ------------ filters,bind
从网址[https://www.bootcdn.cn/]借用[开源工具?]dayjs
将[https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.1/dayjs.min.js]文件直接保存到项目js文件夹中
项目引用<script src="../js/dayjs.min.js"></script>
过滤器：

定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
语法：
    1.注册过滤器：Vue.filter(name,callback)此为全局使用的过滤器 或 new Vue{filters:{}} 局部使用
    2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
    备注：
    1.过滤器也可以接收额外参数、多个过滤器也可以串联
    2.并没有改变原本的数据, 是产生新的对应的数据
    3.常在插值语法中使用，样式里也可以

------------15. 内置指令 ------------ v-text，v-html,v-cloak,v-once,v-pre
我们学过的指令：
    v-bind	: 单向绑定解析表达式, 可简写为 :xxx=''
    v-model	: 双向数据绑定，表单元素，简写为v-model=''
    v-for  	: 遍历数组/对象/字符串
    v-on   	: 绑定事件监听, 可简写为@  常用@click=''
    v-if 	: 条件渲染（动态控制节点是否存存在）
    v-else 	: 条件渲染（动态控制节点是否存存在）
    v-show 	: 条件渲染 (动态控制节点是否展示)--元素隐藏
v-text指令：
    1.作用：向其所在的节点中渲染文本内容。 (纯文本渲染)
    2.与插值语法的区别：v-text会替换掉节点中的所有内容，{{xx}}则不会。这里有点不太灵活
v-html指令：
    1.作用：向指定节点中渲染包含html结构的内容。
    2.与插值语法的区别：
        (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
        (2).v-html可以识别html结构。
    3.严重注意：v-html有安全性问题！！！！
        (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击(跨站脚本攻击)。
        (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
v-cloak指令（没有值）：
    1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
    2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。display:none;
v-once指令(没有值)：
    1.v-once所在节点在初次动态渲染后，就视为静态内容了。
    2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
v-pre指令：
    1.跳过其所在节点的编译过程。
    2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。


------------16. 自定义指令 ------------ directives
需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
自定义指令总结：
一、定义语法：
    (1).局部指令：
        new Vue({directives:{指令名:配置对象} })   或  new Vue({directives: {指令名:回调函数}})
    (2).全局指令：
        Vue.directive(指令名,配置对象) 或  Vue.directive(指令名,回调函数)
二、配置对象中常用的3个回调：
    (1).bind：指令与元素成功绑定时调用。
    (2).inserted：指令所在元素被插入页面时调用。
    (3).update：指令所在模板结构被重新解析时调用。
三、备注：
    1.指令定义时不加v-，但使用时要加v-；
    2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。


------------17. 生命周期 ------------ mounted、beforeDestroy
生命周期：
    1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
    2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
    3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
    4.生命周期函数中的this指向是vm 或 组件实例对象。

//template模版字符串只能有一个根结点
// template:'<div><h1>当前的n值是{{ n }}</h1>\n' +
//     '<button @click="add">点我+1</button></div>',
//注意template是不能作为根标签来使用的，不能去骗vue，可以用fragment(vue3新加，模仿react)

生命周期钩子图片.PNG
常用的生命周期钩子：
    1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
        vue完成模版的解析并把初始的真实的dom元素挂载完毕就调用mounted函数，只调用一次
    2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
关于销毁Vue实例
    1.销毁后借助Vue开发者工具看不到任何信息。
    2.销毁后自定义事件会失效，但原生DOM事件依然有效。(click之类的原生事件依然会被调用)
    3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。


------------18. 非单文件组件 ------------ 
Vue中使用组件的三大步骤：
    一、定义组件(创建组件)
    二、注册组件
    三、使用组件(写组件标签)
一、如何定义一个组件？
    使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
    区别如下：
        1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
        2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
    备注：使用template可以配置组件结构。
二、如何注册组件？
    1.局部注册：靠new Vue的时候传入components选项
    2.全局注册：靠Vue.component('组件名',组件)
三、编写组件标签：
            <school></school>

几个注意点：
    1.关于组件名:
        一个单词组成：
                    第一种写法(首字母小写)：school
                    第二种写法(首字母大写)：School
        多个单词组成：
                    第一种写法(kebab-case命名)：my-school
                    第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
        备注：
                (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
                (2).可以使用name配置项指定组件在开发者工具中呈现的名字。
    2.关于组件标签:
        第一种写法：<school></school>
        第二种写法：<school/>
        备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。
    3.一个简写方式：
        const school = Vue.extend(options) 可简写为：const school = options

关于VueComponent：
    1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。
    2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
        即Vue帮我们执行的：new VueComponent(options)。
    3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！注意这一点很重要
    4.关于this指向：
        (1).组件配置中：
            data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
        (2).new Vue(options)配置中：
            data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。
    5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
        Vue的实例对象，以后简称vm。 vm管理着一个又一个vc，vc可以再
    6.因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。
        所以vm与vc属性配置并不是一模一样，尽管vc底层复用了很多vm的逻辑

一个重要的内置关系
    1.一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype
    2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

------------19. 单文件组件 ------------ 
无总结