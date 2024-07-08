import React, {useState} from 'react';
import {Nav} from "react-bootstrap";
import navData from "../assets/detailNavList.json";
import TabContent from "./TabContent";

function ItemDetailTab(props) {

    const [currentTab, setCurrentTab] = useState(0);

    const switchTab = (num) => {
        setCurrentTab(num);
    }

    return (
        <div>
            <Nav variant="tabs" defaultActiveKey="link0">
                {navData.navList.map((menu => (
                    <Nav.Item key={menu.id}>
                        <Nav.Link eventKey={`link${menu.id}`}
                                  onClick={() => switchTab(menu.id)}>{menu.name}</Nav.Link>
                    </Nav.Item>)))}
            </Nav>
            <TabContent tabNum={currentTab} />
        </div>
    );
}

export default ItemDetailTab;