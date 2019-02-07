import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';


class CampaignShow extends Component {
  //different props then normal created from routes (address available due to :)
  static async getInitialProps(props) {

    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address:props.query.address,
      minimumContribution:summary[0],
      balance:summary[1],
      requestsCount:summary[2],
      approversCount:summary[3],
      manager:summary[4]

    }
  }

  renderCards(){
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta:'Address of Manager',
        description: 'The manager created this campaign and can create requests to withdraw funds',
        style: {overflowWrap: 'break-word'}
      },
      {
        header:minimumContribution,
        meta:'Minimum Contribution (Wei)',
        description:'You must contribute atleast this amount to become an approver'
      },
      {
        header:requestsCount,
        meta:'Number of Requests',
        description:'A request tries to withdraw money from the campaign. Must be voted for by approvers'
      },
      {
        header:approversCount,
        meta:'Number of Approvers',
        description:'Number of people who have already donated to the campaign'
      },
      {
        header:web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:'the balance is how much money the campaign has left to spend'
      }
    ]

    return <Card.Group items={items} />
  }

  render(){
    return(
      <Layout>
      <h1>Campaign Show</h1>
      <Grid>
        <Grid.Row>
          <Grid.Column width={11}>
            {this.renderCards()}
  
            </Grid.Column>
            <Grid.Column width={5}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${this.props.adress}/requests`}>
              <a>
                <Button primary>View Requests </Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Layout>
    )
  }
}

export default CampaignShow;
