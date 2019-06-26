import React, {Component} from 'react';
import { Layout} from 'antd';
import Navigation from './components/Navigation';
import FooterBottom from './components/FooterBottom';
import Routes from './routes';
import 'antd/dist/antd.css';
import HeaderSlide from './components/HeaderSlide';

const { Footer, Content } = Layout;


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="App">
        <HeaderSlide />
        <Layout>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              <Routes />
            </div>
          </Content>
          <FooterBottom />
        </Layout>
      </div>
    );
  }
}

export default App;