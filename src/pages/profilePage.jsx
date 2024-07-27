import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
function ProfilePage() {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setemail] = useState(localStorage.getItem("email"));
  const [file, setFile] = useState(null);
  const [photo, setphoto] = useState(localStorage.getItem("profile"));
  const [render, setrender] = useState(false);

  const userID = localStorage.getItem("id");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("profile", file);
    formData.append("name", name);
    formData.append("email", email);

    axios
      .put(`http://localhost:5000/api/v1/users/${userID}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);

        setphoto(res.data.profileimage);
        setemail(res.data.email);
        setName(res.data.name);
        console.log( res.data.profileimage)
        localStorage.setItem("profile", res.data.profileimage);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("name", res.data.name);
      })
      .catch((e) => {
        console.log(e);
      });
    setrender(true);
  };

  useEffect(() => {
    if (render) {
      setrender(false);
    }
  }, [render]);

  return (
    <Container>
      {localStorage.getItem("profile") ? (
        <IMG src={localStorage.getItem("profile")} />
      ) : (
        <></>
      )}
      <Content>
        <SDIV>
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
              contentEditable
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              aria-describedby="emailHelp"
            />
          </Div2>{" "}
        </SDIV>{" "}
        <SDIV>
          <Div2>
            <Label for="userlabel ">profile photo :&nbsp;&nbsp;</Label>
            <Input
              type="file"
              id="profile"
              name="profile"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </Div2>
        </SDIV>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Content>
    </Container>
  );
}

export default ProfilePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const IMG = styled.img`
  height: 200px;
  width: 200px;
  border: 2px solid white;
  border-radius: 400px;
`;
const Content = styled.div`
  border: 3px solid #000;
  display: flex;
  flex-direction: column;
  color: #000;
  align-items: center;
  border-radius: 10px;
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;

const Label = styled.label`
  font-size: 15px;
`;
const SDIV = styled.div`
  display: flex;
`;
const Input = styled.input`
  height: 30px;
  border-radius: 5px;
  margin: 10px;
  border: 1px solid #000;
  color: #000;
  background: #fff;
  font-size: 18px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #fff;
  border: 2px solid #000f;
  width: 100px;
  height: 40px;
  margin: 20px;
  border-radius: 5px;
  font-size: 17px;
  color: #000;
  cursor: pointer;
`;
