import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './AppNavBar.css'
// Route : 페이지(컴포넌트) 이동 처리
// Routes : Route를 감싸는 용도
// Link : 실제로 페이지를 보여주는 역할, Link위치에 컴포넌트 뿌려줌
// userNavigate : 스크립트 영역에서 링크처리를 하는 훅
import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../Context/UserContext";
// import { useContext } from "react";
import userStore from "../Store/userStore";


function AppNavBar(){

    // Context에 저장되어 있는 정보를 변수에 담는 작업
  // const {loginUser} = useContext(UserContext);
  // console.log(loginUser)

  // store 에서 정보 가져오기(zustand)
  const {userName, productStock, changeName, addProduct, productName} = userStore();

  console.log(productName);
  console.log(productStock);

  const navigate = useNavigate();

  return (
    <>
      <div className="App">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Muzinjang</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/cart')}}>cart</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/about')}}>About</Nav.Link>
              <NavDropdown title="Info" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={()=>{navigate('/about/member')}}>Member</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>{navigate('/about/location')}}>Location</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto align-items-center">

              <Nav.Link as="span"
              onClick={()=>{
                changeName()
                addProduct('르무통', 5)
              }}>
                유저변경</Nav.Link>
              <Nav.Link as="span">{`${userName}님 로그인 됨`}</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default AppNavBar;