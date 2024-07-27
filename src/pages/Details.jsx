import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "../components/slider.css";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Details() {
  const [product, setProduct] = useState("");
  const [reviews, setreviews] = useState("");
  const [image, setimg] = useState("");
  const [selected, setSelected] = useState(0);
  const [rating, setrating] = useState(0);

  const userid = localStorage.getItem("id");

  const cartAddid = localStorage.getItem("selectedGame");
  const navigate = useNavigate();


  const Start = ({ selected, onSelected }) => {
    return <FaStar color={"# 000"} />;
  };

  const startGenerate = (numOfStarts) => {
    return Array(numOfStarts)
      .fill()
      .map((item, i) => <Start key={i} selected={selected > i} />);
  };

  async function handleAddtoCart(id) {
    let result = await fetch(
      `http://localhost:5000/api/v1/users/cart/${userid}`,
      {
        method: "post",
        body: JSON.stringify({ cartAddid }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (result.status === 200) {
      alert("Added to cart");
    } else {
      alert("Something went wrong");
    }
  }

  const checkLoginandAddtoCart=async()=>{
      console.log(userid)
      if(userid!=null){
        await handleAddtoCart();
      }else{
        navigate('/login')
      }
  } 
  const checkLoginandBuy=async(amount)=>{
      console.log(userid)
      if(userid!=null){
       await checkoutHandler(amount);
      }else{
        navigate('/login')
      }
  }

  const checkoutHandler = async (amount) => {

    let key, order;

    const data = await axios.get("http://localhost:5000/api/v1/razorpaykey");

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

        const arr = [cartAddid];

        axios.post(`http://localhost:5000/api/v1/payment/${userid}`, {
          razorpay_payment_id: razorpay_payment_id,
          totalAmount: amount,
          orderItems: arr,
        });
        window.location.href = "/paymentsuccessfull";
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
  };

  async function getproduct() {
    const id = localStorage.getItem("selectedGame");
    let result = await fetch(`http://localhost:5000/api/v1/products/${id}`);
    result = await result.json();
    setProduct(result);
    let a = [];
    a.push(result.banner);
    for (let i = 0; i < result.image.length; i++) {
      a.push(result.image[i]);
    }
    setimg(a);

    setreviews(result.reviews);

    const dumy = parseInt(result.rating / (result.reviews.length + 1));
    setrating(dumy);
  }

  useEffect(() => {
    getproduct();
    window.scroll(0, 0);
  }, []);

  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === image.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? image.length - 1 : slide - 1);
  };

  return (
    <>
      <Content>
        <div className="carousel">
          <BsArrowLeftCircleFill
            onClick={prevSlide}
            className="arrow arrow-left"
          />

          {image &&
            image.map((item, idx) => {
              return (
                <img
                  src={item}
                  alt=""
                  key={idx}
                  className={slide === idx ? "slide" : "slide slide-hidden"}
                />
              );
            })}
          <BsArrowRightCircleFill
            onClick={nextSlide}
            className="arrow arrow-right"
          />
          <span className="indicators">
            {image &&
              image.map((_, idx) => {
                return (
                  <button
                    key={idx}
                    className={
                      slide === idx
                        ? "indicator"
                        : "indicator indicator-inactive"
                    }
                    onClick={() => setSlide(idx)}
                  ></button>
                );
              })}
          </span>
        </div>

        <Title>
          <span>{product && product.name} </span>
        </Title>
        <RATING>
          Game rating : &nbsp;
          {startGenerate(rating)}
        </RATING>
        <Description>{product && product.description}</Description>
        <Specifications>
          <span>
            <b>Specifications :</b>
          </span>
          <span>
            <b>OS: </b>Windows 10, SteamOS, Linux.
          </span>
          <span>
            <b>Processor: </b>Dual Core with Hyper-Threading. Memory: 8 GB RAM.
          </span>

          <span>
            <b>Graphics:</b> Nvidia GeForce GTX 970 / AMD RX480. Internet
          </span>
          <span>
            <b>Network: </b>Broadband connection.
          </span>
          <span>
            <b>Additional Notes: </b> Available DisplayPort (Version1.2) and USB
            (2.0+) Port required.
          </span>
        </Specifications>
        <BUT>
          <BUTTON onClick={checkLoginandAddtoCart}>ADD TO CART</BUTTON>
         <span>
            <b> OR</b>
          </span>
          <BUTTON
            onClick={() => {
              checkLoginandBuy(product.price);
            }}
          >
            BUY NOW ₹{product && product.price}
          </BUTTON>
        </BUT>
      </Content>
      {reviews && reviews.length !== 0 ? (
        <BGCONTAINER>
          <REVIEWHEADER>REVIEWS</REVIEWHEADER>
          <Content2>
            {reviews &&
              reviews.map((review, index) => {
                return (
                  <CARD key={index}>
                    <Sdiv>
                      <Label> {review.name} </Label>
                      <Sdiv2> {startGenerate(review.rated)}</Sdiv2>
                    </Sdiv>{" "}
                    <Sdiv>
                      <Message> {review.message}</Message>
                    </Sdiv>
                  </CARD>
                );
              })}
          </Content2>
        </BGCONTAINER>
      ) : (
        <></>
      )}
    </>
  );
}

export default Details;

const BGCONTAINER = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;

  align-items: center;
  // gap: 20px;
`;
const REVIEWHEADER = styled.div`
  font-size: 40px;
  color: # 000;
`;
const Content2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 30px;
  grid-gap: 40px;
  @media (max-width: 400px) {
    width: 400px;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    margin: 10px;
  }
`;
const Sdiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;
const Sdiv2 = styled.div``;
const Label = styled.div`
  width: 450px;
  margin-right: 20px;
  padding-left: 10px;
  text-transform: uppercase;
  padding-right: 20px;
  font-size: 25px;
  color: # 000;
  @media (max-width: 400px) {
    width: 200px;
    font-size: 25px;
  }
`;
const Message = styled.div`
  font-size: 18px;
  width: 600px;
  color: # 000;
  padding-left: 10px;
  @media (max-width: 400px) {
    width: 370px;
    font-size: 15px;
  }
`;
const CARD = styled.div`
  width: 625px;
  // height: 100px;
  display: flex;
  flex-direction: column;
  border: 4px solid  #000;
  border-radius: 20px;
  height: 200px;
  @media (max-width: 400px) {
    width: 370px;
    height: 250px;
  }
`;
const Content = styled.div`
  // border: 3px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  color:  #000;
  @media (max-width: 400px) {
    width: 370px;

    margin-top: 50px;
  }
`;

const Title = styled.div`
  font-size: 2rem;
`;
const RATING = styled.div`
  font-size: 1.2rem;
`;

const Description = styled.div`
  width: 800px;

  @media (max-width: 400px) {
    width: 370px;
  }
`;

const Specifications = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  @media (max-width: 400px) {
    width: 350px;
  }
`;

const BUT = styled.div`
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;
const BUTTON = styled.button`
  margin: 20px;
  height: 60px;
  width: 200px;
  padding: 20px, 20px, 20px, 20px;
  border: 3px solid  #000;
  color: #000;
  background-color: rgb(255, 235, 59, 1);
  font-weight: 700;
  cursor: pointer;
`;
