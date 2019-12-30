##项目结构说明
src 下级结构

ajax ----- 请求及api接口文件

static ----- 全局静态资源文件/images/css/js

components ------ 公共组件文件

data ------ 本地json数据文件

pages ------ 页面文件，内部再按模块划分文件，模块内有子模块在新建 children 文件

router ------ 路由文件

store ------ 公共数据 vuex 文件，子模块再新建 modules 文件

utils ------ 注册全局公共组件js/定义全局方法文件（两个js文件）


类名及方法命名规则

类名语义化
1.使用类名单个使用 结构命名，或使用 - 连接尽量通俗易懂

例如
wrapper //外层容器
box-max //大盒子
box-min //小盒子
user-color //用户主题颜色

方法语义化
1.中文意思翻译成英文命名
2.遵循驼峰命名法，第个二单词首字母大写

例如
getTimeData() //获取时间数据
setTokeData() //设置toke信息
getGoodsList() //获取商品列表
getCartListAction //获取购物车列表


接口文档格式
接口说明：
商品列表接口
/api/goodsItem

请求方式：
POST

传回参数：
userId： //用户id

返回数据：
userImg： // 用户头像
userTxt： // 个性签名
userColor： // 主题颜色
