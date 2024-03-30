import React from "react";
import styled from "styled-components";
import "../App.css";

function IMAGESLIDE({ src }) {
  return (
    <Holder>
      <ARTICLE src={src} />
    </Holder>
  );
}

export default IMAGESLIDE;
const ARTICLE = styled.img`
  height: 75vh;
  width: 100%;
  @media (max-width: 400px) {
    flex-direction: column;

    width: 380px;
    height: auto;
    // justify-content: center;
    align-items: center;
  }
`;
const Holder = styled.div``;
