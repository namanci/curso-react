import React from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({title}) => {
    const {catid} = useParams()
    return (
        <div className="uk-container uk-margin">
            <h1 className="uk-heading-bullet">{title}</h1>
            <ItemList category={catid}/>
        </div>
    )
}

export default ItemListContainer;