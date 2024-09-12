import React, { useEffect, useState, useContext, act } from "react";
import UserContext from "../context/UserContext";
import backendApi from "../../api";
import Loading from "../common/Loading";
import DisplayCard from "../fortnite-items/DisplayCard";

/**
 * This page is the user's profile and renders displayCard components based on
 * what items the user has favorited.
 */
function UserInfo() {
    const {activeUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [favoritedItems, setFavoritedItems] = useState([]);

    // when loading page, retrieve all wishlist items from db under this username
    useEffect(function() {
        setLoading(true);
        // use backendapi to make a call and pass in username
        async function fetchUserFavoritesOnMount() {
            const result = await backendApi.getFavorites(activeUser.username);
            for (let i = 0; i < result.length; i++) {
                setFavoritedItems(oldItems => [...oldItems, JSON.parse(result[i].item)]);
            }
        }
        fetchUserFavoritesOnMount();
        setLoading(false);
    }, [activeUser.username]);

    if (loading) return <Loading/>

    return (
        <div>
            <div>Favorited Items: </div>
            {favoritedItems.map((val, idx) => (
                    <DisplayCard 
                        key={idx} 
                        imgURL={val.displayAssets[0].full_background}
                        redirectURL={val.mainId}
                        itemInfo={val}
                    />
                ))}
        </div>
    )
}

export default UserInfo;