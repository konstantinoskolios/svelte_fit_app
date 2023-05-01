const foodCalories = {
    apple: 0.52,
    banana: 0.89,
    donut: 5.25,
    chicken: 1,
    salad: 0.01,
  };
  
  const calculateCalories = async (formData) => {
    let totalCalories = 0;
    const foods = formData.foods;
    const quantities = formData.quantity;
      
    foods.forEach((food, index) => {
      if (foodCalories.hasOwnProperty(food)) {
        totalCalories += foodCalories[food] * quantities[index];
      } else {
        totalCalories += (quantities[index] * Math.floor(Math.random() * 25) + 1) / 10;
      }
    });
      
    const steps = formData.steps / 10;
    return totalCalories - steps;
  };
  
  module.exports = {
    calculateCalories,
  };
  