# flow-system

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### 测试服切换正式环境请求 
```
yarn run serve1
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```
## Standard

https://cn.vuejs.org/v2/style-guide/

# 调用顺序
  beforeCreate
  created
  beforeMount
  mounted
  beforeUpdate
  updated
  activated
  deactivated
  beforeDestroy
  destroyed

# 钩子函数执行顺序
  beforeCreate() {
    // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
    console.log("layout beforecreate");
  },
  created() {
    // 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
    console.log("layout create");
  },
  beforeMount() {
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    console.log("layout beforeMount");
  },
  mounted() {
    // 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
    console.log("layout mount");
  },
  beforeUpdate() {
    // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
    console.log("layout beforeUpdate");
  },
  updated() {
    // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
    console.log("layout updated");
  },
  destroyed() {
    // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    console.log("layout destroyed");
    alert("1");
  },
  beforeRouteEnter(to, from, next) {
    console.log("layout enter");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("layout leave");
    next();
  }

  
  beforeRouteEnter 方法在生命周期beforeCreate之前便会执行
  子组件的created方法会在父亲

  beforeCreate0
  created0
  beforeMount0
    beforeRouteEnter1
  beforeUpdate0
    beforeCreate1
    created1
    beforeMount1
    mounted1
  mounted0
  updated0

 beforeMount 到 Mount 会发生
 加载子组件完整生命周期created - mounted
 还会发生关闭之前页面destory方法

# 关于环境变量 https://cli.vuejs.org/zh/guide/mode-and-env.html