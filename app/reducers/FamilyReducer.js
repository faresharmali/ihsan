
const Famillies = [
  {
    id:1,
    Mother: "مريم",
    Father: "محمد",
    Adresse: "الرغاية",
    Phone: "0430689874",
    Income: 15000,
    Children: [
      {
        name: "أسامة",
        sexe: "ذكر",
        age: "12",
      },
      {
        name: "أمين",
        sexe: "ذكر",
        age: "9",
      },
      {
        name: "أنيس",
        sexe: "ذكر",
        age: "9",
      },
    ],
  },
  {
    id:2,
    Mother: "فاطمة",
    Father: "عمر",
    Adresse: "الرويبة",
    Phone: "0798658498",
    Income: 17000,
    Children: [],
  },
  {
    id:3,
    Mother: "كريمة",
    Father: "اسلام",
    Adresse: "العاصمة",
    Phone: "0569878965",
    Income: 17000,
    Children: [],
  },
];
const AddChild=(state,action)=>{
    state.forEach((f)=>{
        if(f.id==action.id){
            f.Children=[...f.Children,{name:"خرا"}]
        }
    })
    return state
}
export default FamilyReducer = (state = Famillies, action) => {
  switch (action.type) {
    case "showFamilies":
      return state;
    case "AddFamily":
      return [...state, action.data];
    case "AddChild":
      return AddChild(state,action);
    default:
      return state;
  }
};
