import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Item from "../components/Item";

const LunchMenu = () => {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let today = weekday[d.getDay()];

  return (
    <div className="flex justify-center">
      <div className='border w-full m-5 bg-gray-200'>
        <div className='flex-col justify-center'>
          <div className='flex justify-between m-5 p-2'>
              <span className='font-bold text-3xl'>{today}</span>
              <div className='flex items-center gap-3'>
                <FaPlus />
                <span>add a new item</span>
              </div>
          </div>
          <div className='bg-white m-5 rounded-lg'>
            <Item />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LunchMenu