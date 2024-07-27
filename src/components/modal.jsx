import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Modal = (open) => {
  const [selected, setSelected] = useState(0);
  const [Messgae, setMessgae] = useState(0);
  const navigate = useNavigate();

  const handlecancel = () => {
    navigate("/orders");
  };

  const handleConfirm = async () => {
    const ide = localStorage.getItem("rating");
    const name = localStorage.getItem("name");
    const rated = selected;
    const message = Messgae;

    let result = await fetch(`http://localhost:5000/api/v1/reviews/${ide}`, {
      method: "post",
      body: JSON.stringify({ name, message, rated }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    alert("Review Submitted");
    navigate("/orders");
  };

  const startGenerate = (numOfStarts = 5) => {
    return Array(numOfStarts)
      .fill()
      .map((item, i) => (
        <Start
          key={i}
          selected={selected > i}
          onSelected={() => setSelected(i + 1)}
        />
      ));
  };

  const Start = ({ selected, onSelected }) => {
    return (
      <FaStar
        color={selected ? "#000" : "gray"}
        size={40}
        onClick={onSelected}
      />
    );
  };
  return (
    <DIV>
      <DIV2>
        <SDIV>
          <RATING>
            {" "}
            RATE THIS GAME <div> {startGenerate(5)}</div>
          </RATING>
        </SDIV>
        <SDIV>
          <MESSAGE
            type="textArea"
            onChange={(e) => setMessgae(e.target.value)}
          />
        </SDIV>
        <SDIV>
          <SUBMIT onClick={handleConfirm}>
            <span>CONFIRM</span>
          </SUBMIT>
          <CLOSE onClick={handlecancel}>
            <span>CANCEL</span>
          </CLOSE>
        </SDIV>
      </DIV2>
    </DIV>
  );
};

export default Modal;
const DIV = styled.div`
  display: flex;
  color: #000;

  height: 80vh;

  justify-content: center;
  align-items: center;
`;
const DIV2 = styled.div`
  display: flex;

  border-radius:5px;

  border: 3px solid #000;
  width: 400px;

  height: 300px;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RATING = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 25px;
`;
const MESSAGE = styled.textarea`
  height: 80px;
  width: 300px;
  color: #000;
  font-size: 16px;
  padding: 15px 15px 15px 15px;
`;
const SDIV = styled.div`
  height: 100px;
  //   background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
`;
const SUBMIT = styled.button`
  border: 2px solid #000;
  padding: 15px 15px 15px 15px;
  color: #000;
  cursor: pointer;
  border-radius:5px;
  `;
  const CLOSE = styled.button`
  cursor: pointer;
  border: 2px solid #000;
  padding: 15px 15px 15px 15px;
  color: #000;
`;
