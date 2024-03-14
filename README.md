## 约定
1. `/pages`内的每个页面都应该在`/modules`内对应一个同名文件夹，这个文件夹是用来存放页面需要用到的私有组件的。index页面对应的文件夹名为home


# note
## 顶级await
现在打包出来的代码不是esmodule了，所以顶级await语法没法用了，因此得改变api目录结构，以及defineService函数的用法等。
1. "@vue/cli-plugin-babel/preset" 与 "@babel/plugin-syntax-top-level-await"同时使用的话后者会失效
2. 自己把defineService的返回值用async包裹的话，调用时候就得写成 await useBaseApi()，借用store也是如此。这种做法会增加使用者压力，因为目前就BaseApi用到了异步的axiosStatic，其他服务根本没用到。
3. 最终方案是将异步操作以plugin形式放到main.ts中，defineService函数只使用sync的数据。数据使用window传递。并且defineService的第二个参数中的异步函数全部放在内层的闭包函数内执行，这样做的目的是让异步方法延迟到被调用那一刻才执行。因为异步方法所需的数据大多是在main.ts中获取的，而外层函数在main.ts之前执行，内层函数则在main.ts后执行，符合我们期望。自此，项目内不允许出现顶级await，即使是`<script lang="ts" setup>`标签内也不可以，虽然不报错，但是页面不会渲染

## windicss在开发环境下不起作用
windicss在开发环境下不起作用，而打包后的代码是正常的。不过如果修改一次windi.config的话，功能就正常了。 排查过后发现是"unplugin-vue-components/webpack"引发的。

