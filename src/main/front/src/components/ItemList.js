import React from 'react';
import {Link} from "react-router-dom";

function ItemList({itemList, error}) {

    if (error && itemList.length === 0) {
        return <div>Error : {error}</div>
    }

    return (
        <div className="container">
            <div className="row">
                {Object.values(itemList).map(item => (
                    <div className="col-md-4" key={item.id}>
                        <img src={`https://codingapple1.github.io/shop/${item.img}.jpg`} width={"80%"}/>
                        <h4>
                            <Link to={`/detail/${item.id}`}>
                                {item.title}
                            </Link>
                        </h4>
                        <p>{item.content}</p>
                        <p>{item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemList;