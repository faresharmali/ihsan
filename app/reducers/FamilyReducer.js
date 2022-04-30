import { Actionsheet } from "native-base";

const Famillies = [
  {
    id:1,
    Mother: "مريم",
    FatherFirstName: "محمد",
    FatherLastName: "محمد",
    Adresse: "الرغاية",
    Phone: "0430689874",
    Income: 15000,
    Children: [
      {
        Name: "أسامة",
        Sexe: "ذكر",
        Age: "12",
        Level: "أولى ابتدائي",

      },
      {
        Name: "أمين",
        Sexe: "ذكر",
        age: "9",
        Level: "ثانية ابتدائي",

      },
      {
        Name: "أنيس",
        Sexe: "ذكر",
        Age: "9",
        Level: "أولى ابتدائي",

      },
    ],
  },
  {
    id:2,
    Mother: "فاطمة",
    FatherFirstName: "عمر",
    FatherLastName: "عمر",
    Adresse: "الرويبة",
    Phone: "0798658498",
    Income: 17000,
    Children: [
      {
        Name: "أمينة",
        Sexe: "أنثى",
        Age: "12",
        Level: "أولى ابتدائي",

      },
    ],
  },
  {
    id:3,
    Mother: "كريمة",
    FatherFirstName: "اسلام",
    FatherLastName: "اسلام",
    Adresse: "العاصمة",
    Phone: "0569878965",
    Income: 17000,
    Children: [
      {
        Name: "عائشة",
        Sexe: "أنثى",
        Age: "12",
        Level: "أولى ابتدائي",
      },
    ],
  },
];
const AddChild=(state,action)=>{
    state.forEach((f)=>{
        if(f.id==action.id){
            f.Children=[...f.Children,{...action.data,Name:action.data.Name+" "+action.data.Father}]
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
