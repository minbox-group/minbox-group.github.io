export default {
  'en-us': {
    sidemenu: [
      {
        title: 'ApiBoot',
        children: [
          {
            title: 'demo1',
            link: '/en-us/docs/demo1.html',
          },
          {
            title: 'demo2',
            link: '/en-us/docs/demo2.html',
          },
          {
            title: 'dir',
            opened: true,
            children: [
              {
                title: 'demo3',
                link: '/en-us/docs/dir/demo3.html',
              },
            ],
          },
        ],
      },
    ],
    barText: 'Documentation',
  },
  'zh-cn': {
    sidemenu: [
      {
        title: 'ApiBoot',
        children: [
          {
            title: 'ApiBoot是什么？',
            opened: true,
            children: [
              {
                title: 'ApiBoot简介',
                link: '/zh-cn/docs/introduce.html',
              },
              {
                title: 'FAQ',
                link: '/zh-cn/docs/faq.html',
              },
              {
                title: '获取最新版本',
                link: 'https://gitee.com/minbox-projects/api-boot/releases',
              }
            ]
          },
          {
            title: '快速开始',
            opened: true,
            children: [
              {
                title: '第一个ApiBoot应用程序',
                link: '/zh-cn/docs/quick-start.html',
              },
              {
                title: '统一固化版本',
                link: '/zh-cn/docs/version-rely.html',
              },
              {
                title: 'ApiBoot组件一览表',
                link: '/zh-cn/docs/component-list.html',
              }
            ]
          },
          {
            title: '开箱即用的组件',
            opened:true,
            children:[
              {
                title:'组件使用前提',
                link: '/zh-cn/docs/component-premise.html'
              },
              {
                title: '远程服务端口代理组件',
                link: '/zh-cn/docs/api-boot-ssh-agent.html'
              },
              {
                title: 'Mongo设置扩展组件',
                link: '/zh-cn/docs/api-boot-mongo-client-settings.html',
              },
              {
                title: '分布式ID组件',
                link: '/zh-cn/docs/api-boot-sequence.html',
              },
              {
                title: '链路日志管理界面',
                link: '/zh-cn/docs/api-boot-logging-admin-ui.html',
              },
              {
                title: '链路日志管理端',
                link: '/zh-cn/docs/api-boot-logging-admin.html',
              },
              {
                title: '分布式链路日志组件',
                link: '/zh-cn/docs/api-boot-logging.html',
              },
              {
                title: 'Spring Security扩展组件',
                link: '/zh-cn/docs/api-boot-security.html',
              },
              {
                title: 'OAuth2扩展组件',
                link: '/zh-cn/docs/api-boot-oauth.html',
              },
              {
                title: 'Swagger2文档组件',
                link: '/zh-cn/docs/api-boot-swagger.html',
              },
              {
                title: '分布式任务调度Quartz扩展组件',
                link: '/zh-cn/docs/api-boot-quartz.html',
              },
              {
                title: '分布式限流组件',
                link: '/zh-cn/docs/api-boot-rate-limiter.html',
              },
              {
                title: '多数据源自动切换组件',
                link: '/zh-cn/docs/api-boot-datasource-switch.html',
              },
              {
                title: 'MyBatis增强扩展组件',
                link: '/zh-cn/docs/api-boot-mybatis-enhance.html',
              },
              {
                title: 'MyBatis增强组件的实体生成器',
                link: '/zh-cn/docs/api-boot-mybatis-enhance-codegen.html',
              },
              {
                title: 'MyBatis自动化分页组件',
                link: '/zh-cn/docs/api-boot-mybatis-pageable.html',
              },
              {
                title: '业务资源分离组件',
                link: '/zh-cn/docs/api-boot-resource-load.html',
              },
              {
                title: 'APP消息推送（极光）扩展组件',
                link: '/zh-cn/docs/api-boot-message-push.html',
              },
              {
                title: 'Http消息转换器（fastjson）扩展组件',
                link: '/zh-cn/docs/api-boot-http-message-converter.html',
              },
              {
                title: '阿里云对象存储开发组件',
                link: '/zh-cn/docs/api-boot-oss.html',
              },
              {
                title: '阿里云邮件服务开发组件',
                link: '/zh-cn/docs/api-boot-mail.html',
              },
              {
                title: '阿里云国际短信开发组件',
                link: '/zh-cn/docs/api-boot-sms.html',
              }
            ]
          },
          {
            title: '运维指南',
            opened: false,
            children: [
              {
                title: '打包部署',
                link: '/zh-cn/docs/deploy.html',
              },
              {
                title: '域名解析',
                link: '/zh-cn/docs/domain.html',
              },
              {
                title: 'Nginx负载均衡',
                link: '/zh-cn/docs/nginx-load-balance.html',
              },
            ]
          },
          {
            title: '开源共建',
            children: [
              {
                title: '贡献源码',
                link: '/zh-cn/docs/contribution.html',
              },
              {
                title: '编码约定',
                link: '/zh-cn/docs/conventions.html',
              },
              {
                title: '新建组件',
                link: '/zh-cn/docs/new-starter.html',
              },
              {
                title: 'ApiBoot规划',
                link: '/zh-cn/docs/api-boot-plan.html',
              }
            ]
          },
        ],
      },
    ],
    barText: 'ApiBoot 文档',
  },
};
