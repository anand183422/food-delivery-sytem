import { CDN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/CartSlice';
import { removeItem } from '../utils/CartSlice';
const ItemList = ( {items , data}) => {
  const dispatch = useDispatch()
    const handel =(item)=>{
       dispatch(addItem(item))
    }
    const hand =(index)=>{
      dispatch(removeItem(index))
    }
    console.log(data)
  return (
    <div>
      {items.map((item,index) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
                {console.log(item.card.info.name)}
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              {(!data)?
              <button className="p-2 ml-6 mt-[70px] rounded-lg bg-black text-white shadow-lg hover:bg-white  hover:text-black transition-all duration-[.3s]"
              onClick={()=>handel(item)}>
                Add +
              </button> 
              :
              <button className="p-2 ml-6 mt-[70px] rounded-lg bg-black text-white shadow-lg hover:bg-white  hover:text-black transition-all duration-[.3s]"
              onClick={()=>hand(index)}>
                Remove -
              </button>
              
}
            </div>
            <img
              src={CDN_URL + item.card.info.imageId}
              alt={item.card.info.name}
              className="w-full rounded-md"
            />
          </div>
        </div>
      )
    )
    }  
    </div>
    ) 
  };
    
   

export default ItemList;
