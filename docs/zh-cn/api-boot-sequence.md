---
title: ApiBoot Sequence 使用文档
---
## ApiBoot Sequence
`ApiBoot`内整合了分布式高效的ID生成方式，基于Twitter的Snowflake算法实现分布式高效有序ID生产黑科技。

> 该组件在`v2.2.5`版本后新增。

## 1. 添加依赖组件

在`pom.xml`配置文件内添加如下：

```xml
<!--ApiBoot Sequence-->
<dependency>
	<groupId>org.minbox.framework</groupId>
	<artifactId>api-boot-starter-sequence</artifactId>
</dependency>
```
> 注意：如果未添加`ApiBoot`版本依赖，请访问[版本依赖](/zh-cn/docs/version-rely.html)查看添加方式。

## 2. 特性
1. 支持自定义允许时间回拨的范围
2. 解决跨毫秒起始值每次为0开始的情况（避免末尾必定为偶数，而不便于取余使用问题）
3. 解决高并发场景中获取时间戳性能问题
4. 支撑根据IP末尾数据作为workerId
5. 时间回拨方案思考：1024个节点中分配10个点作为时间回拨序号（连续10次时间回拨的概率较小）

## 3. 配置数据中心编号
`ApiBoot Sequence`内提供了配置**数据中心编号**的参数，如下所示：
```yaml
api:
    boot:
        sequence:
            # 数据中心的编号，默认值为：1，取值的范围：0 ~ 3
            data-center-id: 0
```


## 4. 配置工作机器编号

`ApiBoot Sequence`内提供了配置**工作机器编号**的参数，可以指定运行的机器编号，如下所示：

```yaml
api:
    boot:
        sequence:
            # 工作机器的编号，默认值为1，取值的范围：0 ~ 255
            worker-id: 2
```



## 5. ApiBootSequenceContext

`ApiBootSequenceContext`是由`ApiBoot Sequence`提供的生成ID的封装类，该类在`org.minbox.framework.api.boot.autoconfigure.sequence.ApiBootSequenceAutoConfiguration`自动化配置中进行实例化并加入了`Spring IOC`，所以我们如果在项目中使用，直接注入即可，如下所示：

```java
/**
  * 注入ApiBoot提供的分布式ID生成类
  * <p>
  * 调用{@link ApiBootSequenceContext#nextId()}、{@link ApiBootSequenceContext#nextStringId()}方法可以直接获取ID
  */
@Autowired
private ApiBootSequenceContext apiBootSequenceContext;
```



## 6. 获取ID

在`ApiBootSequenceContext`内提供了两个获取下一个**ID**的方法，如下所示：

```java
/**
  * 获取下一个分布式ID的值
  * <p>
  * 返回{@link String}类型的值
  *
  * @return 下一个ID的值
  */
public String nextStringId() {
  return String.valueOf(this.nextId());
}

/**
  * 获取下一个分布式ID的值
  * <p>
  * 返回{@link Long} 类型的值
  *
  * @return 下一个ID的值
  */
public Long nextId() {
  return this.sequence.nextId();
}
```

使用示例：

```java
// 获取下一个String类型的ID
String nextId = apiBootSequenceContext.nextStringId();
// 获取下一个Long类型的ID
Long nextLongId = apiBootSequenceContext.nextId();
// 输出结果：289894597327331328,289894597327331329
System.out.println(nextId + "," + nextLongId);
```

