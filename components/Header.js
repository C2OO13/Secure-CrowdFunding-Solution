import React from 'react';
import {Menu, Input, Icon} from 'semantic-ui-react';

const header = ()=>{
    return(
        <Menu>
            <Menu.Item name='SecureCrowd' />
            <Menu.Item>
                <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item name='Campaigns' />
                <Menu.Item>
                    <Icon link name='add' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default header;