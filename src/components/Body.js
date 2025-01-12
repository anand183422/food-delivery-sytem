import { useEffect, useState ,lazy} from 'react';
//import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';


const RestaurantCard = lazy(()=> import("./RestaurantCard"));

const Body = () => {
  // * React Hook -> A normal JavaScript function which is given to us by React (or) Normal JS utility functions
  // * useState() - Super Powerful variable
  // * useEffect() -

  // * State Variable - Super Powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState('');

  // * Whenever a state variable updates or changes, react triggers a reconciliation cycle(re-renders the component)
  // console.log('Body rendered');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=21.0076578&lng=75.5626039&carousel=true&third_party_vendor=1'
    );
    //const json = fetch("orderdata.json");
    const json = await data.json();

    console.log(json);
    // * optional chaining
    // setListOfRestaurants(json.data.cards[2].data.data.cards);
    setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    console.log(listOfRestaurants);
  };

    const onlineStatus = useOnlineStatus()

    if(!onlineStatus){
      return <h1>please check network connection ........</h1>
    }
  

  return (!listOfRestaurants || listOfRestaurants.length === 0) ?
    <Shimmer />
  : (
    <div className="body">
      {/* <div className="search-container">
        <input type="text" placeholder="Search Food or Restaurant" />
        <button>Search</button>
      </div> */}
      <div className="flex justify-between">
        <div className="p-4 m-4 search">
          <input
            type="text"
            placeholder="Search a restaurant you want..."
            className="px-4 py-2 border border-transparent shadow-md font-medium bg-gray-100 rounded-md focus:border-0 focus:outline-0 w-[300px] placeholder:font-medium focus:border-b-2 focus:border-green-500"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className='px-4 py-2 m-4 bg-green-100 rounded-lg shadow-md hover:bg-green-300 duration-[.3s] font-medium'
            onClick={() => {
              // * Filter the restaurant cards and update the UI
              // * searchText
              console.log(searchText);

              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="px-4 py-2 m-4 bg-gray-100 shadow-md hover:bg-gray-200 duration-[.3s] rounded-lg font-medium"
          onClick={() => {
            // * Filter logic
            const filteredList = listOfRestaurants.filter(
              (res) => parseFloat(res.info.avgRating) > 4
            );

            setFilteredRestaurant(filteredList);
            console.log(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="flex flex-wrap p-4 m-4">
        {/* // * looping through the <RestaurentCard /> components Using Array.map() method */}

        {filteredRestaurant.map((restaurant) => (
          <Link
            style={{
              textDecoration: 'none',
              color: '#000',
            }}
            key={restaurant.info.id}
            to={'/restaurants/' + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
