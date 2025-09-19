import { create } from "zustand";

const cartStore = create((set)=>(
  {
    cartData: [
      {id : 0 , name : "White and black", count :2},
      {id : 1 , name : "Grey Nike", count : 1},

    ]
  }
))
export default cartStore;