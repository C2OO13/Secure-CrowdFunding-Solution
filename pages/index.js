import react, { useState } from 'react';
import campaignFactory from '../ethereum/campaignFactory';
function App({listContracts}){

    // const [contracts, setContracts] = useState([]);
    
    // const getDeployedContracts = async()=>{
    //     const listContracts = await campaignFactory.methods.getDeployedContracts().call();
    //     setContracts(listContracts);
    // };
    
    return( 
        <div>
            {/* <button onClick={getDeployedContracts}>Get contracts</button> */}
            <h3>{listContracts}</h3>
        </div>);
};

export default App;

export const getStaticProps = async()=>{
    const listContracts = await campaignFactory.methods.getDeployedContracts().call();
    return {props:{listContracts}}
};
