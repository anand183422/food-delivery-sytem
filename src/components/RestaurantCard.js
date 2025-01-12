import { CDN_URL } from '../utils/constants';
import { FiClock } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import UserContext from '../utils/UserContext';
import { useContext } from 'react';
const RestaurantCard = (props) => {
  const { resData } = props;
   console.log("hello")
    console.log(resData);
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo
  } = resData?.info;
  const {logUser} = useContext(UserContext);
  return (
    <div className="m-4 p-4 w-[200px]  bg-gray-100 border-solid rounded-lg  hover:bg-gray-200">
      <div className="">
        <img
          className="rounded-lg"
          src={CDN_URL + cloudinaryImageId}
          alt="Biryani"
        />
      </div>

      <div className=" ">
        <h3 className='font-bold'>{name}</h3>
        <hr />
        <em>{cuisines.join(', ')}</em>
        <h4 className="flex gap-2">
          <span className="icons">
            <AiOutlineStar />
          </span>
          <span>{avgRating} stars</span>
        </h4>
        <h4 className="item-price">{costForTwo}</h4>
        <h4 className="flex gap-2">
          <span className="icons">
            <FiClock />
          </span>
          <span> {resData?.info?.sla?.deliveryTime} minutes</span>
        </h4>
        <h4>{logUser}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
