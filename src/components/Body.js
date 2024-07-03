import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import Loader from "./Loader";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { loggedInUser, setUserName } = useContext(UserContext);
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log("API Response:", json); // Log API response for debugging

      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state or retry logic
    }
  };

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>
        Looks like you're offline! Please check your internet connection.
      </h1>
    );
  }

  if (listOfRestaurants.length === 0) {
    return <Loader />;
  }

  const handleSearch = () => {
    const filteredRestaurant = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filteredRestaurant);
  };

  const handleTopRated = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => parseFloat(res.info.avgRating) > 4
    );
    setFilteredRestaurant(filteredList);
  };

  return (
    <div className="body">
      <div className="flex justify-between">
        <div className="p-4 m-4 search">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              data-testid="searchInput"
              placeholder="Search a restaurant you want..."
              className="px-4 py-2 border-0 border-transparent shadow-md font-medium bg-gray-100 rounded-md focus:border-0 focus:outline-0 w-[300px] placeholder:font-medium focus:border-b-2 focus:border-green-500"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="px-4 py-2 m-4 bg-green-100 rounded-lg shadow-md hover:bg-green-300 duration-[.3s] font-medium"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex items-center p-4 m-4 search">
          <button
            className="px-4 py-2 m-4 bg-gray-100 shadow-md hover:bg-gray-200 duration-[.3s] rounded-lg font-medium"
            onClick={handleTopRated}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="flex items-center p-4 m-4 search">
          <label htmlFor="name" className="font-medium">
            User Name:
          </label>
          <input
            id="name"
            className="px-4 py-2 border-0 border-transparent shadow-md bg-gray-100 rounded-md focus:border-0 focus:outline-0 w-[200px] ml-[20px] focus:border-b-2 focus:border-green-500"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant?.info.id}
            to={"/restaurants/" + restaurant?.info.id}
          >
            {restaurant?.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant?.info} />
            ) : (
              <RestaurantCard resData={restaurant?.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
