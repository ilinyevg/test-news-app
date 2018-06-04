import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

class Publisher extends Component {
  state = {
    data: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ data: nextProps.data }); 
    }
  }

  render() {
    const { data } = this.state;
    return (
      <Card centered > 
        <Card.Content>
          <Card.Header as='a'>{data.name}</Card.Header>
          <Card.Meta>Description</Card.Meta>
          <Card.Description>
            {data.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default Publisher;
