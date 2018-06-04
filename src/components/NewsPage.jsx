import React, { Component } from 'react';
import axios from 'axios';
import ArticleList from './ArticleList';
import Publisher from './Publisher'; 
import { Grid, Label, Dropdown, Input } from 'semantic-ui-react';

class NewsPage extends Component {
  constructor(props) { 
    super(props); 
    this.state = {
      data: [],
      count: 0,
      // value:'bbc-news'
      value: this.props.default,
      selectedPublisher: {},
      articles: [],
      query: ''
    };
    this.queryChange = this.queryChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.apiKey = 'fabf813810044508a72e049672c60937';
    this.apiUrl = `https://newsapi.org/v2/sources?language=en&apiKey=${this.apiKey}`;
  }

  handleChange(e, data) {
    const value = data.value;
    const selectedPublisher = this.state.data.find(x => x.id === value);
    this.getArticles(value, this.state.query);
    this.setState({ value, selectedPublisher });
  }

  queryChange(e, data) {
    const value = data.value;
    this.getArticles(this.state.selectedPublisher, value);
    this.setState({ query: value });
  }

  getArticles(source, query = '') {
    let apiUrl = `https://newsapi.org/v2/everything?q=${query}&sources=${source}&apiKey=${this.apiKey}`;

    // Make HTTP reques with Axios
    axios.get(apiUrl)
      .then(res => {
        const articles = res.data.articles;
        // Set state with result
        console.log(articles);
        this.setState({ articles: articles });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    // Make HTTP reques with Axios
    axios.get(this.apiUrl).then(res => {
      // Set state with result
      const data = res.data.sources;
      this.setState({ data, count: data.length }); 
      //console.log(this.state.value);
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
        <ArticleList articles={articles} />
      </div>
    );
  }
}

export default NewsPage;
