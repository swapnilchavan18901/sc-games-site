import React, { Component, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import plstn from "../playimg/playstation-logotype.png";
import xbox from "../playimg/xbox.png";
import pc from "../playimg/monitor.png";

const Recommended = () => {
  const navigated = useNavigate();
  const [products, setProducts] = useState("");

  async function getproducts() {
    let result = await fetch("http://localhost:5000/api/v1/products");
    result = await result.json();
    setProducts(result);
    // console.log
  }

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <Container>
      <h1>Top Games Released</h1>
      <Content>
        {products &&
          products.map((product) => {
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
                </Wrap>
              </NavLink>
            );
          })}
      </Content>
    </Container>
  );
};

export default Recommended;

const Container = styled.div`
  margin-top: 40px;

  overflow-y: hidden;
  overflow-x: hidden;
  justify-content: center;
  h1 {
    font-weight: bold;
    font-size: 20px;
    background-color: #f6f6f6;
    color: #000;
    text-align: center;
    height: 30px;

    letter-spacing: 1.5px;
    width: 100%;
    margin-bottom: 20px;
    align-text: center;
  }
  @media (max-width: 400px) {
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  padding-left: 20px;
  padding-right: 20px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
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
  color: #000;
  span {
    margin: 15px;
    text-opacity: 1;
  }

  font-size: 15px;
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
  height: 400px;
  object-fit: fill;
  top: 0;
  z-index: 1;
  transition: opacity 500ms ease-in-out 0s;
`;
const Wrap = styled.div`
  border: 3px solid rgba(249, 249, 249, 0.1);
  border-radius: 10px;
  margin-top: 20px;
  height: 350px;
  padding: 10px 10px 10px 10px;
  width: 230px;
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
    transform: scale(1.05);
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
  // background: black;
color:#000;
  z-index: -1;
  padding: 7px 7px 7px 7px;
  // background: transparent;
  &:hover {
    z-index: 1;
  }
  @media (max-width: 400px) {
    z-index: 1;
  }
`;
