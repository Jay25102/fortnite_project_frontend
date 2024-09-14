import React, { useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./ItemInfoPage.css";
import backendApi from "../../api";

/**
 * Shows item information and allows users to favorite an item.
 * 
 * Since Fortnite is a long running game, the way they store item info
 * has changed slightly over time. The ItemInfoPage has to account for
 * the different variations.
 */
function ItemInfoPage() {
    const { activeUser } = useContext(UserContext);
    const location = useLocation();
    console.debug("ItemInfoPage");
    let itemInfo = location.state.itemInfo;

    let description;
    if (itemInfo.displayDescription) {
        if (itemInfo.displayDescription !== "") {
            description = (
                <div>
                    Description: {itemInfo.displayDescription}
                </div>
            )
        }
    }
    else {
        if (itemInfo.description !== "") {
            description = (
                <div>
                    Description: {itemInfo.description}
                </div>
            )
        }
    }
    

    let granted;
    if (itemInfo.granted) {
        if (itemInfo.granted.length > 1) {
            granted = (
                <div>
                    Item includes: {itemInfo.granted.map((val, idx) => (
                        // come back to this and filter out empty images
                        <img key={idx} src={val.images.full_background}/>
                    ))}
                </div>
            )
        }
    }

    let name;
    if (itemInfo.displayName) {
        name = itemInfo.displayName;
    }
    else {
        name = itemInfo.name;
    }

    let src;
    if (itemInfo.displayAssets) {
        src = itemInfo.displayAssets[0].full_background;
    }
    else {
        src = itemInfo.images.full_background;
    }

    let price;
    if (itemInfo.price.finalPrice) {
        price = itemInfo.price.finalPrice;
    }
    else {
        price = itemInfo.price;
    }

    let releaseDate;
    if (itemInfo.firstReleaseDate) {
        releaseDate = itemInfo.firstReleaseDate;
    }
    else {
        releaseDate = itemInfo.releaseDate;
    }

    let type;
    if (itemInfo.displayType) {
        type = itemInfo.displayType;
    }
    else {
        type = itemInfo.type.name;
    }

    async function addToFavorites() {
        console.debug("ItemInfoPage addToFavorites");
        if (activeUser) {
            const result = await backendApi.addFavorite(
                {
                    username: activeUser.username,
                    itemInfo: itemInfo
                }
            );
            if (!result.success) {
                alert("Please make sure you are logged in and not adding a duplicate");
            }
        }
    }

    let favorites;
    if (activeUser) {
        favorites = (<button onClick={addToFavorites}>Add to Favorites</button>)
    }

    return (
        <div>
            <h1>{name}</h1>
            <img src={src}/>
            <div>
                Cost: {price} <img className="vbuck" src="/src/assets/vbuck.png"/>
            </div>
            {description}
            <div>
                Release date: {releaseDate}
            </div>
            <div>
                Type: {type}
            </div>
            {granted}
            {favorites}
            
        </div>
    )
}

export default ItemInfoPage;