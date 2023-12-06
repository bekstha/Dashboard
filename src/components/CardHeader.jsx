
const CardHeader = ({ dish, price }) => {
    return (
      <div className="flex justify-between gap-10 mb-2">
        <div><h2 className="text-xs sm:text-sm md:text-base font-semibold capitalize">{dish}</h2></div>
        <div><h2 className="text-xs sm:text-sm md:text-base font-semibold">{price}</h2></div>
      </div>
    );
  };
  
  export default CardHeader;