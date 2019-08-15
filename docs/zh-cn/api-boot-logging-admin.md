---
title: ApiBoot Logging Admin 使用文档
---
# 链路日志Admin管理端点
`ApiBoot Logging Admin`是`ApiBoot Logging`组件的管理端，用于接收`ApiBoot Logging`上报的请求日志信息并且将日志信息`存储到数据库`，针对日志做一些分析、阈值告警通知等。
> 可以根据`TraceID`、`SpanID`针对一条链路的日志分析。

## 部署方式
`ApiBoot Logging Admin`应该独立于`业务服务`部署，因为请求日志的数量会较大，会耗费较大的`内存`以及`CPU计算能力`。

## 1. 添加依赖组件
添加`ApiBoot Logging Admin`依赖到`pom.xml`，如下所示：
```xml
<!--ApiBoot Logging Admin-->
<dependency>
    <groupId>org.minbox.framework</groupId>
    <artifactId>api-boot-starter-logging-admin</artifactId>
</dependency>
```
## 2. 初始化数据库
如果`ApiBoot Logging Admin`所处的项目内存在`DataSource`对象，会自动启用`JDBC`方式将各个`ApiBoot Logging`上报的请求日志保存到数据库指定表内。

### 2.1 ApiBoot Logging Admin 所需建表语句
表结构如下所示：
```sql
 SET NAMES utf8mb4 ;

--
-- Table structure for table `logging_request_logs`
--

CREATE TABLE `logging_request_logs` (
  `lrl_id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键，UUID',
  `lrl_service_detail_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '服务详情编号，关联logging_service_details主键',
  `lrl_trace_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '链路ID',
  `lrl_parent_span_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '上级跨度ID',
  `lrl_span_id` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '跨度ID',
  `lrl_start_time` mediumtext COLLATE utf8mb4_general_ci COMMENT '请求开始时间',
  `lrl_end_time` mediumtext COLLATE utf8mb4_general_ci COMMENT '请求结束时间',
  `lrl_http_status` int(11) DEFAULT NULL COMMENT '请求响应状态码',
  `lrl_request_body` longtext COLLATE utf8mb4_general_ci COMMENT '请求主体内容',
  `lrl_request_headers` text COLLATE utf8mb4_general_ci COMMENT '请求头信息',
  `lrl_request_ip` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '发起请求客户端的IP地址',
  `lrl_request_method` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '请求方式',
  `lrl_request_uri` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '请求路径',
  `lrl_response_body` longtext COLLATE utf8mb4_general_ci COMMENT '响应内容',
  `lrl_response_headers` text COLLATE utf8mb4_general_ci COMMENT '响应头信息',
  `lrl_time_consuming` int(11) DEFAULT NULL COMMENT '请求耗时',
  `lrl_create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '日志保存时间',
  `lrl_request_params` text COLLATE utf8mb4_general_ci,
  `lrl_exception_stack` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`lrl_id`),
  KEY `logging_request_logs_LRL_SERVICE_DETAIL_ID_index` (`lrl_service_detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='请求日志信息表';

--
-- Table structure for table `logging_service_details`
--

CREATE TABLE `logging_service_details` (
  `lsd_id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `lsd_service_id` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '上报服务的ID，对应spring.application.name配置值',
  `lsd_service_ip` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '上报服务的IP地址',
  `lsd_service_port` int(11) DEFAULT NULL COMMENT '上报服务的端口号',
  `lsd_last_report_time` timestamp NULL DEFAULT NULL COMMENT '最后一次上报时间，每次上报更新',
  `lsd_create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '首次上报时创建时间',
  PRIMARY KEY (`lsd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='上报日志的客户端服务详情';

```
> `ApiBoot Logging Admin`提供了固定的表结构，如果你的`ApiBoot Logging Admin`是独立于`业务服务`部署的可以创建一个`单独的数据库`来保存请求日志

### 2.2 添加数据库依赖
添加对应的`数据库驱动`、`数据源`、`ORM`框架以依赖来初始化`DataSource`，下面以`MySQL`驱动示例，如下所示：
```xml
<!--ApiBoot Mybatis Enhance-->
<dependency>
    <groupId>org.minbox.framework</groupId>
    <artifactId>api-boot-starter-mybatis-enhance</artifactId>
</dependency>
<!--MySQL驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
<!--Hikari数据源-->
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
</dependency>
```
### 2.3 配置数据源
在`application.yml`配置文件内添加数据库配置信息，如下所示：
```yaml
spring:
  # 数据源配置
  datasource:
    url: jdbc:mysql://localhost:3306/test
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.zaxxer.hikari.HikariDataSource
    username: root
    password: 123456
```
## 3. 安全配置
由于日志分析的严谨性，不允许匿名上报，因为`ApiBoot Logging Admin`整合`Spring Security`完成`Basic`基本认证，只有`ApiBoot Logging`组件上报日志时，携带`Admin`配置的`Spring Security`用户名、密码才能将日志完成存储。
### 3.1 添加Spring Security依赖
添加`springboot security`依赖到`pom.xml`，如下所示：
```xml
<!--Spring Boot Security-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```
### 3.2 配置用户
`Spring Boot Security`提供了`application.yml`配置文件内配置`内存用户`，配置方式如下所示：
```yaml
spring:
  security:
    user:
      # 用户名
      name: user
      # 密码 
      password: 123456
```
### 3.3 开启Basic认证
由于`Spring Boot Security`废除了`application.yml`方式的`httpBasic`开启，我们可以通过继承`WebSecurityConfigurerAdapter`类的方式完成对`HttpSecurity`的安全配置，
如下所示：
```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    /**
     * 配置安全信息
     * - 开启所有请求需要验证并且使用http basic进行认证
     *
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf()
                .disable()
                .authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .httpBasic();
    }
}
```
## 4. 注册到SpringCloud服务注册中心
`ApiBoot Logging Admin`支持标准的`Spring Cloud Discovery`的服务注册中心配置，比如：`Eureka`、`Consul`、`Nacos`等。
### 4.1 添加依赖
添加依赖到`pom.xml`，下面是使用`Eureka`的依赖方式：
```xml
<!--Erueka Client-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```
### 4.2 配置注册中心地址
在`application.yml`配置文件内添加`Eureka Server`的地址信息，如下所示：
```yaml
# Eureka Config
eureka:
  client:
    service-url:
      defaultZone: http://service:nodev2@127.0.0.1:9090/eureka/
  instance:
    # IP首选方式注册服务
    prefer-ip-address: true
```
> 注意：这里一定开启`IP首选`的方式进行服务注册，因为`SpringCloud Eureka Client`默认使用`主机名`的方式进行注册服务，而`ApiBoot Logging`在服务发现时如果通过主机名可能无法访问到`ApiBoot Logging Admin`服务的上报请求日志端点。
## 5. 链路分析
在一条链路下`TraceID`是相同的，而链路内的每一个请求单元都会对应生成一个`SpanID`，如果存在多级嵌套服务访问，可以根据`Parent SpanID`进行分析。

## 6. 控制台打印上报日志
```yaml
api:
  boot:
    logging:
      admin:
        # 显示上报日志
        show-console-report-log: true
```
## 7. 美化控制台打印上报日志
```yaml
api:
  boot:
    logging:
      admin:
        # 显示上报日志
        show-console-report-log: true
        # 格式化上报日志
        format-console-log-json: true
```
## 8. 控制台打印的日志
控制台打印日志如下所示：
```sh
2019-07-25 10:38:55.835  INFO 4196 --- [nio-9090-exec-1] .a.b.p.l.a.l.ReportLogJsonFormatListener : Receiving Service: 【api-boot-sample-logging -> 192.168.1.33】, Request Log Report，Logging Content：[
	{
		"endTime":1564022335085,
		"httpStatus":200,
		"requestBody":"{\n\t\"name\":\"测试\",\n\t\"email\":\"jnyuqy@gmail.com\"\n}",
		"requestHeaders":{
			"content-length":"52",
			"cookie":"JSESSIONID=8E206A652D76A5DF1775FC8988549DF4",
			"postman-token":"2e0e9c0d-a2d2-46fb-ab60-85abeb6df92d",
			"host":"localhost:8080",
			"content-type":"application/json",
			"connection":"keep-alive",
			"cache-control":"no-cache",
			"accept-encoding":"gzip, deflate",
			"user-agent":"PostmanRuntime/7.15.2",
			"accept":"*/*"
		},
		"requestIp":"0:0:0:0:0:0:0:1",
		"requestMethod":"POST",
		"requestUri":"/index",
		"responseBody":"测试",
		"responseHeaders":{},
		"serviceId":"api-boot-sample-logging",
		"serviceIp":"192.168.1.33",
		"servicePort":"8080",
		"spanId":"263c8f38-855d-40c4-9ddd-502fb9401eed",
		"startTime":1564022334986,
		"timeConsuming":99,
		"traceId":"791d84c0-c0e2-4141-a164-75d219fa4271"
	}
]
2019-07-25 10:38:55.836 DEBUG 4196 --- [nio-9090-exec-1] m.f.a.b.p.l.a.l.ReportLogStorageListener : Starting Storage Report Request Logs.
2019-07-25 10:38:55.836  INFO 4196 --- [nio-9090-exec-1] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2019-07-25 10:38:56.282  INFO 4196 --- [nio-9090-exec-1] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2019-07-25 10:38:56.401 DEBUG 4196 --- [nio-9090-exec-1] m.f.a.b.p.l.a.l.ReportLogStorageListener : Storage Report Request Logs Complete.
```