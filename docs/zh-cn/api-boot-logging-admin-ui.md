---
title: ApiBoot Logging Admin 管理界面使用文档
---
# 链路日志管理界面

`ApiBoot Logging Admin`提供了管理界面，方便查看请求链路日志的详细信息，当前版本管理界面仅提供了查看`上报日志的服务列表`、`上报的链路日志列表`等功能，后期会不断地进行完善。

## 添加依赖

`ApiBoot Logging Admin`内部已经包含了`UI`的相关依赖，无需单独添加。
详见[ApiBoot Logging Admin 1.添加依赖](/zh-cn/docs/api-boot-logging-admin.html)
## 打包压缩资源文件
管理界面通过`VUE`来进行编写，执行`vue-cli-service build`来进行打包并压缩资源文件，将压缩后的`页面`、`JS`、`CSS`等资源文件通过`maven plugin`自动复制到`META-INF/api-boot-logging-admin-ui`文件夹内，
最后通过`ResourceHandler`来进行资源映射。

### 内部封装的组件
`ApiBoot`从`2.1.3.RELEASE`版本开始陆续会将`api-boot-plugins`模块下的组件从`api-boot`项目分离到`minbox-projects`开源组织内作为独立的项目进行升级维护，`ApiBoot Logging`内部通过封装`minbox-projects/minbox-logging`组件的`minbox-logging-admin-ui`实现。
> `minbox-logging`源码地址：https://gitee.com/minbox-projects/minbox-logging

## 登录页面

![](/../../img/logging/logging-admin-login.png)

链路日志管理平台内置了登录页面，通过`org.minbox.framework.api.boot.autoconfigure.logging.admin.ApiBootLoggingAdminSecurityAutoConfiguration`配置类自动添加`Spring Security`的相关资源文件过滤、
HttpBasic认证开启、登录跳转页面等参数，
因此我们在访问管理平台的任意路径时，会因为没有登录自动跳转到`/login`页面，在页面输入我们配置的`Spring Security`的用户名、密码来登录平台。

具体使用`Spring Security`详见[ApiBoot Logging Admin 3.安全配置](/zh-cn/docs/api-boot-logging-admin.html)使用文档。

## 服务列表
![](/../../img/logging/logging-admin-service.png)

请求日志的采集服务在第一次上报时，会自动创建一条服务记录，服务的唯一性是根据：`服务ID` + `服务IP` + `服务端Port` 来进行定义。

> 在每次上报日志成功后会修改服务的最后一次上报时间。

## 链路日志列表
![](/../../img/logging/logging-admin-logs.png)

链路日志是我们访问的入口服务生成，比如：`bff-user` -> `user-service`，链路日志产生的位置则是`bff-user`服务，链路日志是接口`请求的入口`也是做出`响应的结束位置`，因此我们可以在页面上查看接口的请求`参数详情`、`头信息`以及`响应的内容`，至于链路日志内的`日志单元`目前界面还未做展示，可以根据`traceId`链路日志编号自行去数据库查询。