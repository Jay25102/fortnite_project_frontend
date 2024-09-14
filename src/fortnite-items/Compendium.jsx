import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayCard from "./DisplayCard";
import Loading from "../common/Loading";
import "./Compendium.css";

const BASE_API = "https://fortniteapi.io/v2/items/list?lang=en";

/**List of all the items ever release in fortnite
 * Unfortunately the api doesn't allow retrieving a selection of items at a timem
 * so the loading is a little slow.
*/
function Compendium() {
    const [allItems, setAllItems] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    console.debug("Compendium");

    useEffect(function fetchAllItemsOnMount() {
        console.debug("fetchAllItemsOnMount Compendium")
        async function fetchAllItems() {
            const items = await axios.get(
                BASE_API, {
                    headers: {
                        "Authorization": import.meta.env.VITE_SOME_KEY
                    }
                }
            );
            setAllItems(items.data.items);
        }
        if (!allItems) {
            fetchAllItems();
        }
    }, []);

    function flipLeft() {
        if (pageNum > 1) setPageNum(pageNum - 1);
    }

    function flipRight() {
        setPageNum(pageNum + 1);
    }

    if (!allItems) {
        return (
            <div>
                <h2>Compendium</h2>
                <Loading/>
            </div>
        )
    }

    return (
        <div>
            <h2>Compendium</h2>
            <div className="compendiumGallery">
                {allItems.slice((pageNum - 1) * 100, pageNum * 100).map((val, idx) => (
                        <DisplayCard 
                            key={idx} 
                            imgURL={val.images.full_background}
                            redirectURL={val.mainId || val.id}
                            itemInfo={val}
                            isCompendium={true}
                        />
                ))}
            </div>
            <div className="pageBtns">
                    <button onClick={flipLeft}>Left</button>
                    {pageNum}
                    <button onClick={flipRight}>Right</button>
                </div>
        </div>
    )
}

export default Compendium;