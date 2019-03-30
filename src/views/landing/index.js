import React from 'react';
import { Grid, Button, Icon} from 'semantic-ui-react'

export default function Landing() {
    return <Grid columns={2} divided>
    <Grid.Row>
      <Grid.Column>
      <Button animated>
      <Button.Content visible>Provider</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
      
      </Grid.Column>
      <Grid.Column>
      <Button animated>
      <Button.Content visible>Recipient</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
       
      </Grid.Column>
    </Grid.Row>
  </Grid>
}