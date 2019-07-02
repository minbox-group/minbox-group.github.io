---
title: 创建你的第一个ApiBoot应用程序
---
`ApiBoot`是一系列的第三方服务依赖，基础的项目还是采用`SpringBoot`方式进行构建，集成`ApiBoot`步骤如下

## 1. 创建SpringBoot项目

创建`SpringBoot`项目有多种，简单介绍两种方式：

- `https://start.spring.io/`
- `idea开发工具创建Spring Initializr项目`
- ...

## 2. 添加ApiBoot版本控制

`SpringBoot`项目创建完成我们需要添加`ApiBoot`的版本控制，这样我们就可以像`SpringBoot`、`SpringCloud`在添加依赖时不用配置`version`，有利于我们做版本统一维护。

`ApiBoot`版本依赖需要添加在`pom.xml`配置文件内，如下所示：

```xml
<!--ApiBoot 版本依赖-->
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.minbox.framework</groupId>
      <artifactId>api-boot-dependencies</artifactId>
      <version>{lastVersion}</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
  </dependencies>
</dependencyManagement>
```

> 可以从`Maven Centerl`查询最新的`ApiBoot`版本来替换`{lastVersion}`。
>
> 查询地址：https://search.maven.org/search?q=a:api-boot-dependencies

到这里我们就已经完成了`ApiBoot`的基础集成，是不是特别简单？

## 3. 开箱即用

那接下来就根据具体的需求来选择使用`ApiBoot`提供的封装依赖了，比如你需要集成`swagger`文档，那么就可以添加如下依赖到`pom.xml`文件内：

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <!--ApiBoot Swagger-->
  <dependency>
    <groupId>org.minbox.framework</groupId>
    <artifactId>api-boot-starter-swagger</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
```

依赖添加完成后根据具体的`组件使用文档`来进行配置参数以及接口实现等。

详情参考左侧菜单`集成组件`。