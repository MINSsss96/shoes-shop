import { useEffect, useState } from "react";
import DetailInfo from "../TabInfo/DetailInfo";
import SizeGuide from "../TabInfo/SizeGuide";   // ✅ 추가
import Shipping from "../TabInfo/Shipping";

function TabContent({ tabState, product }) {

  // fade 값으로 css를 지정하도록 함
  let [fade, setFade] = useState('')

  // useEffect로 타이머를 실행
  // 0.2초 후에 fade = ani_end 로 바꿔줌
  useEffect(()=>{
    let timer = setTimeout(()=>{
      setFade('ani_end')
    }, 100)
    return(()=>{
      clearTimeout(timer);
      setFade('')
    })
  }, [tabState]
)


  
  return (
    <div className= {`ani_start ${fade}`}>
         {[
        <DetailInfo product={product} />,   // 버튼1 눌렀을 때
        <SizeGuide />,                      // 버튼2 → SizeGuide
        <Shipping />                 // 버튼3 눌렀을 때
    ][tabState]}
    </div>
  )

}
export default TabContent;