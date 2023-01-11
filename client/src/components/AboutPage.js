import styled from "styled-components";

const AboutPage = () => {
  return (
    <>
      <Container>
        <WhoWrapper>
          <Header>Who we are</Header>
          <TextOne>
            A super awesome gundam-style online wearable tech store!
          </TextOne>
        </WhoWrapper>

        <AboutUsWrapper>
          <Header>About Us</Header>
          <TextTwo>
            Welcome to Wearabyte!
            <br /> Over a decade ago, we started a retail store to sell
            wearables tech.
            <br /> As the business grew larger and larger, it had become a
            successful company in no time!
            <br /> Thanks to our loyal clients, we started an online store to
            make it even more accessible to you all!
          </TextTwo>
        </AboutUsWrapper>

        <Team>
          <Header>Team Members</Header>
          <NameWrapper>
            <Name>Joseph</Name>
            <Name>Liam</Name>
            <Name>Matt</Name>
            <Name>Johnny</Name>
          </NameWrapper>
        </Team>
      </Container>
    </>
  );
};

export default AboutPage;

// MAIN CONTAINER
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  height: 100vh;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
// HEADERS
const Header = styled.h2`
  text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    crimson 0%,
    skyblue 29%,
    goldenrod 67%,
    whitesmoke 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: crimson;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
`;

// WHO WE ARE CONTAINER
const WhoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 58% 43% 33% 64% / 50% 38% 53% 50%;
  background: transparent;
  box-shadow: inset 6px 33px 20px 0 #c9c9c9, inset 20px 80px 15px 0 #e0e0e0,
    10px 20px 20px 0px #c9c9c9;
`;

//ABOUT US WRAPPER
const AboutUsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px;
  border-radius: 58% 43% 33% 64% / 50% 38% 53% 50%;
  background: transparent;
  box-shadow: inset 6px 33px 20px 0 #c9c9c9, inset 20px 80px 15px 0 #e0e0e0,
    10px 20px 20px 0px #c9c9c9;
`;

//TEAM MEMBER PROFILE CONTAINER
const Team = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 75px;
  border-radius: 58% 43% 33% 64% / 50% 38% 53% 50%;
  background: transparent;
  box-shadow: inset 6px 33px 20px 0 #c9c9c9, inset 20px 80px 15px 0 #e0e0e0,
    10px 20px 20px 0px #c9c9c9;
`;

// NAMES WRAPPER
const NameWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
`;

// WHO WE ARE TEXT
const TextOne = styled.p`
  text-align: center;
`;

//ABOUT TEXT
const TextTwo = styled.p`
  text-align: center;
`;

// INDIVIDUAL NAMES
const Name = styled.p`
  text-align: center;
  font-family: cursive;
  border: 1px solid black;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 10px 20px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  &:hover {
    border-radius: 15px;
    box-shadow: 10px 10px darkred;
  }
`;
