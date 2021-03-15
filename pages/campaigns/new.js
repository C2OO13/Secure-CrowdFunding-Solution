import React, { useEffect, useState } from 'react';
import { Form, Message } from 'semantic-ui-react';
import Layout from "../../components/Layout";
import campaignFactory from "../../ethereum/campaignFactory";
import web3 from '../../ethereum/web3';

function newCampaign(){

    const [minContribution, setMinContribution] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loadingState, setLoadingState] = useState(false);

    const changeContribution = (e)=>{
        setMinContribution(e.target.value);
    };
    

    const createCampaign = async(e)=>{
        e.preventDefault();
        setErrorMsg('');
        setLoadingState(true);
        try{
            const accounts = await web3.eth.getAccounts();
            await campaignFactory.methods.createCampaign(minContribution).send({
                from: accounts[0]
            });
        }catch(err){
            setErrorMsg(err.message);
        }
        setLoadingState(false);
    };

    return(
        <Layout>
            <h2>Create a Campaign</h2>
            <Form size="large" onSubmit={createCampaign} error={!!errorMsg}> 
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Minimum Contribution(in wei)' placeholder='100' value={minContribution} onChange={changeContribution}/>
                </Form.Group>    
                <Message error header="Opps!" content={errorMsg}/>
                <Form.Button primary loading={loadingState}>Create</Form.Button>
            </Form>
        </Layout>
    );
}

export default newCampaign;