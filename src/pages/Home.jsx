import styled from "styled-components";

import ImageSlider from './../components/ImageSlider';
import Recommended from './../components/Recommended';

const Home = () => {
  return (
    <Container>
      <ImageSlider />
      <Recommended />
      {/* <Megasale /> */}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  min-height: calc(100vh - 500px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;
`;
