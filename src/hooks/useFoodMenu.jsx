import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

function useFoodMenu() {
  const [starters, setStarters] = useState([]);
  const [chickenDish, setChickenDish] = useState([]);
  const [lambDish, setLambDish] = useState([]);
  const [vegDish, setVegDish] = useState([]);
  const [tandoorDish, setTandoorDish] = useState([]);
  const [veganFood, setVeganFood] = useState([]);
  const [lunchItem, setLunchItem] = useState([]);

  const lunchMenuRef = collection(db, "LunchMenu");
  const aLaCarteRef = collection(db, "A_La_Carte1");

  useEffect(() => {
    getLunchList();
    getFoodList();
  }, []);

  const getLunchList = async () => {
    try {
      const food = await getDocs(lunchMenuRef);
      const filteredFood = food.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLunchItem(filteredFood)

    } catch (error) {
      console.error(error);
    }
  };

  const getFoodList = async () => {
    try {
      const food = await getDocs(aLaCarteRef);
      const filteredFood = food.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Filter food items where starter is true
      const startersOnly = filteredFood.filter((item) => item.starter === true);
      setStarters(startersOnly);

      //Filter food items where chicken is true
      const chickenDishOnly = filteredFood.filter(
        (item) => item.chicken_dish === true
      );
      setChickenDish(chickenDishOnly);

      //Filter food items where lamb is true
      const lambDishOnly = filteredFood.filter(
        (item) => item.lamb_dish === true
      );
      setLambDish(lambDishOnly);

      //Filter food items where Vegetarian is true
      const vegDishOnly = filteredFood.filter((item) => item.veg_dish === true);
      setVegDish(vegDishOnly);

      //Filter food items where Tandoor is true
      const tandoorDishOnly = filteredFood.filter(
        (item) => item.tandoor_dish === true
      );
      setTandoorDish(tandoorDishOnly);

      //Filter food items where seaFood is true
      const veganDishOnly = filteredFood.filter(
        (item) => item.vegan === true
      );
      setVeganFood(veganDishOnly);

    } catch (error) {
      console.error(error);
    }
  };

  return { starters, chickenDish, lambDish, vegDish, tandoorDish, veganFood, lunchItem };
}

export default useFoodMenu;