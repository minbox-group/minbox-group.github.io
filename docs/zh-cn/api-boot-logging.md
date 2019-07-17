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

> 注意：如果未添加`ApiBoot`版本依赖，请访问[版本依赖](/zh-cn/docs/version-rely.html)查看添加方式。

## 2. 修改日志等级

如果想让`ApiBoot Logging`在控制台输出日志信息，需要修改`application.yml`配置文件内的日志等级，如下所示：
```yaml
logging:
  level:
    org.minbox.framework.api.boot.plugin.logging: debug
```

## 3. 日志通知
`ApiBoot Logging`提供了日志的通知功能，利用该功能可以对每一条请求日志进行输出、存储、分析等，通过实现`ApiBootLogNotice`接口使用通知功能，示例如下所示：
```java
@Component
public class LocalNoticeSample implements ApiBootLogNotice {
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
     * ApiBootLog为一次请求日志对象基本信息
     *
     * @param apiBootLog ApiBoot Log
     */
    @Override
    public void notice(ApiBootLog apiBootLog) {
        System.out.println(apiBootLog);
    }
}
```
`ApiBoot Logging`提供的`ApiBootLogNotice`支持**多个实现类配置**，执行顺序根据`getOrder()`方法的返回值来定义，`getOrder()`方法返回**值越小越靠前执行**。
`ApiBootLog`对象定义如下所示：
```java
public class ApiBootLog {
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

## 4. 无缝支持Openfeign
`ApiBoot Logging`支持`Spring Cloud Openfeign`的方式请求，在`SpringCloud`微服务应用中如果你发起一个`Http`请求，而该请求在服务端通过`openfeign`访问其他服务，这时`ApiBoot Logging`会通过`openfeign`的`Interceptor`携带`TraceId`、`SpanId`到下一个服务，完成请求日志的链路信息透传。