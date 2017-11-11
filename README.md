## tc-m

> 唐朝项目移动端重构

## 配置
/static/settings.js

### 开发规范
- props: props只允许传递视图数据，涉及业务数据的都走vuex
- state: state尽量扁平化，少嵌套；业务数据拿到后先扁平化处理，只保留需要的数据
- action: 1.每个actions必须return. 2.每个actions的请求必须try catch
- 命名: vuex的actions和mutations命名 “ 模块名 + 方法名”。方法命名 “ 动词 + 名词 ”
- 把有可能经常变动的json,图片等静态资源，丢到static文件夹下，避免过多的编译打包