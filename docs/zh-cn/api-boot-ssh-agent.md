---
title: 远程服务端口代理组件使用文档
---
## SSH-Agent是什么？

如果运维人员只给你通过SSH公钥的方式授权访问，该服务器并不开放我们需要的服务的端口号时，我们该怎么做才能访问到对应的服务呢？

其实上面的问题我们在平时工作中经常遇到，为了服务的数据安全性考虑，一般不会直接将端口号开放，我们只能通过登录服务器后使用命令才可以进行操作，目前市面上也有很多的工具支持SSH公钥的方式连接，比如：DataGrip、Navicat、Redis Desktop Manager、MongoDB Compass等工具。

那如果我们的本地项目需要连接到远程服务的数据库、Redis或者MongoDB时该怎么去做呢？

**SSH-Agent就是来解决这类问题的，主要原理是在本地创建一个端口通过SSH方式登录后与远程服务器的端口号进行绑定，这样我们连接本地的端口号时就可以访问到远程服务器的服务了。**

## 添加依赖

```xml
<dependency>
  <groupId>org.minbox.framework</groupId>
  <artifactId>api-boot-starter-ssh-agent</artifactId>
</dependency>
```
> 注意：如果未添加`ApiBoot`版本依赖，请访问[版本依赖](/zh-cn/docs/version-rely.html)查看添加方式。

## 配置参数
在`application.yml/properties`配置文件内的配置前缀为：`api.boot.ssh-agent`，通过`api.boot.ssh-agent.configs`配置多个代理信息，每个代理配置的参数如下表所示：

| 参数名                | 默认值             | 描述                                                         |
| --------------------- | ------------------ | ------------------------------------------------------------ |
| username              | -                  | 配置连接服务器的用户名                                       |
| password              | -                  | 配置连接服务器的密码（仅限密码认证方式）                     |
| authentication-method | SSH_PRIVATE_KEY    | 认证方式<br />USERNAME_PASSWORD：用户名密码方式<br />SSH_PRIVATE_KEY：SSH秘钥方式 |
| server-ip             | -                  | 配置连接服务器的IP地址                                       |
| ssh-port              | 22                 | 配置连接服务器的SSH端口号                                    |
| ssh-private-key-path  | ~/.ssh/id_rsa      | SSH方式认证秘钥地址                                          |
| ssh-known-hosts-path  | ~/.ssh/known_hosts | 配置已知主机配置文件地址                                     |
| local-port            | -                  | 本地代理的端口号                                             |
| forward-target-port   | -                  | 配置转发到远程服务器的端口号                                 |
| forward-target-ip     | 127.0.0.1          | 登录后的服务器IP地址，如果是局域网，可以配置内网IP地址       |
| addition              | -                  | jsch认证需要的额外附加参数列表                               |

## 认证方式

目前登录服务器的认证方式有两种：

- 用户名 + 密码：直接通过用户名密码的方式登录远程服务器，不需要走SSH
- 用户名 + 秘钥：需要通过SSH连接远程服务器，远程服务器需要配置授权的公钥（默认方式，也建议使用这种，安全系数好高很多）

## 日志输出
在项目启动时如果在`application.yml/properties`文件内配置的服务器连接信息没有问题，控制台会输出绑定转发端口成功的日志，如下所示：
```
2020-12-18 22:07:31.440  INFO 2521 --- [           main] o.m.f.ssh.agent.DefaultAgentConnection   : Port forwarding binding is completed, local port : 3307, forward IP: 127.0.0.1, forward port : 3306
```