---
title: ApiBoot Security 使用文档
---
# ApiBoot 整合 Spring Security组件

`ApiBoot`内部整合了`Spring Security`组件，通过简单的几个配置信息就可以完成`默认方式`的集成使用，通过参数配置(`application.yml、application.properties`)的形式来改变原始的侵入式代码配置，提高开发效率，减少繁琐代码编写,`ApiBoot Security`提供了两种数据存储方式来快速集成`Spring Security`的用户数据读取，分别是`内存方式`、`JDBC方式`，我们下面针对每一种方式提供对应的参数解释以及使用介绍。

## 1. 添加组件依赖

在`pom.xml`配置文件内添加如下：

```xml
<!--ApiBoot Security Oauth-->
<dependency>
	<groupId>org.minbox.framework</groupId>
	<artifactId>api-boot-starter-security-oauth-jwt</artifactId>
</dependency>
```
> 注意：如果未添加`ApiBoot`版本依赖，请访问[版本依赖](/zh-cn/docs/version-rely.html)查看添加方式。


## 2. 内存方式
`ApiBoot Security`默认使用`内存方式(memory)`来读取用户信息。

### 2.1 配置内存用户列表
如果你的接口服务项目并未添加数据库依赖，这时可以使用`ApiBoot Security`的内存方式配置用户列表，通过`api.boot.security.users`配置参数进行设置，如下所示：

```yaml
api:
  boot:
    security:
      # Spring Security 内存方式用户列表示例
      users:
        - username: hengboy
          password: 123456
          roles: good
        - username: apiboot
          password: abc321
          roles: user,order
```

- `username`：配置内存用户用户名
- `password`：配置内存用户密码（这里配置密码为明文），`ApiBoot Security`把用户信息交付给`Spring Security`时，密码会通过`BCryptPasswordEncoder`加密方式进行加密，保证用户密码安全性，该加密方式不可逆。
- `roles`：配置内存用户角色列表，多个采用逗号隔开

## 3. JDBC方式
如果你的接口服务项目需要读取`数据库内`的`用户`进行`安全验证`，`ApiBoot Security`提供了`读取默认用户表方式`、`自定义读取用户方式`两种途径。

### 3.1 使用前的准备工作
- **前提一：需要添加数据库连接依赖**

  如果你所使用的是`MySQL`数据库，可以添加如下依赖：
  ```xml
  <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
  </dependency>
  ```
  其他类型的数据库请自行查找使用。
- **前提二：数据源驱动**
  
  提供数据源的实现方式有很多种，建议使用`SpringBoot`内置的数据源，如下所示：
  ```xml
  <dependency>
      <groupId>com.zaxxer</groupId>
      <artifactId>HikariCP</artifactId>
  </dependency>
  ```
  当然也可以使用阿里巴巴开源的`Druid`数据源依赖，依赖如下所示：
  ```xml
  <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.1.17</version>
  </dependency>
  ```

### 3.2 开启ApiBoot Security JDBC方式
开启`ApiBoot Security`的`JDBC`方式读取用户信息，首先我们需要修改`application.properties`配置文件内的`api.boot.security.away`参数，如下所示：
```properties
api.boot.security.away=jdbc
```
### 3.3 使用内置表结构的用户
`ApiBoot Security`为了方便让开发者更快速的配置读取数据库的用户列表，内部约定了名为**api_boot_user_info**表来存储用户信息，表结构如下所示：

```sql
CREATE TABLE `api_boot_user_info` (
  `UI_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号，主键自增',
  `UI_USER_NAME` varchar(30) DEFAULT NULL COMMENT '用户名',
  `UI_NICK_NAME` varchar(50) DEFAULT NULL COMMENT '用户昵称',
  `UI_PASSWORD` varchar(255) DEFAULT NULL COMMENT '用户密码',
  `UI_EMAIL` varchar(30) DEFAULT NULL COMMENT '用户邮箱地址',
  `UI_AGE` int(11) DEFAULT NULL COMMENT '用户年龄',
  `UI_ADDRESS` varchar(200) DEFAULT NULL COMMENT '用户地址',
  `UI_IS_LOCKED` char(1) DEFAULT 'N' COMMENT '是否锁定',
  `UI_IS_ENABLED` char(1) DEFAULT 'Y' COMMENT '是否启用',
  `UI_STATUS` char(1) DEFAULT 'O' COMMENT 'O：正常，D：已删除',
  `UI_CREATE_TIME` timestamp NULL DEFAULT current_timestamp() COMMENT '用户创建时间',
  PRIMARY KEY (`UI_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='ApiBoot默认的用户信息表';
```

如果你使用默认表结构，需要将上面的建表语句在你的数据库内进行执行创建表。


> 注意：
>
> 1. `api_boot_user_info`表内的密码字段（UI_PASSWORD）的值必须是通过`BCryptPasswordEncoder`加密后的密文字符串。
> 2. 如果用户锁定了（UI_IS_LOCKED字段的值为Y）无法登录系统 (使用默认值即可)
> 3. 如果用户未启用（UI_IS_ENABLED字段的值为N）无法登录系统 (使用默认值即可)

### 3.4 ApiBootStoreDelegate接口

`ApiBoot Security`其实是自己内部默认实现了`ApiBootStoreDelegate`接口，来进行默认读取`api_boot_user_info`表内的数据，具体实现方式可以查看`org.minbox.framework.api.boot.plugin.security.delegate.ApiBootDefaultStoreDelegate`。

`ApiBootStoreDelegate`接口是`ApiBoot Security`提供的读取自定义用户数据的代理方式接口，该接口仅有`loadUserByUsername`一个方法，我们如果自定义读取用户表(非`api_boot_user_info`表)也同样需要使用到它，具体实现方式详见下面文档。

### 3.5 自定义读取用户信息

在实际的应用中，一般都会有自己项目对应的用户信息，如果想让`ApiBoot Security`读取自己用户表来进行认证登录，该怎么去做呢？

#### 3.5.1 禁用默认读取用户方式

由于`ApiBoot Security`内置了默认读取用户的方式，我们首先需要禁用掉它，可以通过`api.boot.security.enable-default-store-delegate=false`参数配置禁用默认方式。

禁用默认读取用户方式后，我们需要来实现`ApiBootStoreDelegate`接口来编写读取自己用户表内的数据。

#### 3.5.2 实现ApiBootStoreDelegate接口

实现`ApiBootStoreDelegate`接口的实现类后需要让`Spring IOC`进行托管，这样才可以生效，简单示例如下所示：

```java
@Component
public class CustomUserStoreDelegate implements ApiBootStoreDelegate {
    /**
     * 返回根据username查询的用户详情对象
     * UserDetails是SpringSecurity提供的用户详情接口
     * 返回的自定义用户对象需实现UserDetails接口
     * @param username 用户名
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
```
## 4. 默认排除路径

`ApiBoot Security`为了方便整合`Swagger`、`Actuator`等，在`ApiBootSecurityProperties`属性配置类内默认添加了的排除权限拦截的路径列表，如下所示：

```java
/**
  * 默认的排除路径列表
  */
public static final String[] DEFAULT_IGNORE_URLS = new String[]{
  "/v2/api-docs",
  "/swagger-ui.html",
  "/swagger-resources/configuration/security",
  "/META-INF/resources/webjars/**",
  "/webjars/**",
  "/swagger-resources",
  "/swagger-resources/configuration/ui",
  "/actuator/**"
};
```

## 5. 自定义排除路径

如果我们需要自定义排除路径可以通过`api.boot.security.ignoreing-urls`参数进行配置，该参数使用数组方式接受值，多个使用逗号隔开或者使用集合形式配置（注意：默认排除的路径不会被替换），如下所示：

## 5.1 逗号隔开形式配置排除路径列表

```yaml
api:
  boot:
    security:
      ignoring-urls: /login,/register,/code/send
```

## 5.2 集合形式配置排除路径列表

```yaml
api:
  boot:
    security:
      ignoring-urls:
        - /login
        - /register
        - /code/send
```


## 6. 禁用HttpBasic

`http basic`默认是被禁用的状态，如需开启，如下所示：

```yaml
api:
  boot:
    security:
      # 开启http basic
      disable-http-basic: false
```

> 具体开启http basic后的注意事情，请查阅SpringSecurity相关文档。

## 7. 禁用CSRF

`csrf`默认是被禁用的状态，如需开启，如下所示：

```yaml
api:
  boot:
    security:
      # 开启csrf
      disable-csrf: false
```

> 具体开启CSRF后的注意事情，请查阅SpringSecurity相关文档。

## 8. 资源保护路径前缀

`ApiBoot Security Oauth`默认保护的路径是`/api/**`，该参数也是采用了数组的形式接收配置值，具体配置如下所示：

### 8.1 逗号隔开形式配置资源保护路径

```yaml
api:
  boot:
    security:
      auth-prefix: /user/**,/order/**
```

### 8.2 集合形式配置资源保护路径

```yaml
api:
  boot:
    security:
      auth-prefix:
        - /user/**
        - /order/**
```