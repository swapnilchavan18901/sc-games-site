import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
function Orders() {
  const [orderedproducts, setorderedproducts] = useState("");

  const id = localStorage.getItem("id");
  async function getproducts() {
    let result = await fetch(`http://localhost:5000/api/v1/orders/${id}`);
    result = await result.json();
    setorderedproducts(result);
  }

  const handleonrate = async (ide) => {
    localStorage.setItem("rating", ide);
  };

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <>
      <Gcontainer id="abc">
        {orderedproducts &&
          orderedproducts.map((product) => {
            return (
              <Container key={product._id}>
                <Content1>
                  <img src={product.banner} />
                </Content1>
                <Content2>
                  <Sdiv>
                    <span>Name : {product.name} </span>
                  </Sdiv>
                  <Sdiv>
                    <span>PRICE : ₹ {product.price}</span>
                  </Sdiv>
                  <Sdiv>
                    <span>Gamekey : {product.gameKey}</span>
                  </Sdiv>{" "}
                  <Sdiv>
                    <span>
                      Date of Purchased : {product.dateCreated.slice(0, 10)}
                    </span>
                  </Sdiv>
                  <NavLink to="/modal">
                    <Button
                      className="btn"
                      onClick={() => {
                        handleonrate(product.productId);
                      }}
                    >
                      Rate the Game{" "}
                    </Button>
                  </NavLink>
                </Content2>
              </Container>
            );
          })}
      </Gcontainer>
    </>
  );
}
export default Orders;
const Gcontainer = styled.div`
  display: flex;
  flex-direction: column;
  .btn:active {
    .abc {
      background: white;
    }
  }
`;
const Container = styled.div`
  display: flex;

  margin: 40px;
  height: 300px;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 20px 20px;
  border: 3px solid #fff;
`;
const Content1 = styled.div`
  img {
    margin-right: 20px;
    height: 300px;
    width: 250px;
  }
`;
const Content2 = styled.div`
  padding: 40px 40px 40px 40px;
  width: 100%;
  border: 3px solid #ffff;
`;
const Button = styled.button`
  border: 2px solid #ffff;
  height: 50px;
  width: 160px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 15px;

  background: rgb(255, 235, 59, 1);
  cursor: pointer;
`;
const Sdiv = styled.div`
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  span {
    color: #fff;
    font-weight: 700;
    font-size: 20px;
  }
`;
