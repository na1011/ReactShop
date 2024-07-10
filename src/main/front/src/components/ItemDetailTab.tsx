import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import navData from '../assets/detailNavList.json';
import TabContent from './TabContent';

const ItemDetailTab: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<number>(0);

    const switchTab = (num: number): void => {
        setCurrentTab(num);
    };

    return (
        <div>
            <Nav variant={'tabs'} defaultActiveKey={'link0'}>
                {navData.navList.map((menu) => (
                    <Nav.Item key={menu.id}>
                        <Nav.Link
                            eventKey={`link${menu.id}`}
                            onClick={(): void => switchTab(menu.id)}
                        >
                            {menu.name}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            <TabContent tabNum={currentTab} />
        </div>
    );
};

export default ItemDetailTab;
