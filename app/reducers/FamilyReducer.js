const Famillies = [];

const AddChild = (state, action) => {
  state.forEach((family) => {
    if (family.id == action.data.id) {
      family.kids=[...family.kids,action.data]
    }
  });
  return state;
};
export default FamilyReducer = (state = Famillies, action) => {
  switch (action.type) {
    case "showFamilies":
      return state;
    case "updateFamiliesList":
      return [...action.data];
    case "AddFamily":
      return [...state, action.data];
    case "AddChild":
      return AddChild(state, action);
    default:
      return state;
  }
};
