import React from "react";
import styled from "styled-components";

const paymentunsuccessful = () => {
  return (
    <Container>
      Payment Unsuccessful Try again
      <Button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Home Page
      </Button>
    </Container>
  );
};

export default paymentunsuccessful;
const Container = styled.div`
  display: flex;
  color: #fff;
  height: 80vh;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  text-align: center;
  flex-direction: column;
`;
const Button = styled.button`
  height: 70px;
  width: 700px;
  margin: 50px;
  background: yellow;
  border: 2px solid yellow;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
