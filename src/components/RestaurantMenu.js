import { useState, useEffect } from 'react';
import { useParams ,Link} from 'react-router-dom';
import ShimmerMenu from './ShimmerMenu';
import { CDN_URL, MENU_API } from '../utils/constants';
import { FiClock } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import RestaurantCategory from './RestaurantCategory'



const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
 const [showindex,setShowIndex] = useState(null)

  const { resId } = useParams();
 

  useEffect(() => {
    fetchMenu();
  }, []);
   
  const categories = 
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
          c.card?.card?.["@type"] ==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )
  
   console.log(categories)

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json.data);

  };

 
  return (resInfo === null)? <ShimmerMenu /> : (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {resInfo?.cards[2]?.card?.card?.info.cuisines.join(', ')} - {resInfo?.cards[2]?.card?.card?.info.costForTwoMessage}
      </p>
      {/* categories accordions */}
      {categories.map((category , index) => (
        // Controlled Component
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems ={index === showindex?true : false}
          setShowIndex={()=> setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
