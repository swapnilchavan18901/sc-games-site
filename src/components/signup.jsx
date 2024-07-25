import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const navigated = useNavigate();
  const v = async () => {
    let result = await fetch("http://localhost:5000/api/v1/users/register", {
      method: "post",
      body: JSON.stringify({ name, email, password, phone }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    if (result.status !== 400) {
      navigated("/login");
    } else {
      alert(result.message);
    }
  };

  return (
    <Div>
      <Content>
        <Div2>
          <Label for="userlabel ">UserName :&nbsp;&nbsp;</Label>
          <Input
            type="text"
            id="username"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Div2>
        <Div2>
          <Label for="emaillabel">Email :&nbsp;&nbsp;</Label>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            aria-describedby="emailHelp"
          />
        </Div2>{" "}
        <Div2>
          <Label for="passwordlabel">Password :&nbsp;&nbsp;</Label>
          <Input
            type="password"
            id="password"
            aria-describedby="emailHelp"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </Div2>{" "}
        <Div2>
          <Label for="phonelabel">phone :&nbsp;&nbsp;</Label>
          <Input
            type="phone"
            id="phone"
            aria-describedby="emailHelp"
            value={phone}
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
        </Div2>
        <Button type="submit" onClick={v}>
          Submit
        </Button>
      </Content>
    </Div>
  );
};

export default SignUp;
const Div = styled.div`
  display: flex;
  margin: 20px;

  justify-content: center;
`;
const Content = styled.div`
  position: absolute;
  color: #090b13;
  border: 1px solid #fff;
  width: 400px;
  border-radius: 10px;
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Label = styled.label`
  font-size: 15px;
  margin-left: 10px;
  color: #ffff;
`;
const Input = styled.input`
  height: 30px;
  border-radius: 5px;
  margin: 10px;
  border: 1px solid #fff;
  color: #090b13;
  font-size: 18px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #003;
  border: 2px solid #fff;
  width: 100px;
  height: 40px;
  margin: 20px;
  border-radius: 5px;
  font-size: 17px;
  color: #fff;
`;
