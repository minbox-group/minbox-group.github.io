---
title: ApiBoot Mongo Settings 使用文档
---

## ApiBoot Mongo Settings

> 对`spring-boot-starter-data-mongo`依赖配置参数的扩展，该组件在`v2.2.7`后新增。

我们通过`SpringBoot`整合`mongoDB`时，一般会直接使用`spring-boot-starter-data-mongo`这个依赖，而`SpringBoot`内部所提供的配置参数较少，详情请访问[SpringBoot官方文档](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#data-properties)。

我们比较常见的一个问题：**Mongo连接超时。**

`mongo`并不是没有提供对应的参数配置方式，只是`SpringBoot`并未做出声明式的定义。

## 1. 添加依赖组件

在`pom.xml`配置文件内添加如下：

```xml
<dependency>
  <groupId>org.minbox.framework</groupId>
  <artifactId>api-boot-starter-mongo-client-settings</artifactId>
</dependency>
```

> 注意事项：`api-boot-starter-mongo-client-settings`并不能代替`spring-boot-starter-data-mongo`依赖，只是针对它的配置参数扩展。

## 2. 提供的扩展参数

| 参数名                                                       | 默认值  | 描述                                                     |
| ------------------------------------------------------------ | ------- | -------------------------------------------------------- |
| `api.boot.mongo.settings.socket.connect-timeout-milli-seconds` | 10000   | 设置套接字连接超时。                                     |
| `api.boot.mongo.settings.socket.read-timeout-milli-seconds`  | 10000   | 设置Socket读取超时时间，单位：毫秒                       |
| `api.boot.mongo.settings.socket.receive-buffer-size`         |         | 设置接收缓冲区的大小                                     |
| `api.boot.mongo.settings.socket.send-buffer-size`            |         | 设置发送缓冲区的大小                                     |
| `api.boot.mongo.settings.heartbeat-socket.connect-timeout-milli-seconds` | 10000   | 设置心跳Socket连接超时时间，单位：毫秒                   |
| `api.boot.mongo.settings.heartbeat-socket.read-timeout-milli-seconds` | 10000   | 设置心跳Socket读取超时时间，单位：毫秒                   |
| `api.boot.mongo.settings.heartbeat-socket.receive-buffer-size` |         | 设置心跳Socket接收缓冲区的大小                           |
| `api.boot.mongo.settings.heartbeat-socket.send-buffer-size`  |         | 设置心跳Socket发送缓冲区的大小                           |
| `api.boot.mongo.settings.server.min-heartbeat-frequency-milli-seconds` | 500     | 设置与Server端保持最小心跳频率时间，单位：毫秒           |
| `api.boot.mongo.settings.server.heartbeat-frequency-milli-seconds` | 10000   | 设置群集监视器尝试访问每个服务器的时间频率，单位：毫秒   |
| `api.boot.mongo.settings.connection-pool.min-size`           | 100     | 允许的最大连接数                                         |
| `api.boot.mongo.settings.connection-pool.max.size`           |         | 最小连接数                                               |
| `api.boot.mongo.settings.connection-pool.max-wait-time-milli-seconds` | 120000  | 线程等待连接可用的最长时间，单位：毫秒                   |
| `api.boot.mongo.settings.connection-pool.max-connection-life-time-milli-seconds` |         | 池化连接可以生存的最长时间，单位：毫秒                   |
| `api.boot.mongo.settings.connection-pool.max-connection-idle-time-milli-seconds` |         | 池化连接的最大空闲时间，单位：毫秒                       |
| `api.boot.mongo.settings.connection-pool.maintenance-frequency-milli-seconds` |         | 维护作业运行之间的时间段，单位：毫秒                     |
| `api.boot.mongo.settings.connection-pool.maintenance-initial-delay-milli-seconds` |         | 在连接池上运行第一个维护作业之前要等待的时间，单位：毫秒 |
| `api.boot.mongo.settings.cluster.local-threshold-milli-seconds` | 15      | 设置本地阈值，单位：毫秒                                 |
| `api.boot.mongo.settings.cluster.server-selection-timeout-milli-seconds` | 30000   | 设置选择服务器时要应用的超时时间，单位：毫秒             |
| `api.boot.mongo.settings.cluster.mode`                       |         | 设置此集群的模式                                         |
| `api.boot.mongo.settings.cluster.required-cluster-type`      | UNKNOWN | 设置集群所需的集群类型                                   |
| `api.boot.mongo.settings.cluster.required-replica-set-name`  |         | 设置集群所需的副本集名称                                 |
| `api.boot.mongo.settings.ssl.enabled`                        | false   | 定义是否应启用SSL。                                      |
| `api.boot.mongo.settings.invalid-host-name-allowed`          | false   | 定义是否应允许无效的主机名。                             |



针对连接超时的问题，我们就可以通过`api.boot.mongo.settings.socket`相关配置参数来解决，参考如下所示：

```yaml
# ApiBoot相关配置
api:
  boot:
    mongo:
      settings:
        socket:
          # 读取Server的超时时间，单位：毫秒
          read-timeout-milli-seconds: 60000
          # 连接Server的超时时间，单位：毫秒
          connect-timeout-milli-seconds: 60000
```

