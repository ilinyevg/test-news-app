import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

class ArticleList extends Component {
  state = {
    articles: []
  };
 
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ 
        articles: nextProps.articles
      }); 
    }
  }

  formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();
    return  `${month}/${day}/${year}`; 
  }

  render() {
    const { articles } = this.state;
    return (
      <Card.Group itemsPerRow={4}>
        {articles.map((item, i) => {
          return (
            <Card key={i}>
              <Image src={item.urlToImage} as='a' size='medium' href={item.url} />
              <Card.Content>
                <Card.Header>{item.title}</Card.Header>
                <Card.Meta>
                  <span className='date'>{this.formatDate(item.publishedAt)}</span>
                </Card.Meta>
                <Card.Description>{item.description}</Card.Description>
              </Card.Content>
              <Card.Content extra> 
                  <Icon name='user' /> 
                  <p>
                    By <i>{item.author ? item.author : ''}</i>
                  </p>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    );
  }
}

export default ArticleList