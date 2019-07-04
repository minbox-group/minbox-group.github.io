import React from 'react';

export default {
  'zh-cn': {
    brand: {
      brandName: 'ApiBoot',
      briefIntroduction: 'ApiBoot™ 基于SpringBoot为接口服务而生，组件化Api的首选落地解决方案',
      buttons: [
        {
          text: '使用手册',
          link: '/zh-cn/docs/quick-start.html',
          type: 'primary',
        },
        {
          text: '前往 码云',
          link: 'https://gitee.com/hengboy/api-boot',
          type: 'normal',
        }
      ],
    },
    introduction: {
      title: '开源产品的介绍',
      desc: '开源产品的简单介绍，提供一些该产品的优点、特性描述等',
      img: '/img/architecture.png',
    },
    features: {
      title: '特性一览',
      list: [
        {
          img: '/img/feature_transpart.png',
          title: '组件化',
          content: 'ApiBoot对应集成依赖独立组件化存在',
        },
        {
          img: '/img/feature_loadbalances.png',
          title: '灵活性',
          content: 'ApiBoot提供针对第三方依赖特性的封装',
        },
        {
          img: '/img/feature_service.png',
          title: '可扩展性',
          content: '遵循里氏替换原则',
        },
        {
          img: '/img/feature_hogh.png',
          title: '配置简洁',
          content: '多配置、少编码',
        }
      ],
    },
    start: {
      title: '快速开始',
      desc: '开始创建你的第一个ApiBoot接口服务',
      img: '/img/api-boot-dependencies.png',
      button: {
        text: '阅读更多',
        link: '/zh-cn/docs/quick-start.html',
      },
    },
    users: {
      title: '用户',
      desc: <span>目前接入ApiBoot的企业用户信息</span>,
      list: [
        '/img/users_alibaba.png',
      ],
    },
  },
  'en-us': {
    brand: {
      brandName: 'ApiBoot',
      briefIntroduction: 'ApiBoot™ is based on SpringBoot for interface services, the preferred solution for component Api',
      buttons: [
        {
          text: 'Quick Start',
          link: '/en-us/docs/quick-start.html',
          type: 'primary',
        },
        {
          text: 'View on Gitee',
          link: 'https://gitee.com/hengboy/api-boot',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: 'Introduction of Open Source Products',
      desc: 'some introduction of your product',
      img: '/img/architecture.png',
    },
    features: {
      title: 'Feature List',
      list: [
        {
          img: '/img/feature_transpart.png',
          title: 'Componentization',
          content: 'ApiBoot corresponds to independent component existence of integration dependencies',
        },
        {
          img: '/img/feature_loadbalances.png',
          title: 'Flexibility',
          content: 'ApiBoot provides encapsulation for third-party dependency features',
        },
        {
          img: '/img/feature_service.png',
          title: 'Scalability',
          content: 'Following Richter Replacement Principle',
        },
        {
          img: '/img/feature_hogh.png',
          title: 'Configuration is concise',
          content: 'Multiple Configuration and Less Coding',
        }
      ]
    },
    start: {
      title: 'Quick start',
      desc: 'Start creating your first ApiBoot interface service',
      img: '/img/api-boot-dependencies.png',
      button: {
        text: 'READ MORE',
        link: '/en-us/docs/quick-start.html',
      },
    },
    users: {
      title: 'users',
      desc: <span>some description</span>,
      list: [
        '/img/users_alibaba.png',
      ],
    },
  },
};
