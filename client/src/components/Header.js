import image from "../images/wearabyteImage.jpg";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Underbar from "./Underbar";
import Searchbar from "./Searchbar";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {

  const [tab, setTab] = useState("");
  const [tabVisible, setTabVisible] = useState(false);
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState(null)
  
  useEffect(() => {                           //Fetches all the items from the database
    fetch("/allItems")
      .then( res => res.json())
      .then( res => setAllProducts(res.data) )
  }, []);

  const handleTabChange = (keyword) => {  //the navigations in order to go from page to page
    setTab(keyword);
  };

  const handleFrontPage = () => {
    navigate("/");
  };

  const handleCartPage = () => {
    navigate("/cart");
  };

  useEffect(() => {                               //add an event listener from clicking on the buttons
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const refOne = useRef(null);                  //Adds UseRefs to handle clicking outside the buttons and the box the appears
  const refTwo = useRef(null);
  const refThree = useRef(null);
  const refFour = useRef(null);
  const refFive = useRef(null);
  const refSix = useRef(null);
  const refSeven = useRef(null);

  const handleClickOutside = (e) => {         //handles opening and closing the filter bar
    if (
      refOne.current.contains(e.target) ||
      refTwo.current.contains(e.target) ||
      refThree.current.contains(e.target) ||
      refFour.current.contains(e.target) ||
      refFive.current.contains(e.target) ||
      refSix.current.contains(e.target) ||
      refSeven.current.contains(e.target)
    ) {
      setTabVisible(true);
    } else {
      setTabVisible(false);
    }
  };

  return (
    <>
      <Wrapper>
        <LogoWrapper>
          <LogoButton onClick={handleFrontPage}>
            <Logo src={image} alt="WearaByte logo" />
          </LogoButton>
          <InformationSection>
            <AboutPage
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate("/about");
              }}
            >
              About Us
            </AboutPage>
            <SearchBarWrapper>

              { 
                  !allProducts
                  ?<h1>Loading searchbar...</h1>
                  :<Searchbar suggestions={allProducts}></Searchbar>
     
              }
            </SearchBarWrapper>

            <CartWrapper>
              <AiOutlineShoppingCart
                onClick={handleCartPage}
                style={{ width: "50px", height: "50px" }}
              />
            </CartWrapper>
          </InformationSection>
        </LogoWrapper>
        <MenuWrapper>
          <StyledDropdown
            onClick={() => handleTabChange("Fitness")} //Downdown button for each category
            ref={refOne}
          >
            Fitness
          </StyledDropdown>
          <StyledDropdown
            onClick={() => handleTabChange("Medical")} //Downdown button for each category
            ref={refTwo}
          >
            Medical
          </StyledDropdown>
          <StyledDropdown
            onClick={() => handleTabChange("Lifestyle")} //Downdown button for each category
            ref={refThree}
          >
            Lifestyle
          </StyledDropdown>
          <StyledDropdown
            onClick={() => handleTabChange("Entertainment")} //Downdown button for each category
            ref={refFour}
          >
            Entertainment
          </StyledDropdown>
          <StyledDropdown
            onClick={() => handleTabChange("Industrial")} //Downdown button for each category
            ref={refFive}
          >
            Industrial
          </StyledDropdown>
          <StyledDropdown onClick={() => handleTabChange("Other")} ref={refSix}> 
            Other
          </StyledDropdown>
        </MenuWrapper>
      </Wrapper>

      {!tabVisible ? (
        <div ref={refSeven}></div>
      ) : (
        <DropdownItem ref={refSeven}>
          <Underbar section={tab} />
        </DropdownItem>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  box-shadow: 0 2px 3px #292929, 0 0 77px #d6d6d6 inset,
    5px -5px 94px #292929 inset;
  max-height: 250px;
  max-width: 2000px;
  min-width: 1750px;
  padding: 25px 25px 0px 25px;
  z-index: 10;
`;
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
  z-index: 11;
`;
const LogoButton = styled.div`
  background: none;
  border: none;
`;
const CartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  left: 1300px;
  &:hover {
    cursor: pointer;
    color: goldenrod;
  }
`;

const AboutPage = styled.p`
  font-size: 20px;
  position: relative;
  bottom: 15px;
  left: 1300px;
  margin: 0;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const InformationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledDropdown = styled.button`
  background: none;
  width: fit-content;
  margin-top: 25px;
  padding: 20px;
  font-size: 25px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  :hover {
    color: orange;
    /* background-color: #525151; */
  }
  :focus {
    background-color: #525151;
  }
`;
const DropdownItem = styled.div`
  position: absolute;
`;
const Logo = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

export default Header;
