import React from "react";
import styled from "styled-components";

const paymentsuccessfull = () => {
  return (
    <Container>
      Payment successful Thanks for purchasing shop other games
      <Button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Continue Shopping &#8594;
      </Button>
    </Container>
  );
};

export default paymentsuccessfull;
const Container = styled.div`
  display: flex;
  height: 80vh;
  color: #000;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  text-align: center;
`;
const Button = styled.button`
  height: 70px;
  width: 700px;
  margin: 50px;
  background: yellow;
  border: 2px solid yellow;
  border-radius: 20px;
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
`;
