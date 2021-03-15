import react, { useState } from 'react';
import campaignFactory from '../ethereum/campaignFactory';
import { Card, Button } from 'semantic-ui-react';
import Layout from "../components/Layout";

function App({listContracts}){

    const items = listContracts.map(address=>{
        return{
            header: address,
            description: <a>View Campaign</a>,
            fluid: true        
        }
    });

    return( 
        <Layout>
            <h2>Open Campaigns</h2>
            <Button content='Create Campaign' icon='add' labelPosition='right' primary floated="right" />
            <Card.Group items={items} />    
        </Layout>
    );
};

export default App;

export const getStaticProps = async()=>{
    const listContracts = await campaignFactory.methods.getDeployedContracts().call();
    return {props:{listContracts}}
};
