import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import plstn from "../playimg/playstation-logotype.png";
import xbox from "../playimg/xbox.png";
import pc from "../playimg/monitor.png";
import axios from "axios";

const Cart = () => {
  const [products, setProducts] = useState("");
  const [total, settotal] = useState(0);
  const userid = localStorage.getItem("id");

  const checkoutHandler = async (amount) => {
    let key, order;
    const data = await axios.get("http://localhost:5000/api/v1/razorpaykey");
    console.log(data);
    const result = await axios.post(
      "http://localhost:5000/api/v1/capturerazorpay",
      {
        amount,
      }
    );

    order = result.data;
    key = data.data.razorpaykey;
    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "SC CREATIONS",
      description: "Experience True Gaming Exclusive",
      order_id: order.id,
      // callback_url: "http://localhost:4000/api/v1/paymentverification",
      handler: function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        axios.post(`http://localhost:5000/api/v1/payment/${userid}`, {
          razorpay_payment_id: razorpay_payment_id,
          totalAmount: total,
          orderItems: products,
        });
      },
      prefill: {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#181a21",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
    razor.on("payment.failed", function (response) {
      window.location.href = "/paymentfailed";
    });
    razor.on("payment.successfull", function (response) {
      window.location.href = "/paymentsuccessfull";
    });
  };

  async function getproducts() {
    const ide = localStorage.getItem("id");

    let result = await fetch(`http://localhost:5000/api/v1/users/cart/${ide}`);
    result = await result.json();
    let sum = 0;
    for (let i = 0; i < result.length; i++) {
      sum += result[i].price;
    }
    console.log(sum);
    settotal(sum);
    setProducts(result);
  }
  useEffect(() => {
    getproducts();
  }, []);

  return (
    <>
      <Container>
        {products.length === 0 ? (
          <h2>Cart is empty</h2>
        ) : (
          <Content>
            {products &&
              products.map((product) => {
                // settotal(total + product.price);
                return (
                  <NavLink to="/details" key={product._id}>
                    <Wrap
                      onClick={() => {
                        localStorage.setItem("selectedGame", product._id);
                      }}
                    >
                      {<IG src={product.banner} alt="" />}
                      <IN className="IN">
                        <span>{product.name}</span>
                      </IN>
                      <Sdiv>
                        {product.Xbox && product.Xbox ? (
                          <IMG src={xbox} />
                        ) : (
                          <></>
                        )}
                        {product.PC && product.PC ? <IMG src={pc} /> : <></>}
                        {product.playStation && product.playStation ? (
                          <IMG src={plstn} />
                        ) : (
                          <></>
                        )}
                      </Sdiv>
                    </Wrap>
                  </NavLink>
                );
              })}
          </Content>
        )}

        {products.length === 0 ? (
          <></>
        ) : (
          <Button
            onClick={() => {
              checkoutHandler(total);
            }}
          >
            {" "}
            Buy all [₹{total}]
          </Button>
        )}
      </Container>
    </>
  );
};
export default Cart;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  gap: 20px;
`;
const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  padding-left: 20px;
  padding-right: 20px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (max-width: 400px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 5px;
  }
`;
const IN = styled.div`
  // background-color: #003;
  width: 300px;
  display: flex;
  flex-direction: column;
  z-index: -1;
  color: white;
  span {
    margin: 15px;
    text-opacity: 1;
  }

  font-size: 20px;
  @media (max-width: 400px) {
    align-items: center;
    font-size: 10px;
    width: 150px;

    text-align: center;
    // padding: 0px 0px 25px 5px;
  }
`;
const IG = styled.img`
  // position: absolute;
  opacity: 1;
  width: 100%;
  height: 300px;
  object-fit: fill;
  top: 0;
  z-index: 1;
  transition: opacity 500ms ease-in-out 0s;
`;
const Wrap = styled.div`
  border: 3px solid rgba(249, 249, 249, 0.1);
  border-radius: 10px;
  margin-top: 20px;
  height: 380px;
  padding: 10px 10px 10px 10px;
  width: 270px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;

  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  &:hover {
    box-shadow: rgba(0 0 0 / 80%) 0px 40px 58px -16px,
      rgba(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.01);
    border-color: rgba(249, 249, 249, 0.8);
  }
  @media (max-width: 400px) {
    width: 150px;
    height: 250px;
  }
`;

const IMG = styled.img`
  height: 20px;
  margin-bottom: 4px;
  margin: 2px;

  @media (max-width: 400px) {
    height: 10px;
  }
`;

const Sdiv = styled.div`
  height: 30px;
  width: 400px;
  background: black;
  z-index: -1;
  padding: 7px 7px 7px 7px;
  background: transparent;
  &:hover {
    z-index: 1;
  }
  @media (max-width: 400px) {
    z-index: 1;
  }
`;

const Button = styled.button`
  height: 70px;
  width: 700px;
  background: yellow;
  border: 2px solid yellow;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
