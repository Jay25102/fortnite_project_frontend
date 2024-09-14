import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DisplayCard.css";

/**
 * Card component for displaying fortnite items on the webpage.
 * Clicking on a DisplayCard will redirect to the item's ItemInfoPage
 */
function DisplayCard({imgURL, redirectURL, itemInfo, isCompendium}) {
    const navigate = useNavigate();
    // console.debug("DisplayCard", "imgURL=", imgURL, "redirectURL=", redirectURL, "itemInfo=", itemInfo);

    function navToItemInfo() {
        navigate(`/item/${redirectURL}`, {
            state: {
                itemInfo: itemInfo,
                isCompendium: isCompendium
            }
        });
    }

    return (
        <div className="displayCard card" onClick={navToItemInfo} role="button">
            <img className="card-img" src={imgURL}/>
        </div>
    )
}

export default DisplayCard;