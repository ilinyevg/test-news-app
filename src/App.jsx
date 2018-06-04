import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react'
import NewsPage from './components/NewsPage';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header className="page_header" as='h2'>News app</Header>
        <Container textAlign="center"> 
          <NewsPage default="bbc-news"/>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default App;