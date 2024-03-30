import React from "react";
import styled from "styled-components";

const megasale = () => {
  return (
    <Container>
      <Wrap>
        <span>Pre order Available for assasian creed valhalla</span>
        <IMG
          src="../../public/images/aassassins_creed_odyssey-wallpaper-1920x1080.jpg"
          alt=""
        />
      </Wrap>
      <Wrap>
        <span>Pre order Available for assasian creed valhalla</span>
        <IMG
          src="../../public/images/aassassins_creed_odyssey-wallpaper-1920x1080.jpg"
          alt=""
        />
      </Wrap>
      <Wrap>
        <span>Pre order Available for assasian creed valhalla</span>
        <IMG
          src="../../public/images/aassassins_creed_odyssey-wallpaper-1920x1080.jpg"
          alt=""
        />
      </Wrap>
    </Container>
  );
};

export default megasale;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 388px);
  @media (max-width: 400px) {
    display: none;
  }
`;
const Wrap = styled.div`
  height: 400px;
  margin: 10px;
  text-align: center;
  border: 1px solid black;
  span {
    font-size: 30px;
    font-weight: bold;
  }
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 400px) {
    display: flex;
    width: 200px;
    height: 200px;
  }
`;
const IMG = styled.img`
  height: 100px;
`;
