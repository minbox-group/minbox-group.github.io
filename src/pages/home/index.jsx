import React from 'react';
import ReactDOM from 'react-dom';
import { getScrollTop, getLink } from '../../../utils';
import Header from '../../components/header';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
import Item from './featureItem';
import homeConfig from '../../../site_config/home';
import './index.scss';
import axios from 'axios';

class Home extends Language {

  constructor(props) {
    super(props);
    this.state = {
      headerType: 'primary',
      apiboot: { stargazers_count: 0, forks_count: 0 }
    };
  }
  componentWillMount() {
    // 加载api-boot项目信息
    axios.get('https://gitee.com/api/v5/search/repositories?q=api-boot&page=1&per_page=1&owner=minbox-projects').then((res) => {
      this.setState({
        apiboot: res.data[0]
      });
    });
  }
  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scrollTop = getScrollTop();
      if (scrollTop > 66) {
        this.setState({
          headerType: 'normal',

        });
      } else {
        this.setState({
          headerType: 'primary',
        });
      }
    });
  }

  render() {
    const language = this.getLanguage();
    const dataSource = homeConfig[language];
    const { headerType, apiboot } = this.state;
    const headerLogo = headerType === 'primary' ? '/img/apiboot-white.png' : '/img/apiboot-colorful.png';
    return (
      <div className="home-page">
        <section className="top-section">
          <Header
            currentKey="home"
            type={headerType}
            logo={headerLogo}
            language={language}
            onLanguageChange={this.onLanguageChange}
          />

          <div className="vertical-middle">
            <img src="/img/apiboot-index-back.png" />
            <div className="product-name">
              <h2>{dataSource.brand.brandName}</h2>
            </div>
            <p className="product-desc">{dataSource.brand.briefIntroduction}</p>
            <div className="button-area">
              {
                // old: dataSource.brand.buttons.map(b => <Button type={b.type} key={b.type} link={b.link} target={b.target}>{b.text}</Button>)
                dataSource.brand.buttons.map(b => <Button type={b.type} link={b.link} target={b.target}>{b.text}</Button>)
              }
            </div>
            <div className="github-buttons">
              <a href="https://gitee.com/minbox-projects/api-boot" target="_blank" rel="noopener noreferrer">
                <div className="star">
                  <img src="https://img.alicdn.com/tfs/TB1FlB1JwHqK1RjSZFPXXcwapXa-32-32.png" />
                  <span className="count">Star | {apiboot.stargazers_count}</span>
                </div>
              </a>
              <a href="https://gitee.com/minbox-projects/api-boot/members" target="_blank" rel="noopener noreferrer">
                <div className="fork">
                  <img src="https://img.alicdn.com/tfs/TB1zbxSJwDqK1RjSZSyXXaxEVXa-32-32.png" />
                  <span className="count">Fork | {apiboot.forks_count}</span>
                </div>
              </a>
            </div>
            <div className="version-note">
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/minbox-projects/api-boot/releases/tag/2.3.5">Release Note of v2.3.5</a>
            </div>
            <div className="release-date">Released on Nov 23, 2021</div>
          </div>

          <div className="animation animation1" />
          <div className="animation animation2" />
          <div className="animation animation3" />
          <div className="animation animation4" />
          <div className="animation animation5" />
        </section>
        {/* <section className="introduction-section">
          <div className="introduction-body">
            <div className="introduction">
              <h3>{dataSource.introduction.title}</h3>
              <p>{dataSource.introduction.desc}</p>
            </div>
            <img src={getLink(dataSource.introduction.img)} />
          </div>
        </section> */}
        <section className="feature-section">
          <h3>{dataSource.features.title}</h3>
          <ul>
            {
              dataSource.features.list.map((feature, i) => (
                <Item feature={feature} key={i} />
              ))
            }
          </ul>
        </section>
        <section className="start-section">
          <div className="start-body">
            <div className="left-part">
              <h3>{dataSource.start.title}</h3>
              <p>{dataSource.start.desc}</p>
              <a href={getLink(dataSource.start.button.link)} target={dataSource.start.button.link || '_self'}>{dataSource.start.button.text}</a>
            </div>
            {/* <div className="right-part"><img src={getLink('/img/api-boot-dependencies.png')} /></div> */}
          </div>
        </section>
        {/* <section className="users-section">
          <h3>{dataSource.users.title}</h3>
          <p>{dataSource.users.desc}</p>
          <div className="users">
            {
              dataSource.users.list.map((user, i) => (
                <img src={getLink(user)} key={i} />
              ))
            }
          </div>
        </section> */}
        <Footer logo="/img/apiboot-gray.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Home />, document.getElementById('root'));

export default Home;
