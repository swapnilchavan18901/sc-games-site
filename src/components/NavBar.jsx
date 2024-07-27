import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const auth = localStorage.getItem("authToken");
  const navigated = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigated("/");
  };
  return (
    <Navbar>
      <NavLink className="a" to="/">
        <Logo>
          <span>SC Creations</span>
        </Logo>
      </NavLink>

      <NavMenu>
        {auth ? (
          <Div>
            <NavLink className="a" to="/orders">
              <span>Orders</span>
            </NavLink>
            <NavLink className="a" to="/cart">
              <span>Cart</span>
            </NavLink>
            <NavLink className="a" to="/profile">
              <span>Profile</span>
            </NavLink>
            <NavLink className="a" onClick={handleLogOut} to="/ ">
              <span>Logout</span>
            </NavLink>
          </Div>
        ) : (
          <Div>
            <NavLink className="a" to="/login">
              <span>Login</span>
            </NavLink>
            <NavLink className="a" to="/signup" on>
              <span>Signup</span>
            </NavLink>
          </Div>
        )}
      </NavMenu>
    </Navbar>
  );
}

export default NavBar;

const Navbar = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  // justify-content: center;
  padding: 0 36px;
  overflow-x: hidden;
  border-bottom: 3px solid #000;
  margin-bottom: 20px;
  @media (max-width: 400px) {
    padding: 0 0px;
    flex-direction: column;
    justify-content: center;
    height: 150px;
  }
`;

const Logo = styled.div`
  width: 300px;
  font-weight: bold;
  font-size: 25px;
  margin-left: 70px;
  letter-spacing: 1.5px;
  color: #000;

  span {
    position: relative;
    color: #000;
    &:after {
      content: "";
      height: 2px;
      position: absolute;
      background: #000;

      left: 0;
      right: 0;
      bottom: -6px;
      opacity: 0;
      transform-origin: left center;
      transform: scaleX(0);
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    }
  }
  &:hover {
    span:after {
      transform: scaleX(1);
      opacity: 1;
    }
  }
  @media (max-width: 400px) {
    // height: 10px;
    width: 200px;
    text-align: center;
    font-size: 15px;
    margin-left: 10px;
    margin-top: 20px;
  }
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: end;
  flex: 1;
  margin-left: 20px;
  margin-top: 10px;

  a {
    display: flex;
    // align-items: center;
    padding: 0 12px;
    color: #000;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    span {
      font-size: 15px;
      margin: 10px;
      letter-spacing: 1.43px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        position: absolute;
        background: #000;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0);
        color: #000;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        color: #fff;
        opacity: 1;
      }
    }
  }

  @media (max-width: 400px) {
    height: 40px;
    margin-top: 0px;
    a {
      margin: 0px;
      padding: 0px 0px 0px 0px;
      span {
        margin: 5px;
        font-size: 10px;
      }
    }
  }
`;

const Div = styled.div`
  display: flex;
`;
