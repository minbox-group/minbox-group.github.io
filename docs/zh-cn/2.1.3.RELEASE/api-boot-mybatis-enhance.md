---
title: ApiBoot Mybatis Enhance 使用文档
---

# ApiBoot 整合 持久化框架 Mybatis Enhance

`ApiBoot Mybatis Enhance`是一款`数据持久化`、`动态查询结构化`框架，用户操作单表、多表关联的数据，在`Mybatis`的基础上进行封装扩展，
不影响任何原生的使用，使用后完全替代`mybatis-core`、`mybatis-spring`以及`mybatis-spring-boot-starter`，使用`SpringBoot配置文件`方式代替传统代码配置，减少繁琐代码编写。

## 1. 特性
`ApiBoot Mybatis Enhance`总结了目前主流框架的使用风格，对开发者来说使用不便的地方进行封装扩展，让数据操作更艺术。
### 特性一、提供增强方法
`ApiBoot Mybatis Enhance`内部提供了常用的方法实现，可以快速对单条、多条数据进行`CRUD`常规操作。
### 特性二、DSL
`ApiBoot Mybatis Enhance`提供动态查询方式，可以动态查询单表、多表关联指定的列值或者整条数据，可以将结果映射成你想要的类型。
### 特性三、方法规则查询
`ApiBoot Mybatis Enhance`提供方法规则查询，在对应数据接口`Mapper`内，遵循一定规则可以完成对数据的查询、统计、删除等。
## 2. 愿景
`ApiBoot Mybatis Enhance`致力于解决简单、快速操作数据问题，省去繁琐`SQL`的编写，让开发人员更专注业务编写。
## 3. 开始使用
在项目的`pom.xml`文件内添加如下依赖：
```xml
<!--ApiBoot Mybatis Enhance-->
<dependency>
    <groupId>org.minbox.framework</groupId>
    <artifactId>api-boot-starter-mybatis-enhance</artifactId>
</dependency>
```
> 注意：如果未添加`ApiBoot`版本依赖，请访问[版本依赖](/zh-cn/docs/version-rely.html)查看添加方式。
## 4. 定义数据实体
`Enhance`所需要的数据实体很简单，只需要告知`Enhance`所需要的表信息以及列信息即可（实际在开发过程中编写数据实体是一件很繁琐的事情，因此`ApiBoot`为`Enhance`编写了专属的代码生成插件，访问[Enhance Codegen](/zh-cn/docs/api-boot-mybatis-enhance-codegen.html)查看具体使用方式）
利用`Enhance Codegen`自动生成的数据实体类如下所示：
```java
import com.gitee.hengboy.mybatis.enhance.common.annotation.Column;
import com.gitee.hengboy.mybatis.enhance.common.annotation.Id;
import com.gitee.hengboy.mybatis.enhance.common.annotation.Table;
import com.gitee.hengboy.mybatis.enhance.common.enums.KeyGeneratorTypeEnum;
import lombok.Data;

import java.sql.Timestamp;

/**
 * 用户基本信息
 * @author ApiBoot Mybatis Enhance Codegen
 */
@Data
@Table(name = "iot_user_info")
public class UserInfo {

    /**
     * 用户主键
     */
    @Id(generatorType = KeyGeneratorTypeEnum.UUID)
    @Column(name = "UI_ID")
    private String id;
    /**
     * 用户编号
     */
    @Column(name = "UI_USER_NO")
    private String userNo;
    /**
     * 用户名
     */
    @Column(name = "UI_USER_NAME")
    private String userName;
    /**
     * 年龄
     */
    @Column(name = "UI_AGE")
    private Integer age;
    /**
     * 性别，boy：男,girl：女,other：其他
     */
    @Column(name = "UI_SEX")
    private String sex = "other";
    /**
     * 创建时间
     */
    @Column(name = "UI_CREATE_TIME",insertable = false)
    private Timestamp createTime;
    /**
     * 1：正常，0：禁用，-1：删除
     */
    @Column(name = "UI_STATUS")
    private Integer status = 1;
    /**
     * 备注信息
     */
    @Column(name = "UI_MARK")
    private String mark;
}
```
在上面的数据实体类内我们都是使用的注解形式来完成的配置，简单介绍下注解的作用
- `@Data`：`Lombok`内部的注解，如果没有了解过该插件可以访问恒宇少年的文章<a href="https://blog.yuqiyu.com/spring-boot-chapter29.html" target="_blank">第二十九章：基于SpringBoot平台使用Lombok来优雅的编码</a>查看具体使用方法。
- `@Table`：`Enhance`内部注解，用于标注该数据实体所使用的`表信息`
- `@Id`：`Enhance`内部注解，用户标注主键字段
- `@Column`：`Enhance`内部注解，用于标注字段对应的`列信息`
## 5. 了解EnhanceMapper接口
`Enhance`所管理的`Mybatis Mapper`以及内置的`CRUD`操作单表数据的接口方法都是由`EnhanceMapper`接口来完成的。

`ApiBoot Mybatis Enhance`在项目启动时会自动加载`EnhanceMapper`的所有子类进行数据操作方法实现并交付给`Spring IOC`进行托管，为每一个方法
都提供对应的`Statement`以及`SqlSource`的实现，而`StatementID`则是`Mapper`类的全限定名。
### 5.1 EnhanceMapper提供的方法列表
在`EnhanceMapper`接口内提供的数据操作方法，如下所示：
```java
// 统计数据
Long countAll() throws EnhanceFrameworkException;
// 清空数据
void deleteAll() throws EnhanceFrameworkException;
// 根据主键数组删除指定数据
void deleteArray(Id... ids) throws EnhanceFrameworkException;
// 根据自定义sql删除数据
void deleteBySql(String sql, Map<String, Object> params) throws EnhanceFrameworkException;
// 根据主键集合删除指定数据
void deleteCollection(Collection<Id> collection) throws EnhanceFrameworkException;
// 删除一条数据
void deleteOne(Id id) throws EnhanceFrameworkException;
// 数据保存
void insert(T t) throws EnhanceFrameworkException;
// 保存数组内的所有数据
void insertArray(T... array) throws EnhanceFrameworkException;
// 保存集合内的所有数据
void insertCollection(Collection<T> collection) throws EnhanceFrameworkException;
// 查询全部数据
List<T> selectAll() throws EnhanceFrameworkException;
// 根据主键数组查询指定数据
List<T> selectArray(Id... ids) throws EnhanceFrameworkException;
// 分页查询数据
List<T> selectByPageable(Pageable pageable) throws EnhanceFrameworkException;
// 自定义sql查询数据
List<Map> selectBySql(String sql, Map<String, Object> params) throws EnhanceFrameworkException;
// 根据主键集合查询指定数据
List<T> selectCollection(Collection<Id> ids) throws EnhanceFrameworkException;
// 根据主键查询单条数据
T selectOne(Id id) throws EnhanceFrameworkException;
// 根据主键更新数据实体
void update(T t) throws EnhanceFrameworkException;
// 自定义sql更新数据
void updateBySql(String sql, Map<String, Object> params) throws EnhanceFrameworkException;
```
### 5.2 使用EnhanceMapper
针对上面的`UserInfo`数据实体，对应的`Mapper`接口定义如下所示：
```java
/**
 * 用户数据接口
 *
 * @author：恒宇少年 - 于起宇
 * <p>
 * DateTime：2019-05-23 17:02
 * Blog：https://blog.yuqiyu.com
 * WebSite：http://www.jianshu.com/u/092df3f77bca
 * Gitee：https://gitee.com/hengboy
 * GitHub：https://github.com/hengboy
 */
public interface UserMapper extends EnhanceMapper<UserInfo, String> {
}
```
在上面`UserMapper`拥有了`EnhanceMapper`的全部接口方法并且每一个方法都已经实现了对应的`Statement`，而且`UserMapper`已经被`Spring IOC`托管，我们在实体类内可以直接通过`注入`方法来调用使用。
## 6. 保存数据
`EnhanceMapper`所提供的`insert`方法参数为数据对象实例，添加一条数据如下所示：
```java
@Service
@Transactional(rollbackFor = Exception.class)
public class UserService {
    /**
     * 用户基本信息数据接口
     */
    @Autowired
    private UserMapper userMapper;

    /**
     * 保存用户信息
     */
    public void saveUser() {
        // 创建用户基本信息对象
        UserInfo userInfo = new UserInfo();
        // 设置用户编号
        userInfo.setUserNo("2019xxxx");
        // 设置用户年龄
        userInfo.setAge(24);
        // 执行数据保存
        userMapper.insert(userInfo);
    }
}
```
通过上面`saveUser`就可以执行保存一条用户基本信息，在上面保存数据方法中并未设置主键的值，下面详细介绍`Enhance`内提供的几种主键生成策略。
### 6.1 自增主键
`Enhance`支持自增类型的主键，可以将本次添加数据的自增主键值查询并设置到保存对象配置`@Id`注解的字段内，配置使用如下所示：
```java
/**
* 用户主键
*/
@Id(generatorType = KeyGeneratorTypeEnum.AUTO)
@Column(name = "UI_ID")
private Integer userId;
```
### 6.2 UUID主键
如果主键使用`UUID`方式进行存储，`Enhance`同样是支持配置，如下所示：
```java
/**
* 用户主键
*/
@Id(generatorType = KeyGeneratorTypeEnum.UUID)
@Column(name = "UI_ID")
private String id;
```
> 注意：数据库设置主键字段长度时，`UUID`生成的长度为`36`位，包含`-`。
### 6.3 自定义主键
除了自增、UUID方式的主键以外，还支持`自定义主键`的方式，比如用户编号：`2019xxxxx`，如下所示：
```java
/**
* 用户主键
*/
@Id(generatorType = KeyGeneratorTypeEnum.DIY)
@Column(name = "UI_ID")
private String id;
```
## 7. 查询数据
`EnhanceMapper`提供了多种查询方法，其中包含`主键查询`、`根据主键的集合查询`、`分页查询`等，下面详细介绍具体的使用方法。
### 7.1 根据主键查询单条记录
`Enhance`支持三种根据主键查询的方法，如下所示：
```java
// 查询单条记录
UserInfo user = mapper.selectOne("test");
// 根据主键数组查询多条记录
List<UserInfo> userArray = mapper.selectArray("test", "admin");
// 根据主键集合查询多条记录
List<UserInfo> userCollection = mapper.selectCollection(Arrays.asList("test", "admin"));
```
其中`selectArray`、`selectCollection`两个方法是根据传递的多个主键进行查询出对应多条记录。
### 7.2 查询记录列表
`Enhance`支持查询表内的全部数据、分页查询数据，如下所示：
```java
// 查询全部数据
List<UserInfo> users = mapper.selectAll();
// 分页查询数据
List<UserInfo> pageUsers = mapper.selectByPageable(Pageable.builder().limit(10).currentPage(2).build());
```
`EnhanceMapper`接口提供的`查询记录列表`的方法，有一定的局限性，目前并不支持添加查询条件进行筛选数据，不过`ApiBoot Enhance`提供了`DSL`方式进行查询数据，具体使用方法请参考本章节下面的文档内容。
## 8. 更新数据
`EnhanceMapper`提供更新单个对象的方法，具体使用方法如下所示：
```java
UserInfo userInfo = new UserInfo();
userInfo.setId("test");
userInfo.setAge(20);
userInfo.setUserName("测试用户");
mapper.update(userInfo);
```
**更新数据时，不设置值得字段会自动将表内数据更新为null，如果你只想更新某一个字段，可以使用如下两种形式。**
- `查询后更新`
```java
// 根据主键查询记录
UserInfo userInfo = mapper.selectOne("test");
// 更新查询出记录的年龄
userInfo.setAge(24);
// 更新查询出记录的名称
userInfo.setUserName("测试用户");
// 执行更新记录
mapper.update(userInfo);
```
> `update`方法调用时，参数对象的主键必须设置值，更新时自动根据主键进行设置。
- `动态更新`

详见本章动态更新文档，支持根据`主键`、`自定义条件`进行筛选定位更新的记录。

## 9. 删除数据
`EnhanceMapper`提供的删除方法都是`物理删除`，会从表内直接将匹配数据删除，`EnhanceMapper`提供的删除方法如下所示：
```java
// 根据主键删除单条数据记录
mapper.deleteOne(1);
// 根据主键数组删除多条对应数据记录
mapper.deleteArray(1, 2, 3, 4);
// 根据主键集合删除多条对应数据记录
mapper.deleteCollection(Arrays.asList(1, 2, 3, 4));
// 删除全部记录
mapper.deleteAll();
```
如果你的业务需求是`业务逻辑删除`，只更新某一个状态字段的值时，可以考虑使用`动态更新`，详见下面文档。

## 10. 动态查询
`ApiBoot Enhance`的动态查询可以做很多事情，我们可以对`单表数据`、`多表数据`进行查询操作，可以使用某一个`数据对象`作为查询的返回值映射，也可以`自定义DTO`、`基本数据类型`来作为查询方法的返回值，每一个查询的查询条件
都可以做到完全自定义，实现一行代码完成对数据的查询。
### 10.1 生成动态查询实体
在通过`ApiBoot Enhance`动态操作数据之前需要对应每一张表创建一个`动态实体`，`ApiBoot`提供了对应每一张表自动生成`数据实体`、`动态实体`的`maven plugin`，访问<a href="/zh-cn/docs/api-boot-mybatis-enhance-codegen.html" target="_blank">ApiBoot Enhance Codegen</a>查看具体使用方式。
下面是一个`动态实体`示例，通过`ApiBoot Enhance Codegen`自动生成，对应数据库内`user_info`表结构。
```java
/**
 * 用户基本信息
 * @author ApiBoot Mybatis Enhance Codegen
 */
public class DUserInfo extends TableExpression<UserInfo> {

    public DUserInfo(String root) {
        super(root);
    }

    public static DUserInfo DSL() {
        return new DUserInfo("user_info");
    }

    /**
     * 用户主键
     */
    public ColumnExpression id = new ColumnExpression("UI_ID", this);
    /**
     * 用户编号
     */
    public ColumnExpression userNo = new ColumnExpression("UI_USER_NO", this);
    /**
     * 用户名
     */
    public ColumnExpression userName = new ColumnExpression("UI_USER_NAME", this);
    /**
     * 年龄
     */
    public ColumnExpression age = new ColumnExpression("UI_AGE", this);
    /**
     * 性别，boy：男,girl：女,other：其他
     */
    public ColumnExpression sex = new ColumnExpression("UI_SEX", this);
    /**
     * 创建时间
     */
    public ColumnExpression createTime = new ColumnExpression("UI_CREATE_TIME", this);
    /**
     * 1：正常，0：禁用，-1：删除
     */
    public ColumnExpression status = new ColumnExpression("UI_STATUS", this);
    /**
     * 备注信息
     */
    public ColumnExpression mark = new ColumnExpression("UI_MARK", this);
    @Override
    public ColumnExpression[] getColumns() {
        return new ColumnExpression[]{id, userNo, userName, age, sex, createTime, status, mark};
    }

}

```
### 10.2 单表查询
下面从`查询单表`内的数据开始一一拆分讲解。
#### 10.2.1 主键方式查询
我们了解了`EnhanceMapper`接口所提供了根据主键查询的`selectOne`方法，这两种方式最终的效果是一样的，`动态方式`的主键查询如下所示：
```java
// 实例化动态查询实体
DUserInfo dUserInfo = DUserInfo.DSL();
// 从DUserInfo动态实体对应的数据表内查询主键为1的记录
UserInfo user = dslFactory.createSearchable().selectFrom(dUserInfo)
    .where(dUserInfo.id.eq(1))
    // 查询的返回值类型是UserInfo数据实体
    .resultType(UserInfo.class)
    // 查询单条数据
    .fetchOne();
```

#### 10.2.2 非主键方式查询
通过动态方式查询，可以根据`动态实体`内的`任意一个`、或者`多个`字段作为查询条件，如下所示：
```java
// 实例化动态查询实体
DUserInfo dUserInfo = DUserInfo.DSL();
// 根据userNo字段查询数据
UserInfo user = dslFactory.createSearchable().selectFrom(dUserInfo)
        .where(dUserInfo.userNo.eq("2019xxx"))
        .resultType(UserInfo.class)
        .fetchOne();
```

#### 10.2.3 多条件组合查询
一个查询的`查询条件`可以有很多个，使用动态查询可以完成`and`、`or`的条件关联，模拟需求查询用户编号为`2019xxx`并且`大于20岁`的`男孩`指定某一个用户，如下所示：
```java
// 实例化动态查询实体
DUserInfo dUserInfo = DUserInfo.DSL();
// 根据userNo字段查询数据
UserInfo userInfo = dslFactory.createSearchable().selectFrom(dUserInfo)
        // where userNo = 2019xxx
        .where(dUserInfo.userNo.eq("2019xxx"))
        // and sex = boy
        .and(dUserInfo.sex.eq("boy"))
        // and age > 20
        .and(dUserInfo.age.gt(20))
        .resultType(UserInfo.class)
        .fetchOne();
```
上面动态查询对应生成的`SQL`，如下所示：
```sql
-- 生成的SQL
Preparing: SELECT iot_user_info.UI_ID,
       iot_user_info.UI_USER_NO,
       iot_user_info.UI_USER_NAME,
       iot_user_info.UI_AGE,
       iot_user_info.UI_SEX,
       iot_user_info.UI_CREATE_TIME,
       iot_user_info.UI_STATUS,
       iot_user_info.UI_MARK
FROM iot_user_info
WHERE (iot_user_info.UI_USER_NO = ? AND iot_user_info.UI_SEX = ? AND iot_user_info.UI_AGE > ?);
-- 参数列表
Parameters: 2019xxx(String), boy(String), 20(Integer)
```
下面我们模拟需求`查询25岁以下用户` 或 `性别为女孩`的用户列表，动态查询如下所示：
```java
// 实例化动态查询实体
DUserInfo dUserInfo = DUserInfo.DSL();
// 根据userNo字段查询数据
List<UserInfo> users = dslFactory.createSearchable().selectFrom(dUserInfo)
        // sex = girl
        .where(dUserInfo.sex.eq("girl"))
        // or age < 25
        .or(dUserInfo.age.lt(25))
        .resultType(UserInfo.class)
        .fetch();
```
上面动态查询对应生成的`SQL`如下所示：
```sql
-- 生成的SQL
Preparing: SELECT iot_user_info.UI_ID,
       iot_user_info.UI_USER_NO,
       iot_user_info.UI_USER_NAME,
       iot_user_info.UI_AGE,
       iot_user_info.UI_SEX,
       iot_user_info.UI_CREATE_TIME,
       iot_user_info.UI_STATUS,
       iot_user_info.UI_MARK
FROM iot_user_info
WHERE (iot_user_info.UI_SEX = ?)
   OR (iot_user_info.UI_AGE < ?);
-- 参数列表
Parameters: girl(String), 25(Integer)
```
### 10.3 多表关联查询
`ApiBoot Enhance`支持`leftJoin`、`rightJoin`、`innerJoin`三种关联方式查询，这三种关联查询的使用方式一致，下面我们来看下多表关联的`leftJoin`实现方式：
```java
// 系统用户动态实体
DSystemUser dSystemUser = DSystemUser.DSL();
// 系统用户角色关联动态实体
DSystemUserRole dSystemUserRole = DSystemUserRole.DSL();
// 执行查询并且返回SystemUser类型对象
List<UserInfo> users = dslFactory.createSearchable()
        .selectFrom(dSystemUser)
        .leftJoin(dSystemUser.id, dSystemUserRole.userId)
        .where(dSystemUserRole.roleId.eq("367c8078-a1f1-11e9-9b7e-3417eb9c0f80"))
        .and(dSystemUser.status.eq(1))
        .resultType(SystemUser.class)
        .fetch();
```
在上面查询定义中，我们查询用户角色为`367c8078-a1f1-11e9-9b7e-3417eb9c0f80`的用户列表，并且用户的状态为`1`，在`leftJoin`方法内有两个动态实体的字段，这两个字段则是在表内存在`主外键关系`的（当然不存在主外键关系我们也可以进行关联查询）。

`leftJoin`方法参数分别代表了主外键的字段配置，具体配置内容如下所示：
```java 
// 可以配置多个leftJoin进行关联多表查询
leftJoin(主表.主键,从表.外键);
```
上面查询代码对应生成`SQL`如下所示：
```sql
SELECT iot_system_user.SU_ID, iot_system_user.SU_USER_NAME, iot_system_user.SU_NICK_NAME, iot_system_user.SU_PASSWORD, iot_system_user.SU_STATUS, iot_system_user.SU_CREATE_TIME, iot_system_user.SU_MARK FROM iot_system_user LEFT OUTER JOIN iot_system_user_role on iot_system_user_role.SUR_USER_ID = iot_system_user.SU_ID WHERE (iot_system_user_role.SUR_ROLE_ID = ? AND iot_system_user.SU_STATUS = ?)
```

### 10.4 自定义返回类型

有时我们在进行关联或者单表查询时，只需要获取其中的某一个、多个字段，这时我们就可以通过`resultType`方法来定义返回的类型，如果是基本数据类型的封装类型（如：`Integer`、`Long`等）可以直接返回，如果查询结果是非单列数值时，我们可以`自定义返回类型`来进行`查询结果映射`，简单示例如下所示：

```java
/**
 * 自定义系统用户数据转换实体
 *
 * @author：恒宇少年 - 于起宇
 * <p>
 * DateTime：2019-07-10 09:08
 * Blog：https://blog.yuqiyu.com
 * WebSite：http://www.jianshu.com/u/092df3f77bca
 * Gitee：https://gitee.com/hengboy
 * GitHub：https://github.com/hengboy
 */
@Data
public class SystemUserDTO {
    /**
     * 主键
     */
    @Column(name = "SU_ID")
    private String id;
    /**
     * 用户名
     */
    @Column(name = "SU_USER_NAME")
    private String userName;
    /**
     * 用户昵称
     */
    @Column(name = "SU_NICK_NAME")
    private String nickName;
}
```
上面是我们定义的数据转换实体，用于接收查询数据表内的`多个字段`，查询代码如下所示：
```java
// 系统用户动态查询实体
DSystemUser dSystemUser = DSystemUser.DSL();
List<UserInfo> users = dslFactory.createSearchable()
        // 只查询id、userName、nickName对应的列值
        .select(dSystemUser.id, dSystemUser.userName, dSystemUser.nickName)
        // from table
        .from(dSystemUser)
        .where(dSystemUser.status.eq(1))
        // 自定义实体类类型定义
        .resultType(SystemUserDTO.class)
        .fetch();
```
上面查询代码对应生成的`SQL`如下所示：
```sql
SELECT iot_system_user.SU_ID, iot_system_user.SU_USER_NAME, iot_system_user.SU_NICK_NAME FROM iot_system_user WHERE (iot_system_user.SU_STATUS = ?)
```

### 10.5 列值匹配实体类字段

`ApiBoot Enhance`在查询时，查询结果集的`列值`与实体类内的`字段值`对应关系是通过`@Column`注解的`name`属性来定的，如果查询结果集内的`列名`与实体类的`字段名`**一致**，那么`@Column`注解可以不配置，如果不一致需要在`实体类字段上`配置`@Column(name='列名')`.

### 10.6 组装动态对象

`ApiBoot Enhance`支持动态组装查询对象`Searchable`，当我们根据业务逻辑进行判断时可以动态组装查询条件、关联表、返回值、查询字段等，简单示例如下所示：
```java
public List<SystemUser> assembleQuery(boolean isJoin) {
    // 系统用户动态查询对象
    DSystemUser dSystemUser = DSystemUser.DSL();
    // 创建Searchable查询对象
    Searchable searchable = dslFactory.createSearchable().selectFrom(dSystemUser)
            .where(dSystemUser.status.eq(1));
    // 根据参数组装关联查询
    if (isJoin) {
        // 系统用户角色关联查询对象
        DSystemUserRole dSystemUserRole = DSystemUserRole.DSL();
        searchable.leftJoin(dSystemUser.id, dSystemUserRole.userId);
    }
    // 设置返回值类型 & 查询数据
    return searchable.resultType(SystemUser.class).fetch();
}
```
上面查询代码中只是根据参数组装了`leftJoin`关联表，`ApiBoot Enhance`的组装动态查询还待开发者挖掘。
### 10.7 Count函数使用

`ApiBoot Enhance`的动态查询不仅仅可以做`数据查询`，也可以做`数据统计`，使用**count**函数以及查询条件就可以实现复杂的数据统计功能，示例如下所示：
```java
// 系统用户动态查询实体
DSystemUser dSystemUser = DSystemUser.DSL();
// 系统用户角色动态查询实体
DSystemUserRole dSystemUserRole = DSystemUserRole.DSL();
Long count = dslFactory.createSearchable()
        // 建议使用主键统计，主键索引效率会有显著提升
        .count(dSystemUser.id)
        .from(dSystemUser)
        .leftJoin(dSystemUser.id, dSystemUserRole.userId)
        .where(dSystemUser.status.eq(1))
        // 统计的结果类型
        .resultType(Long.class)
        // 查询单个结果
        .fetchOne();
```
`数据统计`的查询条件跟`数据查询`完全一致，可以进行单表、多表关联、组装查询条件等。
上面`数据统计`动态查询生成的`SQL`如下所示：
```sql
SELECT count(iot_system_user.SU_ID) SU_ID FROM iot_system_user LEFT OUTER JOIN iot_system_user_role on iot_system_user_role.SUR_USER_ID = iot_system_user.SU_ID WHERE (iot_system_user.SU_STATUS = ?)
```
### 10.8 Avg函数使用
`ApiBoot Enhance`还支持针对某一个字段的`平均值`查询，使用**avg**函数以及查询条件可以实现复杂的平均值计算，示例如下所示：
```java
// 系统用户动态查询实体
DSystemUser dSystemUser = DSystemUser.DSL();
Integer avgAge = dslFactory.createSearchable()
        // 查询用户年龄平均值
        .avg(dSystemUser.age)
        .from(dSystemUser)
        // 用户状态为1
        .where(dSystemUser.status.eq(1))
        // 返回值类型为Integer，根据age对应表内字段而定
        .resultType(Integer.class)
        // 查询单个结果
        .fetchOne();
```
上面动态查询生成的`SQL`，如下所示：
```sql
SELECT avg(iot_system_user.SU_AGE) SU_AGE FROM iot_system_user WHERE (iot_system_user.SU_STATUS = ?)
```
### 10.9 Sum函数使用
`ApiBoot Enhance`支持针对某一个字段的`总和`查询，使用**sum**函数以及查询条件可以实现复杂的总和计算，示例如下所示：
```java
// 系统用户动态查询实体
DSystemUser dSystemUser = DSystemUser.DSL();
Long sum = dslFactory.createSearchable()
        // 查询用户年龄总和
        .sum(dSystemUser.age)
        .from(dSystemUser)
        // 用户状态为1
        .where(dSystemUser.status.eq(1))
        // 返回值类型为Integer，根据age对应表内字段而定
        .resultType(Long.class)
        // 查询单个结果
        .fetchOne();
```
上面动态查询生成的`SQL`，如下所示：
```sql
SELECT sum(iot_system_user.SU_AGE) SU_AGE FROM iot_system_user WHERE (iot_system_user.SU_STATUS = ?)
```

### 10.10 Min函数使用
`ApiBoot Enhance`支持针对某一个字段的`最小值`查询，使用**min**函数以及查询条件可以实现复杂查询指定字段的最小值计算，示例如下所示：
```java
// 系统用户动态查询实体
DSystemUser dSystemUser = DSystemUser.DSL();
Integer min = dslFactory.createSearchable()
        // 查询最小年龄的用户
        .min(dSystemUser.age)
        .from(dSystemUser)
        // 用户状态为1
        .where(dSystemUser.status.eq(1))
        // 返回值类型为Integer，根据age对应表内字段而定
        .resultType(Integer.class)
        // 查询单个结果
        .fetchOne();
```
上面动态查询生成的`SQL`，如下所示：
```sql
SELECT min(iot_system_user.SU_AGE) SU_AGE FROM iot_system_user WHERE (iot_system_user.SU_STATUS = ?)
```
### 10.11 Max函数使用
`ApiBoot Enhance`支持针对某一个字段的`最大值`查询，使用**max**函数以及查询条件可以实现指定字段复杂查询的最大值计算，示例如下所示：
```java
// 系统用户动态查询实体
DSystemUser dSystemUser = DSystemUser.DSL();
Integer max = dslFactory.createSearchable()
        // 查询最大年龄的用户
        .max(dSystemUser.age)
        .from(dSystemUser)
        // 用户状态为1
        .where(dSystemUser.status.eq(1))
        // 返回值类型为Integer，根据age对应表内字段而定
        .resultType(Integer.class)
        // 查询单个结果
        .fetchOne();
```
上面动态查询生成的`SQL`，如下所示：
```sql
SELECT max(iot_system_user.SU_AGE) SU_AGE FROM iot_system_user WHERE (iot_system_user.SU_STATUS = ?)
```

## 11. 动态更新
`EnhanceMapper`接口内提供了`update`方法可以更新整个对象，如果我们只更新其中某一个、多个字段时`update`方法无法满足我们的需求，而`ApiBoot Enhance DSL`的动态更新可以完成这一需求，示例如下所示：
```java
// 系统用户动态实体
DSystemUser dSystemUser = DSystemUser.DSL();
dslFactory.createUpdateable()
        // 需要更新的表对应的动态实体
        .update(dSystemUser)
        // 更新age对应列值 = 25
        .set(SetFilter.set(dSystemUser.age, 25))
        // 更新mark对应列值 = 备注信息
        .set(SetFilter.set(dSystemUser.mark, "备注信息"))
        // 指定更新用户
        .where(dSystemUser.id.eq("58eea57e-a1f1-11e9-9b7e-3417eb9c0f80"))
        // 执行更新
        .execute();
```
上面动态更新语句对应生成的`SQL`，如下所示：
```sql
-- sql
Preparing: UPDATE iot_system_user SET iot_system_user.SU_AGE = ? , iot_system_user.SU_MARK = ? WHERE (iot_system_user.SU_ID = ?)
-- 参数
Parameters: 25(Integer), 备注信息(String), 58eea57e-a1f1-11e9-9b7e-3417eb9c0f80(String)
```
## 12. 动态删除
`EnhanceMapper`接口提供的`delete`方法只可以根据主键操作数据，我们通过`ApiBoot Enhnace DSL`可以完成指定条件筛选删除，示例如下所示：
```java
// 系统用户动态实体
DSystemUser dSystemUser = DSystemUser.DSL();
dslFactory.createDeleteable()
        // 删除动态实体对应表内的数据
        .delete(dSystemUser)
        // status对应列值 = 1
        .where(dSystemUser.status.eq(1))
        // age对应列值 > 25
        .and(dSystemUser.age.gt(25))
        // 执行删除
        .execute();
```
上面动态删除语句对应生成的`SQL`，如下所示：
```sql
-- sql
Preparing: DELETE FROM iot_system_user WHERE (iot_system_user.SU_STATUS = ? AND iot_system_user.SU_AGE > ?)
-- 参数
Parameters: 1(Integer), 25(Integer)
```
## 13. 排序
`ApiBoot Enhance`动态查询支持根据`查询字段`进行`正序`、`倒序`两种方式进行排序，如下所示：
```java
// 系统用户动态实体
DSystemUser dSystemUser = DSystemUser.DSL();
List<SystemUser> users = dslFactory.createSearchable()
        .selectFrom(dSystemUser)
        // 查询status字段对应列值 = 1
        .where(dSystemUser.status.eq(1))
        // 根据age字段对应列值，正序排序，年龄从小到大排序
        .orderBy(dSystemUser.age, SortEnum.ASC)
        .resultType(SystemUser.class)
        .fetch();
```
`SortEnum`是一个排序的枚举，参考值如下所示：
- `ASC`：正序
- `DESC`：倒序

上面动态查询排序语句对应生成的`SQL`，如下所示：
```sql
SELECT iot_system_user.SU_ID, iot_system_user.SU_USER_NAME, iot_system_user.SU_NICK_NAME, iot_system_user.SU_AGE, iot_system_user.SU_PASSWORD, iot_system_user.SU_STATUS, iot_system_user.SU_CREATE_TIME, iot_system_user.SU_MARK FROM iot_system_user WHERE (iot_system_user.SU_STATUS = ?) ORDER BY iot_system_user.SU_AGE ASC
```
## 14. 分页
`ApiBoot Enhance` 在使用`动态查询`时可以对`结果集`进行`分页`，简单示例如下所示：
```java
// 系统用户动态实体
DSystemUser dSystemUser = DSystemUser.DSL();
List<SystemUser> users = dslFactory.createSearchable()
        .selectFrom(dSystemUser)
        // 查询status字段对应列值 = 1
        .where(dSystemUser.status.eq(1))
        // 根据age字段对应列值，正序排序，年龄从小到大排序
        .orderBy(dSystemUser.age, SortEnum.ASC)
        // 分页的开始位置，0是第一条
        .offset(0)
        // 每页查询20条
        .limit(20)
        .resultType(SystemUser.class)
        .fetch();
```
> 上面动态查询系统用户表内`status=1`的用户列表，并且根据`age`字段进行`ASC`方式排序，查询出`0-20`条数据。

`ApiBoot Enhance`的动态分页提供了两个函数，分别是：`offset`、`limit`。

- `offset()`：分页开始位置，从0开始
- `limit()`：每页查询记录数量

上面分页动态查询对应生成的`SQL`，如下所示：
```sql
-- sql
Preparing: SELECT iot_system_user.SU_ID, iot_system_user.SU_USER_NAME, iot_system_user.SU_NICK_NAME, iot_system_user.SU_AGE, iot_system_user.SU_PASSWORD, iot_system_user.SU_STATUS, iot_system_user.SU_CREATE_TIME, iot_system_user.SU_MARK FROM iot_system_user WHERE (iot_system_user.SU_STATUS = ?) ORDER BY iot_system_user.SU_AGE ASC limit ?,?
-- 参数
Parameters: 1(Integer), 0(Integer), 20(Integer)
```
## 15. 分组
`ApiBoot Enhance`支持对指定字段查询分组，示例如下所示：
```java
// 系统用户动态实体
DSystemUser dSystemUser = DSystemUser.DSL();
List<SystemUser> users = dslFactory.createSearchable()
        // 查询分组的字段
        // 最小年龄
        .select(dSystemUser.userName, dSystemUser.age.min())
        .from(dSystemUser)
        // 查询status字段对应列值 = 1
        .where(dSystemUser.status.eq(1))
        // 根据userName字段对应的列分组
        .groupBy(dSystemUser.userName)
        .resultType(SystemUser.class)
        .fetch();
```
> 在上面动态查询中，根据`userName`对应的列值进行分组。

上面分页动态查询对应生成的`SQL`，如下所示：
```sql
-- sql
Preparing: SELECT iot_system_user.SU_USER_NAME, min(iot_system_user.SU_AGE) SU_AGE FROM iot_system_user WHERE (iot_system_user.SU_STATUS = ?) GROUP BY iot_system_user.SU_USER_NAME
-- 参数
Parameters: 1(Integer)
```

## 16. 方法规则
`ApiBoot Enhance` 提供的`方法规则查询`不同于`动态查询`，并不需要编写过多的代码就可以实现多条件查询单条、多条数据，只需要通过在`Mapper`接口内根据方法命名的规则来生成对应的`SqlSource`以及`Statement`。
### 16.1 正则表达式匹配方法名
`方法命名规则`内部是通过`正则表达式`进行提取查询的字段。

**查询方法命名规则**前缀为：**findBy**，根据某一个字段查询时可以写成`findByXxx`，如果根据多个字段则写成`findByXxxAndXxx`，当然也可以根据`Or`关键字进行查询，注意完全遵循`驼峰命名方式`来声明`方法的名称`，方法的返回值必须是声明方法内`Mapper`对应`数据实体类型`，可以是`单个对象`、也可以是`List<对象>`。

**删除方法命名规则**前缀为：**removeBy**，根据某一个字段删除数据时可以写成`remoteByXxx`，如果根据多个字段则可以写成`remoteByXxxAndXxx`，删除方法没有返回值。

**统计方法命名规则**前缀为：**countBy**，根据主键进行统计数据，根据某一个字段作为查询条件可以成`countByXxx`，如果根据多个字段则可以写成`countByXxxAndXxx`，方法返回值为`Long`类型。

> 注意：方法命名规则的关联关系可以使用`And`也可以使用`Or`，尽量排除两种关系字符存在一个方法名称上。

### 16.2 规则条件查询数据
通过下面`方法命名规则`定义的方法来查看`ApiBoot Enhance`对应给生成的查询语句：
```java
public interface SystemUserMapper extends EnhanceMapper<SystemUser, String> {
    /**
     * 根据userName查询单条记录
     *
     * @param userName
     * @return
     */
    SystemUser findByUserName(@Param("userName") String userName);

    /**
     * 根据userName and status 查询
     *
     * @param userName
     * @param userStatus
     * @return
     */
    SystemUser findByUserNameAndStatus(@Param("userName") String userName, @Param("status") Integer userStatus);

    /**
     * 根据status查询多条记录
     *
     * @param userStatus
     * @return
     */
    List<SystemUser> findByStatus(@Param("status") Integer userStatus);
}
```
> `方法规则查询`有局限性，并不如`动态查询`灵活。

对应上面查询方法生成的`SQL`，如下所示：
```sql
-- findByUserName
SELECT SU_ID, SU_USER_NAME, SU_NICK_NAME, SU_AGE, SU_PASSWORD, SU_STATUS, SU_CREATE_TIME, SU_MARK FROM IOT_SYSTEM_USER WHERE SU_USER_NAME = ?

-- findByUserNameAndStatus
SELECT SU_ID, SU_USER_NAME, SU_NICK_NAME, SU_AGE, SU_PASSWORD, SU_STATUS, SU_CREATE_TIME, SU_MARK FROM IOT_SYSTEM_USER WHERE SU_USER_NAME = ? AND SU_STATUS = ?

-- findByStatus
SELECT SU_ID, SU_USER_NAME, SU_NICK_NAME, SU_AGE, SU_PASSWORD, SU_STATUS, SU_CREATE_TIME, SU_MARK FROM IOT_SYSTEM_USER WHERE SU_STATUS = ?
```

### 16.3 规则条件统计数据
`ApiBoot Enhance` 提供的方法命名规则统计，默认统计`主键列`目前无法修改默认方式，方法命名规则统计数据方法名定义方式如下所示：
```java
public interface SystemUserMapper extends EnhanceMapper<SystemUser, String> {
    //...
    /**
     * 根据状态统计
     *
     * @param status
     * @return
     */
    Long countByStatus(@Param("status") Integer status);

    /**
     * 根据用户名 and 状态统计
     *
     * @param userName
     * @param userStatus
     * @return
     */
    Long countByUserNameAndStatus(@Param("userName") String userName, @Param("status") Integer userStatus);
}
```
对应上面统计方法生成的`SQL`，如下所示：
```sql
-- countByStatus
SELECT COUNT(SU_ID) FROM IOT_SYSTEM_USER WHERE SU_STATUS = ?

-- countByUserNameAndStatus
SELECT COUNT(SU_ID) FROM IOT_SYSTEM_USER WHERE SU_USER_NAME = ? AND SU_STATUS = ?
```

### 16.4 规则条件删除数据
方法名称规则删除示例如下所示：
```java
public interface SystemUserMapper extends EnhanceMapper<SystemUser, String> {
    /**
     * 根据状态删除
     *
     * @param status
     */
    void removeByStatus(@Param("status") Integer status);

    /**
     * 根据用户名 and 状态删除
     *
     * @param userName
     * @param userStatus
     */
    void removeByUserNameAndStatus(@Param("userName") String userName, @Param("status") Integer userStatus);
}
```
对应上面删除方法生成的`SQL`，如下所示：
```sql
-- removeByStatus
DELETE FROM IOT_SYSTEM_USER WHERE SU_STATUS = ?

-- removeByUserNameAndStatus
DELETE FROM IOT_SYSTEM_USER WHERE SU_USER_NAME = ? AND SU_STATUS = ?
```