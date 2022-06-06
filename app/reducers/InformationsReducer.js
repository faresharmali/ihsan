const Informations = [

];

export default InformationsReducer = (state = Informations, action) => {
  switch (action.type) {
    case "GetInformations":
      return state;
    case "UpdateInformations":
      return [...action.data];
    default:
      return state;
  }
};
