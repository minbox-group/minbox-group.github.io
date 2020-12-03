---
title: 组件使用前提
---

## 组件使用注意事项

我们在`SpringBoot`构建的项目中可以直接使用`ApiBoot`提供的组件列表（`Starter List`）。

在使用之前需要先引用统一固化版本依赖（目前仅支持Maven），添加后我们使用`ApiBoot Starter`时可以不用指定具体的版本号。

**配置如下所示：**

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

> `ApiBoot`每次**发布版本**都会将全部的依赖上传到`Apache Maven Central`，所以我们在[https://search.maven.org](https://search.maven.org/)内可以检索到的，该网站同步Apache Maven Central的依赖是需要时间的，所以新版本发布后需要等待一段时间后才可以检索到。

**ApiBoot最新版本检索：**

[https://search.maven.org/artifact/org.minbox.framework/api-boot-dependencies](https://search.maven.org/artifact/org.minbox.framework/api-boot-dependencies)