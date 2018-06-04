import React, { Component } from 'react'; 
import { Header } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return (
      <div className="page_footer">  
          <Header as='h2'>News app</Header>
          <Header as='h5'>Powered by <a href="https://newsapi.org/"> News API </a></Header>
      </div>
    );
  }
}

export default Footer;
