---
title: ApiBoot Logging 使用文档
---
# ApiBoot 零侵入、链路式请求日志分析框架

`ApiBoot`提供单应用、微服务应用下的请求日志分析框架`ApiBoot Logging`，特性列表如下所示：
- `链路`：为每一个请求生成一个链路的单条或者多条请求日志信息，精准定位程序出现问题的位置。
- `耗时`：可以分析出每一个请求的耗时，改善服务的性能瓶颈
- `异常信息`：请求遇到异常，提供请求日志的异常堆栈信息记录
- `请求参数`：可以获取`RequestBody`、`PathParam`两种方式的参数
- `响应内容`：可以获取本次请求响应的内容信息。
- `服务信息`：可获取提供服务的ID、IP、Port等信息。
- `异步通知`：请求日志数据采集后通过`Event/Listener`方式异步通知给`RPC`、`MQ`、`REST`、`Local`。
- `数据分析`：阈值警告、异常通知等（短信、邮件等方式，2.1.1.RELEASE版本未实现.）

> `ApiBoot Logging`内部采用`拦截器`、`Filter`组合完成一系列的操作。
> 1. 如果一个请求的`header`信息内包含`traceId（链路ID）`则加入该链路，如果不存在则生成新的链路信息
> 2. 如果一个请求的`header`信息内包含`spanId（跨度ID）`，则使用该`spanId`作为`parent spanId`，对两个请求进行上下级关联。

## 架构设计图
![ApiBoot Logging架构设计图](/img/apiboot-logging.png)

## 1. 添加依赖组件
在`pom.xml`配置文件内添加依赖，如下所示：
```xml
<!--ApiBoot Logging-->
<dependency>
    <groupId>org.minbox.framework</groupId>
    <artifactId>api-boot-starter-logging</artifactId>
</dependency>
```
### 内部封装的组件
`ApiBoot`从`2.1.3.RELEASE`版本开始陆续会将`api-boot-plugins`模块下的组件从`api-boot`项目分离到`minbox-projects`开源组织内作为独立的项目进行升级维护，`ApiBoot Logging`内部通过封装`minbox-projects/minbox-logging`组件的`minbox-logging-client`实现。
> `minbox-logging`源码地址：https://gitee.com/minbox-projects/minbox-logging

> 注意：如果未添加`ApiBoot`版本依赖，请访问[版本依赖](/zh-cn/docs/version-rely.html)查看添加方式。

## 2. 修改采集日志路径前缀
`ApiBoot Logging`默认采集`/**`下的所有请求路径，通过修改`application.yml`配置来变更采集日志路径的前缀：
```yaml
api:
  boot:
    logging:
      # 修改日志路径前缀，可配置多个
      logging-path-prefix:
        - /user/**
        - /order/**
```
在上面配置中，`ApiBoot Logging`只会采集`/user/**`、`/order/**`下所有路径的请求，并将日志上报到`ApiBoot Logging Admin`。

## 3. 排除不采集日志的路径
`ApiBoot Logging`可以指定某些路径的请求日志不进行采集、上报，比如：`/actuator/health`，通过修改`application.yml`配置来排除采集日志的路径列表，如下所示：
```yaml
api:
  boot:
    logging:
      # 排除采集请求日志的路径列表
      ignore-paths:
        - /actuator/health
```
## 4. 修改日志等级

如果想让`ApiBoot Logging`在控制台输出日志信息，需要修改`application.yml`配置文件内的日志等级，如下所示：
```yaml
logging:
  level:
    org.minbox.framework.api.boot.plugin.logging: debug
```
## 5. 美化控制台打印日志信息
为了方便查看控制台打印的请求日志信息，`ApiBoot Logging`支持美化日志`json`信息，配置文件如下所示：
```yaml
api:
  boot:
    logging:
      format-console-log-json: true
```
效果如下所示：
```sh
2019-07-24 12:56:11.231 DEBUG 3833 --- [nio-8080-exec-2] f.a.b.p.l.n.ApiBootLoggingNoticeListener : Request Uri：/index， Logging：
{
	"endTime":1563944171115,
	"httpStatus":200,
	"requestBody":"{\n\t\"name\":\"测试\",\n\t\"email\":\"jnyuqy@gmail.com\"\n}",
	"requestHeaders":{
		"accept":"*/*",
		"accept-encoding":"gzip, deflate",
		"cache-control":"no-cache",
		"connection":"keep-alive",
		"content-length":"52",
		"content-type":"application/json",
		"cookie":"JSESSIONID=8E206A652D76A5DF1775FC8988549DF4",
		"host":"localhost:8080",
		"postman-token":"cc60ceb7-32de-46f1-a7a4-86d694edd073",
		"user-agent":"PostmanRuntime/7.15.2"
	},
	"requestIp":"0:0:0:0:0:0:0:1",
	"requestMethod":"POST",
	"requestUri":"/index",
	"responseBody":"测试",
	"responseHeaders":{},
	"serviceId":"api-boot-sample-logging",
	"serviceIp":"192.168.10.156",
	"servicePort":"8080",
	"spanId":"81c0016e-9bf7-4e86-bcad-98574f0df14c",
	"startTime":1563944171049,
	"timeConsuming":66,
	"traceId":"409b6f2c-f70a-4648-9673-915534bc5aa9"
}
```
## 6. 日志上报方式
`ApiBoot Logging`内部提供了两种上报方式，分别是`just`、`timing`。
### 6.1 just方式
`just`顾名思义是直接方式上报，也是`ApiBoot Logging`内默认的方式，当一个请求日志产生之后会**实时上报**到`Logging Admin`，利弊分析：
  - 优点
    - 数据分析延迟低
    - 提高数据有效性，防止丢失
  - 弊端
    - 增加`Logging Admin`访问压力
### 6.2 timing方式
`timing`方式是定时上报，`ApiBoot Logging`通过配置参数`api.boot.logging.report-away=timing`启用，默认**间隔5秒**执行一次上报，每次上报**10条**请求日志。
#### 6.2.1 修改上报间隔时间
`ApiBoot Logging`默认间隔`5秒`发起一次上报请求到`Logging Admin`，修改配置如下所示：
```yaml
api:
  boot:
    logging:
      # 修改每间隔10秒执行一次上报日志
      report-interval-second: 10
```
#### 6.2.2 修改每次上报条数
`ApiBoot Logging`默认每次发送缓存内的`10条`日志到`Logging Admin`，修改配置如下所示：
```yaml
api:
  boot:
    logging:
      # 修改每次上报2条请求日志
      number-of-request-log: 2
```
## 7. 日志上报到指定Admin
`ApiBoot Logging` 支持上报请求日志到指定`Admin`服务节点，配置如下所示：
```yaml
api:
  boot:
    logging:
      admin:
        # Logging Admin 服务地址
        server-address: 127.0.0.1:9090
```
> 注意：`Logging Admin`服务地址不需要配置`http://`路径前缀。

## 8. 日志上报到服务注册中心Admin
`ApiBoot Logging`支持从`服务注册中心（Eureka Server、Nacos Discovery、Consul...）`中获取指定`serviceID`的服务列表，并且自动通过`LoadBalance`方式上报请求日志。
```yaml
api:
  boot:
    logging:
      discovery:
        # Logging Admin ServiceID
        service-id: sample-logging-admin
```
> `Logging Admin ServiceID`对应`Logging Admin`服务的`spring.application.name`属性配置。

## 9. 日志缓存
`ApiBoot Logging`内部默认通过`memory（内存方式）`进行缓存请求日志，目前版本无法修改`缓存方式`。

## 10. 支持SpringSecurity安全上报日志
`安全性`是日志上报的基础能力之一，`ApiBoot Logging`内部集成`Spring Security`的`Basic`安全认证方式来完成上报鉴权。
### 10.1 指定Admin的安全配置
`ApiBoot Logging`指定`Admin`服务节点的方式跟`Eureka Client ServerUrl`类似，在路径上添加`Logging Admin`配置的`Spring Security`用户名密码，配置如下所示：
```yaml
api:
  boot:
    logging:
      admin:
        # 用户名：user，密码：123456
        server-address: user:123456@127.0.0.1:9090
```
### 10.2 服务注册中心Admin的安全配置
`服务注册中心`方式配置`Logging Admin`的`Spring Security`用户名、密码方式如下所示：
```yaml
api:
  boot:
    logging:
      discovery:
        # Logging Admin ServiceID
        service-id: sample-logging-admin
        # 用户名
        username: user
        # 密码
        password: 123456
```
## 11. 日志通知
`ApiBoot Logging`提供了日志的通知功能，利用该功能可以对每一条请求日志进行输出、存储、分析等，通过实现`LoggingNotice`接口使用通知功能，示例如下所示：
```java
@Component
public class LocalNoticeSample implements LoggingNotice {
    /**
     * order 值越小执行越靠前
     *
     * @return
     */
    @Override
    public int getOrder() {
        return 0;
    }

    /**
     * 请求日志通知执行方法
     * MinBoxLog为一次请求日志对象基本信息
     *
     * @param minBoxLog ApiBoot Log
     */
    @Override
    public void notice(MinBoxLog minBoxLog) {
        System.out.println(minBoxLog);
    }
}
```
`ApiBoot Logging`提供的`LoggingNotice`支持**多个实现类配置**，执行顺序根据`getOrder()`方法的返回值来定义，`getOrder()`方法返回**值越小越靠前执行**。
`MinBoxLog`对象定义如下所示：
```java
public class MinBoxLog {
    /**
     * trace id
     */
    private String traceId;
    /**
     * span id
     */
    private String spanId;
    /**
     * parent span id
     */
    private String parentSpanId;
    /**
     * request uri
     */
    private String requestUri;
    /**
     * request method
     */
    private String requestMethod;
    /**
     * http status code
     */
    private int httpStatus;
    /**
     * request ip
     */
    private String requestIp;
    /**
     * service ip address
     */
    private String serviceIp;
    /**
     * service port
     */
    private String servicePort;
    /**
     * start time
     */
    private Long startTime;
    /**
     * end time
     */
    private Long endTime;
    /**
     * this request time consuming
     */
    private long timeConsuming;
    /**
     * service id
     */
    private String serviceId;
    /**
     * request headers
     */
    private Map<String, String> requestHeaders;
    /**
     * request param
     */
    private String requestParam;
    /**
     * request body
     */
    private String requestBody;
    /**
     * response headers
     */
    private Map<String, String> responseHeaders;
    /**
     * response body
     */
    private String responseBody;
    /**
     * exception stack
     */
    private String exceptionStack;
}
```

## 12. 无缝支持Openfeign
`ApiBoot Logging`支持`Spring Cloud Openfeign`的方式请求，在`SpringCloud`微服务应用中如果你发起一个`Http`请求，而该请求在服务端通过`openfeign`访问其他服务，这时`ApiBoot Logging`会通过`openfeign`的`Interceptor`携带`TraceId`、`SpanId`到下一个服务，完成请求日志的链路信息透传。
