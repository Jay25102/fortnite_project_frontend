import React, { useState, useRef } from "react";

/**
 * search bar for daily shop page. Uses reference to pass back
 * the value of whatever is in the searchbar to DailyShop
 */
function SearchBar({searchFunc, searchFilter, setSearchFilter}) {
    const searchRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        setSearchFilter(searchRef.current.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    name="searchTerm" 
                    placeholder="Search item" 
                    ref={searchRef}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;