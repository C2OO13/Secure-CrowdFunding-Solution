import react, { useState } from 'react';
import campaignFactory from '../ethereum/campaignFactory';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Layout from "../components/Layout";

function App({listContracts}){

    // const [contracts, setContracts] = useState([]);
    
    // const getDeployedContracts = async()=>{
    //     const listContracts = await campaignFactory.methods.getDeployedContracts().call();
    //     setContracts(listContracts);
    // };
    
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
            <div>
                <Card.Group items={items} />
            </div>
            <div>
                <Button content='Create Campaign' icon='add' labelPosition='right' primary />
            </div>
        </Layout>
    );
};

export default App;

export const getStaticProps = async()=>{
    const listContracts = await campaignFactory.methods.getDeployedContracts().call();
    return {props:{listContracts}}
};
