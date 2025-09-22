import { create } from "zustand";

const userStore = create((set) => (
  {
    // state 정의
    userName: '안유진',
    productName: ['나이키', '프로스펙스', '아디다스'],
    productStock: [10, 11, 12],

    // 각종 함수(Delete, Update)
    changeName: () => set((state) => (
      {
        userName: '장원영'
      }
)),

    addProduct: () => set((state) => (
      // state.productName : 이전
      { productName: [...state.productName, '고무신'],
        productStock: [...state.productStock, 1]
       }
    
    )),

     // 오버로딩 지원하지 않음
    addProduct: (name, stock=1) => set((state) => (
      // state.productName : 이전
      { productName: [...state.productName, '르무통'],
        productStock: [...state.productStock, 5]
       }
    
    ))
  }
));
   

export default userStore;