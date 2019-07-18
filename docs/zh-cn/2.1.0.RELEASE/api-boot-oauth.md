---
title: ApiBoot OAuth 使用文档
---
# ApiBoot 整合 OAuth2组件

`ApiBoot`整合`OAuth2`来完成资源的保护，通过在配置文件的具体配置来完成自动化集成，降低入门门槛。

`ApiBoot OAuth`同样是提供了两种方式：`内存方式`、`JDBC方式`来进行存储`Token`、`客户端`等信息，后期规划集成`Redis`进行存储`AccessToken`令牌信息，`ApiBoot OAuth`需要整合`ApiBoot Security`来配合使用，正因为如此，`ApiBoot`在构建`Starter`时将两者合并为了一个。

## 1. 添加依赖组件
在项目的`pom.xml`文件内添加如下依赖：
```xml
<!--ApiBoot Security Oauth-->
<dependency>
	<groupId>org.minbox.framework</groupId>
	<artifactId>api-boot-starter-security-oauth-jwt</artifactId>
</dependency>
```
> 注意：如果未添加`ApiBoot`版本依赖，请访问[版本依赖](/zh-cn/docs/version-rely.html)查看添加方式。

## 2. 内存方式
`memory（内存方式）`也是`ApiBoot OAuth`的默认方式，会将生成的`access_token`存放在内存中，通过我们简单的配置就可以完成快速集成`OAuth2`来保护你的接口资源，下面详细解释配置的作用。
### 2.1 配置客户端信息
`client`的概念在`OAuth2`里面相信大家并不陌生，只有被授权的客户端才可以访问`/oauth/token`获取对应的`access_token`访问令牌，而`ApiBoot OAuth`的内存方式客户端信息是在`application.yml、application.properties`文件内进行配置，如下所示：
```yaml
api:
  boot:
    oauth:
      	client-id: ApiBoot
      	client-secret: ApiBootSecret
```
- `api.boot.oauth.client-id`：配置客户端编号信息（获取`access_token`时携带的`Basic Auth`的用户名），该参数默认值为`ApiBoot`
- `api.boot.oauth.client-secret`：配置客户端秘钥（获取`access_token`时携带的`Basic Auth`的密码），该参数默认值为`ApiBootSecret`

### 2.2 设置ResourceID
`resource-id`是授权访问的资源编号，默认值为`api`，如需修改如下所示：
```yaml
api:
  boot:
    oauth:
      resource-id: api
```
### 2.3 设置客户端的授权方式（GrantType）
`GrantType`授权方式的配置，对应着客户端所拥有的权限，如：`password`对应着使用`用户名、密码`方式获取`access_token`，`refresh_token`则对应`access_token`过期后使用刷新的方式获取新的`access_token`，配置如下所示：
```yaml
api:
  boot:
    oauth:
      grant-types: password,refresh_token
```
`api.boot.oauth.grant-types`配置默认值为：`password,refresh_token`，如果需要新增授权方式，配置多个使用`,`号隔开。
### 2.4 设置客户端的作用域（Scope）
`Scope`是配置客户端所授权的作用域，可以通过该配置进行权限检验，具体详细去了解`Spring Security + OAuth2`的注解使用，配置如下所示：
```yaml
api:
  boot:
    oauth:
      scopes: api,admin
```
`api.boot.oauth.scopes`参数默认值为`api`，多个使用`,`号隔开，**至少需要配置一个**。
## 3. JDBC方式
`ApiBoot OAuth`支持使用`JDBC`方式将生成的`AccessToken`存放到数据库，以及在数据库内进行配置客户端的相关信息，比如：`client_id`、`client_secret`、`grant_type`、`scopes`等。
我们如果需要使用`ApiBoot OAuth`的`JDBC`方式来实现，需要遵循`OAuth2`的建表`SQL`在需要的数据库内执行创建表结构，`MySQL`数据库对应的语句访问[MySQL OAuth2 SQL](https://github.com/hengboy/api-boot/blob/master/api-boot-project/api-boot-starters/api-boot-starter-security-oauth-jwt/oauth-mysql.sql)获取，开启`JDBC`方式修改`application.yml`配置如下：
```yaml
api:
  boot:
    oauth:
      away: jdbc
```
### 3.1 配置客户端信息
在使用`OAuth2`时，`oauth_client_details`信息表用于配置客户端的基本信息，新增一条数据对应授权一个新的客户端可以进行安全认证，我们可以执行下面`SQL`创建一个新的客户端信息：
```sql
INSERT INTO `oauth_client_details` VALUES ('ApiBoot','api','$2a$10$M5t8t1fHatAj949RCHHB/.j1mrNAbxIz.mOYJQbMCcSPwnBMJLmMK','api','password',NULL,NULL,7200,7200,NULL,NULL);
```
> 注意：`client_secret`列的数据必须通过`BCryptPasswordEncoder`进行加密，这里存储加密后的字符串。

### 3.2 设置ResourceID
修改`oauth_client_details`信息表内对应客户端的`resource_ids`列的数据内容即可，如果需要配置多个值时使用`英文半角逗号`隔开。
### 3.3 设置客户端的授权方式（GrantType）
修改`oauth_client_details`信息表内对应客户端的`authorized_grant_types`列的数据内容，如果需要配置多个授权方式同样使用`英文半角逗号`隔开。
### 3.4 设置客户端作用域（Scope）
修改`oauth_client_details`信息表内对应客户端的`scope`列的数据内容，如果需要配置多个授权方式同样使用`英文半角逗号`隔开。

## 4. 获取AccessToken
获取`access_token`是我们集成`ApiBoot OAuth`的必经之路，我们需要携带`access_token`去访问受保护的资源，下面提供了多种途径获取`access_token`，按需选择使用。

### 4.1 CURL方式
在`Mac`、`Linux`系统下可以直接通过`curl`命令行进行获取`access_token`，命令如下所示：

```sh
~ curl ApiBoot:ApiBootSecret@localhost:8080/oauth/token -d "grant_type=password&username=apiboot&password=abc321"
获取结果：
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXBpIl0sInVzZXJfbmFtZSI6ImFwaWJvb3QiLCJzY29wZSI6WyJhcGkiXSwiZXhwIjoxNTYwNDQ2NDc5LCJhdXRob3JpdGllcyI6WyJST0xFX2FwaSJdLCJqdGkiOiI2ZmQ0ZDdiNi1kN2JkLTRiMmUtYmFlYi1iNGMwMmRlMjM0YmYiLCJjbGllbnRfaWQiOiJBcGlCb290In0.l_38N6gJbSug_uzJLope9uJQsA12BfJNDlGFmB-UQMU","token_type":"bearer","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXBpIl0sInVzZXJfbmFtZSI6ImFwaWJvb3QiLCJzY29wZSI6WyJhcGkiXSwiYXRpIjoiNmZkNGQ3YjYtZDdiZC00YjJlLWJhZWItYjRjMDJkZTIzNGJmIiwiZXhwIjoxNTYyOTk1Mjc5LCJhdXRob3JpdGllcyI6WyJST0xFX2FwaSJdLCJqdGkiOiIxNmZhZThlNi00ZDM3LTQ1NTctOTZiYi1hMWQ4MjBkOTk2NTYiLCJjbGllbnRfaWQiOiJBcGlCb290In0.egICzqsReO0hxheUv2i7u-3vloo7kYf1-_JqMcSR240","expires_in":42378,"scope":"api","jti":"6fd4d7b6-d7bd-4b2e-baeb-b4c02de234bf"}
```
根据上面的`curl`命令，各个组成部分值解释：
- `ApiBoot`：客户端编号，取决于`client_id`配置的值
- `ApiBootSecret`，客户端秘钥，取决于`client_secret`配置的值
- `grant_type=password`：授权方式，取决于配置的授权方式。
- `apiboot`：当`grant_type=password`时传递的`ApiBoot Security`配置的用户名（`username`）
- `abc123`：当`grant_type=password`时传递的`ApiBoot Security`配置的密码（`password`）

### 4.2 PostMan方式
![PostMan获取AccessToken](/img/postman-access-token.png)

> 注意：
>
> 1. 获取`access_token`的请求方式是`POST`。
> 2. 使用`Basic`方式认证客户端信息
> 3. 不要混淆客户端的clientId、clientSecret与用户的username、password的概念。

### 4.3 RestTemplate方式

```java
// 获取Token请求路径
String access_token_uri = "http://localhost:8080/oauth/token?grant_type=password&username=apiboot&password=abc321";
// 客户端Id
String clientId = "ApiBoot";
// 客户端Secret
String clientSecret = "ApiBootSecret";
// basic认证的格式
String basicAuth = "Basic %s";

// 可以使用注入RestTemplate方式获取对象实例
RestTemplate restTemplate = new RestTemplate();
// 请求头
HttpHeaders headers = new HttpHeaders();
// 设置客户端的basic认证信息
headers.set("Authorization", String.format(basicAuth, Base64Utils.encodeToString((clientId + ":" + clientSecret).getBytes())));
// 请求主体
HttpEntity<String> httpEntity = new HttpEntity<>(headers);
// 发送请求，获取access_token
String access_token = restTemplate.postForObject(access_token_uri, httpEntity, String.class);

System.out.println(access_token);
```
## 5. 自定义授权方式（GrantType）
`OAuth2`内部提供了一些内置的`grant_type`，根据业务需求有时需要自定义，比如：`手机号验证码登录`、`第三方微信登录`等，针对这种场景`ApiBoot OAuth`提供了自定义授权的方式，我们需要通过
实现接口`ApiBootOauthTokenGranter`来完成自定义授权的业务编写。
### 5.1 了解OAuth2内置的GrantType
以下是集成`OAuth2`常用的几种授权方式：
- `password`：用户名密码方式
- `refresh_token`：刷新`access_token`
- `authorization_code`：授权码方式
- `client_credentials`：客户端方式

### 5.2 了解ApiBootOauthTokenGranter接口
`ApiBootOauthTokenGranter`接口是`ApiBoot OAuth`提供的自定义授权方式的定义。
#### 5.2.1 grantType方法
```java
/**
* oauth2 grant type for ApiBoot
*
* @return grant type
*/
String grantType();
```
该方法返回自定义授权方式，如该方法返回`phone_code`，对应在获取`access_token`时使用`/oauth/token?grant_type=phone_code`。
#### 5.2.2 loadByParameter方法
```java
/**
* load userDetails by parameter
*
* @param parameters parameter map
* @return UserDetails
* @throws ApiBootTokenException
* @see UserDetails
*/
UserDetails loadByParameter(Map<String, String> parameters) throws ApiBootTokenException;
```
`loadByParameter`方法的参数是一个请求参数的集合，是在发起获取`access_token`时所携带的参数列表，我们拿到参数后可以进行数据校验，校验通过后返回实现`UserDetails`接口的具体类型实例。

### 5.3 自定义授权方式
在上面简单介绍了`ApiBootOauthTokenGranter`接口，下面提供一个短信验证码登录的示例。
#### 5.3.1 短信验证码方式登录示例

```java
/**
 * 短信验证码登录示例
 *
 * @author 恒宇少年 - 于起宇
 * <p>
 * DateTime：2019-06-06 09:15
 * Blog：http://blog.yuqiyu.com
 * WebSite：http://www.jianshu.com/u/092df3f77bca
 * Gitee：https://gitee.com/hengboy
 * GitHub：https://github.com/hengboy
 */
@Component
public class PhoneCodeOauthTokenGranter implements ApiBootOauthTokenGranter {
    /**
     * logger instance
     */
    static Logger logger = LoggerFactory.getLogger(PhoneCodeOauthTokenGranter.class);
    /**
     * 获取Token时使用grant_type=phone_code授权方式
     */
    private static final String GRANT_TYPE = "phone_code";

    /**
     * 参数：手机号
     */
    private static final String PARAM_PHONE = "phone";
    /**
     * 参数：验证码
     */
    private static final String PARAM_CODE = "code";

    @Override
    public String grantType() {
        return GRANT_TYPE;
    }

    /**
     * 该方法参数集合是获取Token时携带的参数
     * 获取Token路径：/oauth/token?grant_type=phone_code&phone=171xxxxx&code=196523
     * phone=171xxxxx
     * code=196523
     *
     * @param parameters parameter map
     * @return
     * @throws ApiBootTokenException
     */
    @Override
    public UserDetails loadByParameter(Map<String, String> parameters) throws ApiBootTokenException {
        String phone = parameters.get(PARAM_PHONE);
        String code = parameters.get(PARAM_CODE);

        logger.debug("手机号：{}", phone);
        logger.debug("验证码：{}", code);

        // 自定义数据逻辑校验验证码是否正确、是否与该手机号匹配等
        // 校验通过后返回实现SpringSecurity提供的UserDetails接口的数据实体即可
        return new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return null;
            }

            @Override
            public String getPassword() {
                return null;
            }

            @Override
            public String getUsername() {
                return phone;
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public boolean isEnabled() {
                return true;
            }
        };
    }
}
```
#### 5.3.2 配置客户端支持自定义授权方式
在上面我们定义短信验证码方式的授权，我们需要让客户端支持该授权方式，内存方式参考本章文档[2.3]，JDBC方式参考本章文档[3.3]
#### 5.3.3 获取自定义授权方式AccessToken
`ApiBoot OAuth`修改了`Oauth2`内部有关授权的源码方式进行实现，所以获取`Token`跟内置的授权方式没有区别，只不过是`grant_type`参数有所变动，针对上面`自定义短信验证码登录`的授权方式获取`Token`如下所示：

```sh
curl ApiBoot:ApiBootSecret@localhost:8080/oauth/token -d "grant_type=phone_code&phone=171xxxx&code=026492"
```
本次获取`access_token`的所有参数都会传递给`ApiBootOauthTokenGranter#loadByParameter`方法的参数集合内。
## 6. 使用JWT格式化AccessToken
使用`JWT`格式化`access_token`是一个很常见的需求，因此`ApiBoot OAuth`内部针对`JWT`进行了支持，通过简单的配置参数就可以使用`JWT`对`access_token`进行格式化。
### 6.1 配置JWT秘钥
`JWT`内部使用`RSA`方式进行加密，加密时需要使用`秘钥Key`，`ApiBoot Security Oauth`内部默认使用`ApiBoot`作为`秘钥Key`，如果需要修改我们可以通过`api.boot.oauth.jwt.sign-key`参数进行设置，如下所示：

```yaml
api:
  boot:
    oauth:
      away: jdbc
      jwt:
        # 转换Jwt时所需加密key，默认为ApiBoot
        sign-key: 恒宇少年 - 于起宇
```
### 6.2 开启JWT
在`ApiBoot Security Oauth`内默认集成了`JWT`格式化`Oauth Access Token`的转换方式，但是并未启用，需要通过`api.boot.oauth.jwt.enable`来开启`JWT`，如下所示：
```yaml
api:
  boot:
    oauth:
      away: jdbc
      jwt:
        # 开启Jwt转换AccessToken
        enable: true
```
