---
title: ApiBoot - 组件一览表
---

## ApiBoot 组件一览表

`ApiBoot`目前提供的组件涉及到的业务也比较广泛，从安全框架`Spring Security / OAuth2`的封装到文档生成框架`Swagger2`，从分布式日志框架`Logging`到
MyBatis增强框架`MyBatis Enhance`都对应的提供了一些解决方案。

> 在这其中有对目前主流框架的封装，也有隶属于`minbox-projects`开源组织的自研开源框架。

### 组件列表

| 组件名称                         | 源码地址                                                     | 简介                                                         |
| -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 远程服务端口代理组件             | <a href="https://github.com/minbox-projects/ssh-agent" target="_slef">https://github.com/minbox-projects/ssh-agent</a> | SSH代理跳板方式，支持 “用户名 + 公钥”、“用户名 + 密码方式” 认证登录，建立本地端口与远程服务器端口之间的通信管道。 |
| Mongo设置参数扩展组件            | <a href="https://github.com/minbox-projects/minbox-mongo-client-settings" target="_slef">https://github.com/minbox-projects/minbox-mongo-client-settings</a> | 扩展Spring Boot Data Mongo以提供更多配置参数。               |
| 分布式ID生成组件                 | <a href="https://github.com/minbox-projects/minbox-sequence" target="_slef">https://github.com/minbox-projects/minbox-sequence</a> | 多种ID生成策略。                                             |
| 分布式链路日志组件               | <a href="https://github.com/minbox-projects/minbox-logging" target="_slef">https://github.com/minbox-projects/minbox-logging</a> | 分布式零侵入式、链路式请求日志分析框架。                     |
| Spring Security扩展组件          | <a href="https://github.com/minbox-projects/minbox-security" target="_slef">https://github.com/minbox-projects/minbox-security</a> | 为Spring Security提供一个极简的集成解决方案。                |
| Spring OAuth2扩展组件            | <a href="https://github.com/minbox-projects/minbox-oauth" target="_slef">https://github.com/minbox-projects/minbox-oauth</a> | 提供针对Spring OAuth2的简约集成解决方案。                    |
| Swagger2文档扩展组件             | ApiBoot内部封装。                                            | 提供快速集成Swagger2的解决方案，支持SpringCloud方式聚合展示。 |
| Quartz分布式任务调度框架扩展组件 | ApiBoot内部封装。                                            | 提供快速集成Quartz2.3.x版本的解决方案，支持内存、JDBC两种模式存储调度任务。 |
| 分布式令牌桶限流组件             | <a href="https://github.com/minbox-projects/minbox-ratelimiter" target="_slef">https://github.com/minbox-projects/minbox-ratelimiter</a> | 请求流量限制，支持Redis Lua脚本，Google令牌桶模式。          |
| 多数据源自动切换组件             | <a href="https://github.com/minbox-projects/minbox-datasource-switch" target="_slef">https://github.com/minbox-projects/minbox-datasource-switch</a> | 基于`Spring Aop`实现的自动切换数据源组件。                   |
| MyBatis增强框架组件              | <a href="https://gitee.com/hengboy/mybatis-enhance" target="_slef">https://gitee.com/hengboy/mybatis-enhance</a> | Enhance是对于原生的MyBatis的增强编写，不影响任何原生的使用，使用后完全替代mybatis-core、mybatis-spring以及mybatis-spring-boot-starter，可以使用SpringBoot配置文件的形式进行配置相关的内容，尽可能强大的方便快速的集成MyBatis。 |
| MyBatis自动分页框架组件          | <a href="https://gitee.com/hengboy/mybatis-pageable" target="_slef">https://gitee.com/hengboy/mybatis-pageable</a> | 支持12种数据库的通用Mybatis分页插件工具，支持目前主流数据库使用，使用最少的代码完成分页数据读取。 |
| 阿里云对象存储OSS封装组件        | <a href="https://github.com/minbox-projects/minbox-oss" target="_slef">https://github.com/minbox-projects/minbox-oss</a> | `ApiBoot`添加快速集成`Aliyun`的对象存储服务`Oss`，提供常用的文件操作方法，当然也提供自定义扩展，以致于满足绝大数业务场景，并且通过扩展可以实现上传文件进度条、下载文件进度条、存储空间操作、静态网站托管、访问日志、防盗链、分片上传、追加上传、断点续传等等。 |

