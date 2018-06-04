import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ArticleList from './ArticleList';
import Publisher from './Publisher'; 
import { Grid, Label, Dropdown, Input } from 'semantic-ui-react';

class NewsListPage extends Component {
  constructor(props) { 
    super(props); 
    this.state = {
      data: [],
      count: 0,
      // value:'bbc-news'
      value: this.props.default,
      selectedPublisher: {},
      articles: [],
      query: '',
      sort: 'publishedAt'
    };
    this.queryChange = this.queryChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRelevantFromThisPublisher = this.getRelevantFromThisPublisher.bind(this);
    this.apiKey = 'fabf813810044508a72e049672c60937';
    this.apiUrl = `https://newsapi.org/v2/sources?language=en&apiKey=${this.apiKey}`;
  }

  //TO-DO: should be 1 method instead 3
  handleChange(e, data) {
    const value = data.value;
    const selectedPublisher = this.state.data.find(x => x.id === value);
    this.getArticles(value, this.state.query, this.state.sort);
    this.setState({ value, selectedPublisher });
  }

  queryChange(e, data) {
    const value = data.value;
    this.getArticles(this.state.selectedPublisher, value, this.state.sort);
    this.setState({ query: value });
  }

  getRelevantFromThisPublisher(e, data) {
    const sort = 'relevancy';
    this.getArticles(data.source.id, data.title, sort);
    this.setState({ 
      selectedPublisher: data.source , 
      query: data.title, 
      sort 
    });
  }

  getArticles(source, query = '', sort) {
    let apiUrl = `https://newsapi.org/v2/everything?q=${query}&sources=${source}&sortBy=${sort}&apiKey=${this.apiKey}`;
 
    axios.get(apiUrl)
      .then(res => {
        const articles = res.data.articles;
        this.setState({ articles: articles });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() { 
    axios.get(this.apiUrl).then(res => { 
      const data = res.data.sources;
      this.setState({ data, count: data.length });
      const value = this.state.value;
      const selectedPublisher = this.state.data.find(x => x.id === value);
      this.getArticles(value);
      this.setState({ value, selectedPublisher });
    });
  }

  render() {
    const { selectedPublisher, value, data, count, articles } = this.state;
    const options = data.map((item, key) => { 
      return {
        key, 
        value: item.id, 
        text:item.name 
      };
    });

    return (
      <div>
        <Label>Select from {count} News Publishers</Label>
        <Grid columns={3}>
          <Grid.Row className="withTopMargin">
            <Grid.Column>
              <Dropdown placeholder='Filter Publishers' fluid selection options={options} value={value} onChange={this.handleChange}/>
            </Grid.Column>
            <Grid.Column>
              <Input className="maxWidth" placeholder='Search...' onChange={this.queryChange} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Publisher data={selectedPublisher} />
        <ArticleList articles={articles} onChange={this.getRelevantFromThisPublisher} />
      </div>
    );
  }
}

NewsListPage.propTypes = {
  default: PropTypes.string
}

export default NewsListPage;
