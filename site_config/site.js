// 全局的一些配置
export default {
  rootPath: '', // 发布到服务器的根目录，需以/开头但不能有尾/，如果只有/，请填写空字符串
  port: 8080, // 本地开发服务器的启动端口
  // domain: 'apiboot.yuqiyu.com', // 站点部署域名，无需协议和path等
  defaultSearch: 'google', // 默认搜索引擎，baidu或者google
  defaultLanguage: 'zh-cn',
  'en-us': {
    pageMenu: [
      {
        key: 'home', // 用作顶部菜单的选中
        text: 'HOME',
        link: '/en-us/index.html',
      },
      {
        key: 'docs',
        text: 'DOCS',
        link: '/en-us/docs/quick-start.html',
      },
    ],
    disclaimer: {
      title: 'vision',
      content: 'ApiBoot is dedicated to rapid development of interface services and integration of third-party dependencies',
    },
    documentation: {
      title: 'Documentation',
      list: [
        {
          text: 'Overview',
          link: '/en-us/docs/introduce.html',
        },
        {
          text: 'Quick start',
          link: '/en-us/docs/quick-start.html',
        },
        {
          text: 'Developer guide',
          link: '/en-us/docs/faq.html',
        },
      ],
    },
    resources: {
      title: 'Resources',
      list: [
        {
          text: 'Author Blog',
          link: 'http://blog.yuqiyu.com',
        },
        {
          text: 'Article Topic',
          link: 'http://blog.yuqiyu.com/tags/ApiBoot/',
        },
      ],
    },
    copyright: 'Copyright © 2019 恒宇少年 - 于起宇',
  },
  'zh-cn': {
    pageMenu: [
      {
        key: 'home',
        text: '首页',
        link: '/zh-cn/index.html',
      },
      {
        key: 'blog',
        text: '作者博客',
        link: 'http://blog.yuqiyu.com',
      },
      {
        key: 'docs',
        text: '文档',
        link: '/zh-cn/docs/quick-start.html',
      }
    ],
    disclaimer: {
      title: '愿景',
      content: 'ApiBoot致力于解决快速开发接口服务、集成第三方依赖',
    },
    documentation: {
      title: '文档',
      list: [
        {
          text: '概览',
          link: '/zh-cn/docs/introduce.html',
        },
        {
          text: '快速开始',
          link: '/zh-cn/docs/quick-start.html',
        },
        {
          text: '开发者指南',
          link: '/zh-cn/docs/faq.html',
        },
      ],
    },
    resources: {
      title: '资源',
      list: [
        {
          text: '作者博客',
          link: 'http://blog.yuqiyu.com',
        },
        {
          text: '文章专题',
          link: 'http://blog.yuqiyu.com/tags/ApiBoot/',
        },
      ],
    },
    copyright: 'Copyright © 2019 恒宇少年 - 于起宇',
  },
};
