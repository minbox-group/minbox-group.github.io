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
                title: '更新日志',
                link: '/zh-cn/docs/update-log.html',
              }
            ]
          },
          {
            title: 'ApiBoot往期版本文档',
            opened: true,
            children: [
              {
                title: '往期文档说明',
                link: '/zh-cn/docs/history-reference-guide.html',
              },
              {
                title: '2.1.2.RELEASE',
                link: '/zh-cn/docs/2.1.2.RELEASE/reference-guide.html',
              },
              {
                title: '2.1.1.RELEASE',
                link: '/zh-cn/docs/2.1.1.RELEASE/reference-guide.html',
              },
              {
                title: '2.1.0.RELEASE',
                link: '/zh-cn/docs/2.1.0.RELEASE/reference-guide.html',
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
                title: '版本依赖',
                link: '/zh-cn/docs/version-rely.html',
              },
              {
                title: 'ApiBoot Logging Admin',
                link: '/zh-cn/docs/api-boot-logging-admin.html',
              },
              {
                title: 'ApiBoot Logging',
                link: '/zh-cn/docs/api-boot-logging.html',
              },
              {
                title: 'ApiBoot Security',
                link: '/zh-cn/docs/api-boot-security.html',
              },
              {
                title: 'ApiBoot OAuth',
                link: '/zh-cn/docs/api-boot-oauth.html',
              },
              {
                title: 'ApiBoot Swagger',
                link: '/zh-cn/docs/api-boot-swagger.html',
              },
              {
                title: 'ApiBoot Quartz',
                link: '/zh-cn/docs/api-boot-quartz.html',
              },
              {
                title: 'ApiBoot RateLimiter',
                link: '/zh-cn/docs/api-boot-rate-limiter.html',
              },
              {
                title: 'ApiBoot DataSource Switch',
                link: '/zh-cn/docs/api-boot-datasource-switch.html',
              },
              {
                title: 'ApiBoot Mybatis Enhance',
                link: '/zh-cn/docs/api-boot-mybatis-enhance.html',
              },
              {
                title: 'ApiBoot Mybatis Enhance Codegen',
                link: '/zh-cn/docs/api-boot-mybatis-enhance-codegen.html',
              },
              {
                title: 'ApiBoot Mybatis Pageable',
                link: '/zh-cn/docs/api-boot-mybatis-pageable.html',
              },
              {
                title: 'ApiBoot Resource Load',
                link: '/zh-cn/docs/api-boot-resource-load.html',
              },
              {
                title: 'ApiBoot Message Push',
                link: '/zh-cn/docs/api-boot-message-push.html',
              },
              {
                title: 'ApiBoot HttpMessage Converter',
                link: '/zh-cn/docs/api-boot-http-message-converter.html',
              },
              {
                title: 'ApiBoot AliYun OSS',
                link: '/zh-cn/docs/api-boot-oss.html',
              },
              {
                title: 'ApiBoot AliYun Mail',
                link: '/zh-cn/docs/api-boot-mail.html',
              },
              {
                title: 'ApiBoot AliYun SMS',
                link: '/zh-cn/docs/api-boot-sms.html',
              }
            ]
          },
          {
            title: '运维指南',
            opened: true,
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
