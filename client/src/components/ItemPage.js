import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ItemPage = () => {
  const { cartId, setCartId } = useContext(CartContext);
  const [hiddenConfirmation, setHiddenConfirmation] = useState(false); // used to hide and show the added confirmation after purchasing


  const removeConfirmation = () => {      //a function when fired will hide the confirmation button
    setHiddenConfirmation(false)
  };

  //~~~~ useNavigate to home page ~~~~
  const navigate = useNavigate();

  //~~~~ useParam for specifc item id ~~~~
  const { itemId } = useParams();

  //~~~~ state for item ~~~~
  const [details, setDetails] = useState(null);

  //~~~~ useEffect fetch GET ~~~~
  useEffect(() => {
    fetch(`/items/id/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data.data);
        
      });
  }, []);

  const handleAddToCart = async (testing) => {
    if (cartId) {
      // ~~~~ adding a new item to an existing cart ~~~~
      fetch(`/order/addItem/${details.id}`, {
        method: "POST",
        body: JSON.stringify({
          itemId: `${itemId}`,
          cartId: `${cartId}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setHiddenConfirmation(true);
          setTimeout(removeConfirmation, 2000);
        })
        .catch((error) => {
          console.log("Something went wrong");
        });
    } else {
      // ~~~~ create a new cart then add the item to the cart ~~~~
      console.log("making new Cart");
      await fetch(`/order/:cartId`, {
        method: "POST",
        body: JSON.stringify({
          itemId: "Testing Nov17",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCartId(data.data._id);
        })
        .catch((error) => {
          console.log("Something went wrong");
        });
    }
  };

  return (
    <>
      {!details ? (
        <Spinner>
          <AiOutlineLoading3Quarters className="spinner"
            style={{ width: "200px", height: "200px" }}
          />
        </Spinner>
      ) : (
        <Container>
          <ItemWrapper>

            <ImageWrapper>
              <Image src={details.imageSrc}></Image>
            </ImageWrapper>

            <ItemDescription>
              <Name>{details.name}</Name>
              <Price>{details.price}</Price>
              <Category>
                Category:&nbsp;<span>{details.category}</span>
              </Category>
              {details.numInStock <= 0
              ?<OutOfStockButton disabled>Out of Stock</OutOfStockButton>
              :<>
                <Button onClick={() => handleAddToCart()}>Add to cart</Button>
                  {!hiddenConfirmation?<></>:<ConfirmCart>Added!</ConfirmCart>}
              </>}
              <ReturnHome
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate("/");
                }}
              >
                Back to shopping
              </ReturnHome>
            </ItemDescription>
            
          </ItemWrapper>
        </Container>
      )}
    </>
  );
};

export default ItemPage;
// MAIN container
const Container = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// SPINNER
const Spinner = styled.h1`
display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 4%;
  .spinner {
    animation: spin infinite 5s linear;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
// whole ITEM container
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;
//image wrapper
const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
  }
  img:hover {
    transform: scale(1.2);
  }
`;

const ConfirmCart = styled.button`
padding: 2px;
background-color: limegreen;
color: black;
border: none;
border-radius: 15px;
opacity: 85%;
margin-left: 5px;
`;
const OutOfStockButton = styled.button`
  background-color: lightslategrey;
  color: white;
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
  border: 1px solid lightslategray;
  filter: grayscale(1);
`;
//image
const Image = styled.img`
  width: 300px;
  height: 300px;
`;
//description container
const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 3px solid black;
  border-radius: 0% 0% 0% 0% / 0% 0% 0% 0%;
  padding: 100px;
  box-shadow: 20px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  &:hover {
    border-radius: 0% 0% 50% 50% / 0% 0% 5% 5%;
    box-shadow: 10px 10px goldenrod;
  }
`;
//Add to cart
const Button = styled.button`
  border: none;
  background-color: grey;
  color: white;
  padding: 15px;
  font-size: 25px;
  &:hover {
    background-color: goldenrod;
    cursor: pointer;
  }
`;
//Back to homepage
const ReturnHome = styled.p`
  font-size: 20px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    color: goldenrod;
  }
`;

//button +
const ButtonAdd = styled.button`
  border: none;
  background-color: grey;
  color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  span {
    font-size: 25px;
  }
  &:hover {
    background-color: goldenrod;
    cursor: pointer;
  }
`;
//button -
const ButtonRemove = styled.button`
  border: none;
  background-color: grey;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  span {
    font-size: 25px;
  }
  &:hover {
    background-color: goldenrod;
    cursor: pointer;
  }
`;
// ~~~~~ description of that specific item ~~~~~
const Name = styled.p`
  font-size: 25px;
`;
const QuantityWrapper = styled.div``;
const Price = styled.p`
  font-weight: 900;
  font-size: 40px;
`;

const Quantity = styled.p`
  font-size: 25px;
  font-weight: 900;
`;

const Category = styled.p`
  font-size: 25px;
  font-weight: 900;
  span {
    border: 3px solid black;
    border-radius: 10px;
    padding: 5px;
  }
`;
