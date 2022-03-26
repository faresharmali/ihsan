const Informations = [
  {
    id: 1,
    0: "معلومة رقم 1",
  },
  {
    id: 1,
    0: "معلومة رقم 2",
  },
  {
    id: 1,
    0: "معلومة رقم 3",
  },
  {
    id: 1,
    0: "معلومة رقم 4",
  },
  {
    id: 1,
    0: "معلومة رقم 5",
  },
];
const AddChild = (state, action) => {
  state.forEach((f) => {
    if (f.id == action.id) {
      f.Children = [...f.Children, { name: "خرا" }];
    }
  });
  return state;
};
export default InformationsReducer = (state = Informations, action) => {
  switch (action.type) {
    case "GetInformations":
      return state;
    case "AddInformation":
      return [...state, action.data];
    case "EditInformations":
      return AddChild(state, action);
    default:
      return state;
  }
};
