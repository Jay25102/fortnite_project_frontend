import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayCard from "./DisplayCard";
import Loading from "../common/Loading";
import SearchBar from "../common/SearchBar";
import "./DailyShop.css";

const BASE_API = "https://fortniteapi.io/v2/shop?lang=en";

/**
 * Shows the items from the daily-refreshing fornite shop.
 * 
 * The api is called on load and filteredItems state is used to
 * keep track of what the user is searching. DisplayCards are rendered
 * for each item which will redirect the user to the item's info page.
 */
function DailyShop() {
    const [dailyShopItems, setDailyShopItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(dailyShopItems);
    const [searchFilter, setSearchFilter] = useState("");
    console.debug("DailyShop");

    useEffect(function fetchDailyShopItemsOnMount() {
        async function fetchDailyShopItems() {
            console.debug("DailyShop useEffect fetchDailyShopItems");
            const items = await axios.get(
                BASE_API, {
                    headers: {
                        "Authorization": import.meta.env.VITE_SOME_KEY
                    }
                }
            );
            setDailyShopItems(items.data.shop);
        }
        fetchDailyShopItems();
        
    }, []);
        
    // filter items when data comes back from the api
    useEffect(function filterItemsOnMount() {
        if (!searchFilter) {
            setFilteredItems(dailyShopItems);
        }
        let tempItems = dailyShopItems.filter((item) => item.displayName.toLowerCase().includes(searchFilter.toLowerCase()));
        setFilteredItems(tempItems);
    }, [searchFilter, dailyShopItems]);

    if (!dailyShopItems) {
        return (
            <div>
                <Loading/>
            </div>
        )
    }

    return (
        <div>
            <h2>Daily Shop</h2>
            <SearchBar searchFilter={searchFilter} setSearchFilter={setSearchFilter}/>
            <div className="dailyShopGallery">
                {filteredItems.map((val, idx) => (
                    <DisplayCard 
                        key={idx} 
                        imgURL={val.displayAssets[0].full_background}
                        redirectURL={val.mainId}
                        itemInfo={val}
                        isCompendium={false}
                    />
                ))}
            </div>
        </div>
    )
}

export default DailyShop;