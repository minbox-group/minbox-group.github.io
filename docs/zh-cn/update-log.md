---
title: ApiBoot更新日志
---
# ApiBoot 版本升级日志

### 2.1.1.RELEASE (2019-7-16日发布)
- ApiBoot Logging 初版发布
   - 零侵入代码设计
   - 支持链路日志输出
   - 支持SpringCloud Openfeign透传日志链路信息
   - 支持请求完成后多个Order Notice通知请求日志信息
   - 支持请求异常堆栈信息保存
   - 支持读取RequestBody内容
   - 支持读取ResponseBody内容
   - 支持请求日志关联具体服务Id
   - 支持自定义存储日志
- ApiBoot OAuth
   - 支持Redis存储Token
   - 支持内存方式、Redis方式配置多客户端
   - 支持内存方式、Redis方式配置token有效期
- ApiBoot Mybatis Enhance
   - 丰富示例
   - 官网文档更新

### 2.1.0.RELEASE（2019-6-25日发布）
- ApiBoot Mail
  - 初版发布(集成阿里云邮件服务)
- ApiBoot Mybatis Pageable
  - 版本升级
- ApiBoot Oauth
  - 修复JDBC方式序列化Token到数据库异常问题
  - 调整JDBC方式获取Token示例
- ApiBoot Mybatis Enhance Codegen
  - 修复生成类乱码问题
- 依赖升级
  - SpringBoot -> 2.1.6.RELEASE
  - druid -> 1.1.17
  - druid-spring-boot-starter -> 1.1.17
  - fastjson -> 1.2.58
  - quartz -> 2.3.1
  - spring-tx -> 5.1.8.RELEASE

### 2.0.9.RELEASE (2019-6-11日发布)
- ApiBoot Mybatis Enhance Codegen
  - 生成实体默认实现序列化接口
  - 可指定多表生成实体
  - 支持自定义模板生成类文件
- ApiBoot Security Oauth
  - 支持自定义GrantType授权类型(短信登录、微信登录等)

### 2.0.8.RELEASE

- ApiBoot Security Oauth (自动化安全框架)
  1. 排除`/webjars/**`路径
  2. 修复`ApiBootResourceServerAutoConfiguration`自动化配置类，当存在`SecurityUser`类时进行配置实例
- ApiBoot RateLimiter (分布式限流)
  1. 底层更换为AOP方式实现，防止与项目拦截器冲突
  2. 支持流量溢出后自定义响应内容
  3. 修复部分已知Bug
- ApiBoot Mybatis Enhance Codegen (代码生成插件)
  1. 支持生成实体时排除表名前缀
  2. 支持生成字段时排除列名前缀(排除列名第一个下划线之前的内容)
  3. 分离数据实体、动态实体生成的文件夹
  4. 支持生成数据实体时读取列默认值为实体字段默认值
  5. 添加`java.sql.TimeStamp`类型字段且默认值为`CURRENT_TIMESTAMP`的insertable属性
- ApiBoot Mybatis Enhance (数据持久化框架)
  1. 支持插入数据时返回自增主键的值到参数实体主键字段

### 2.0.7.RELEASE

- ApiBoot RateLimiter
  - 添加Redis Lua脚本分布式限流方式
  - 修复拦截ApiBoot Swagger静态资源问题
  - 添加全局限流配置参数
  - 添加开启全局限流配置
  - 使用Nacos做分布式限流配置中心，可实时更新限流配置，完成流量突增应对
- ApiBoot Mybatis Enhance Codegen
  - 初版发布，专为ApiBoot Mybatis Enhance编写

### 2.0.6.RELEASE

- ApiBoot Code Builder
  - Code Builder 代码自动生成Maven插件初版发布
  - 可根据freemarker模板动态生成实体类、Mapper、Service等
- ApiBoot Request RateLimiter
  - 支持配置QPS单服务实例限流
- ApiBoot Mybatis Enhance
  - Mybatis增强ORM初版集成
  - 内置CRUD方法
  - 支持动态方法查询
  - 支持动态方法更新
  - 支持动态方法删除
  - 可自定义Mapper.xml进行处理复杂业务
- ApiBoot Mybatis Pageable
  - Mybatis 自动化分页插件出版本集成
  - 支持从实体类内自动映射获取分页参数

### 2.0.5.RELEASE

- 推送服务集成
  - 极光推送组件(全平台、安卓平台、IOS线上、线下平台)
- ApiBoot Resource Load
  - 添加资源Redis缓存支持
  - 添加资源内存缓存支持
  - 资源自动添加
  - 资源自动更新
  - 资源自动删除
  - 读取资源、业务字段时添加支持表达式方式

### 2.0.4.RELEASE

- SpringBoot 版本升级
  - 升级SpringBoot版本为2.1.4.RELEASE
- ApiBoot Security Oauth
  - 添加自定义resourceId属性配置
  - 修改Oauth2资源拦截路径为数组，可配置多个使用","隔开
  - 添加自定义开启http basic属性配置
  - 添加自定义开启csrf属性配置
  - 添加AssessDenied异常处理支持
  - 添加AuthenticationEntryPoint认证端点异常处理支持
- ApiBoot Http converter
  - 提供Decimal精度、小数位数处理ValueFilter
  - 提供隐藏字符串ValueFilter
  - 修复#3
- ApiBoot Alibaba OSS
  - 上传、下载进度条方法提供
  - 分片上传方法提供
- ApiBoot Resource Load
  - 初版发布
  - 提供资源与业务完全分离

### 2.0.3.RELEASE

- ApiBoot Security Oauth
  - 修改Spring Security内存/Jdbc整合方式
  - 修改Oauth2内存/Jdbc整合方式
- ApiBoot DataSource Switch
  - 初版发布

### 2.0.2.RELEASE

- ApiBoot Quartz
  - 初版发布

### 2.0.1.RELEASE

- ApiBoot Security Oauth
  - 初版发布
  - 整合Jwt格式化令牌
  - 内存方式集成
  - jdbc方式集成
- ApiBoot Swagger
  - 初版发布
- ApiBoot Http Converter
  - 初版发布
- ApiBoot Alibaba OSS
  - 初版发布
- ApiBoot Alibaba SMS
  - 初版发布