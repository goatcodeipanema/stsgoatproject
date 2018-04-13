import React, { Component } from 'react';
import { CardSection, Button, Input, TextArea, Card } from './common';

class QuestCreateName extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Quest"
            placeholder="My first goat quest"
          />
        </CardSection>

        <CardSection>
          <TextArea
            label="Description"
            placeholder="pelle svanslös blablablabla.."
            numberOfLines={10}
          />

        </CardSection>

        <CardSection>

          <Button>Press to go to map</Button>
        </CardSection>
      </Card>
    );
  }
}
export default QuestCreateName;
