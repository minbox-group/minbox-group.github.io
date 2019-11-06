---
title: ApiBoot - 版本依赖
---
## ApiBoot Dependencies 

`ApiBoot`在设计初期借鉴了`SpringBoot`的目录层级以及整体版本维护，因后期`ApiBoot`会添加很多第三方依赖，而每个依赖都会进行版本升级，正因为如此`ApiBoot`独立创建了一个单独的模块`api-boot-dependencies`用于统一管理各个`第三方依赖`、`ApiBoot Starter`、`ApiBoot Plugin`等版本信息，方便后期统一升级。

### 1. 内置SpringBoot 版本依赖
`api-boot-denpendencies`内置了最新版本的`spring-boot-dependencies`，如下所示：
```xml
<!--版本号属性配置-->
<properties>
    <spring.boot.version>2.1.9.RELEASE</spring.boot.version>
</properties>
<!--SpringBoot Dependencies-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>${spring.boot.version}</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

### 2. 获取最新版本ApiBoot版本依赖

`ApiBoot`每一个版本都会上传到`Maven Centerl`中央仓库，搜索最新版本的`ApiBoot`，访问
<a href="https://search.maven.org/search?q=g:org.minbox.framework%20AND%20a:api-boot-dependencies" target="_blank">获取最新版本ApiBoot</a>

### 3. 在你的SpringBoot项目内添加ApiBoot依赖
我们在使用`ApiBoot`时必不可少的一步就是添加`ApiBoot`的版本依赖，这样我们在使用`ApiBoot Starter`时就不需要再对应配置`version`版本内容，添加依赖到`pom.xml`配置文件如下所示：
```xml
<dependencyManagement>
    <dependencies>
        <!--ApiBoot版本依赖-->
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
> 将`{lastVersion}`替换为最新版本的`ApiBoot`版本号即可。
