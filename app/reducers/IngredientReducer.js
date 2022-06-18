
const Ingredients = []


export default IngredientsReducer = (state = Ingredients, action) => {
  switch (action.type) {
    case "updateIngredientList":
      return  [...action.data];
   
    default:
      return state;
  }
};
