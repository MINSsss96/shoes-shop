import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Discount from "../Discount";
import Nav from 'react-bootstrap/Nav';
import TabContent from "../TabContent";
import Review from "../Review";
import { UserContext } from "../Context/UserContext";


function Detail({ product }) {

  const {loginUser} = useContext(UserContext);

  const [detailFade, setDetailFade] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [tabState, setTabState] = useState(0);
  const [reviewStats, setReviewStats] = useState({ avg: 0, count: 0 });

  const { id } = useParams();
  const navigate = useNavigate();
  const findProduct = product.find(item => item.id === Number(id));

  if (!findProduct) {
    alert('찾는 상품이 없습니다.');
    navigate(-1);
    return null;
  }

  useEffect(() => {
    const timer = setTimeout(() => setDetailFade('ani_end'), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const myTimer = setTimeout(() => setShowAlert(false), 2000);
    return () => clearTimeout(myTimer);
  }, []);

  // ⭐ 평균 평점 미리 계산 (탭 상관없이 항상)
  useEffect(() => {
    fetch("https://zzzmini.github.io/js/shoesReview.json")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => Number(item.productId) === Number(findProduct.id));
        const count = filtered.length;
        const avg = count > 0 ? (filtered.reduce((sum, r) => sum + r.point, 0) / count).toFixed(1) : 0;
        setReviewStats({ avg, count });
      })
      .catch(err => console.error("리뷰 로드 실패:", err));
  }, [findProduct.id]);

  const renderAvgStars = (avg) => {
    const rounded = Math.round(avg);
    const fullStars = "★".repeat(rounded);
    const emptyStars = "☆".repeat(5 - rounded);
    return fullStars + emptyStars;
  };

  return (
    <div className={`container ani_start ${detailFade}`}>
      <div className="container mt-2">
        {showAlert && <Discount />}
      </div>
      <div className="row">
        <div className="col-md-6">
          <img src={`/images/shoes${findProduct.id+1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}</p>
          {/* 로그인 사용자의 이메일 출력 */}
          {/* <p>
            {loginUser.email}
          </p> */}
          <p>
            ⭐ 평균: <span className="text-warning">{renderAvgStars(reviewStats.avg)}</span>
            ({reviewStats.avg}점 / {reviewStats.count}개 리뷰)
          </p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" activeKey={`link-${tabState}`}>
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>setTabState(0)}>특징</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>setTabState(1)}>사이즈</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=>setTabState(2)}>배송</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" onClick={()=>setTabState(3)}>리뷰</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-3">
        {tabState === 0 && <TabContent tabState={0} product={findProduct} />}
        {tabState === 1 && <TabContent tabState={1} product={findProduct} />}
        {tabState === 2 && <TabContent tabState={2} product={findProduct} />}
        {tabState === 3 && (
          <Review
            productId={findProduct.id}
            onStatsChange={(stats) => setReviewStats(stats)}
          />
        )}
      </div>
    </div>
  );
}

export default Detail;
