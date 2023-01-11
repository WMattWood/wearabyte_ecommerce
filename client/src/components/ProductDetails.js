import { useContext, useState } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

const ProductDetails = (details) => {
  const { cartId, setCartId } = useContext(CartContext);   //imports the cart ID from the context
  const [hiddenConfirmation, setHiddenConfirmation] = useState(false); // used to hide and show the added confirmation after purchasing
  const navigate = useNavigate();

  const removeConfirmation = () => {      //a function when fired will hide the confirmation button
    setHiddenConfirmation(false)
  };
  const handleAddToCart = async (testing) => {        //This function handles adding an items to the cart created for the user
    
    await fetch(`/order/addItem/${details.id}`, {   //First fetches at the endpoint based on the id of the item purchased
      method: "POST",
      body: JSON.stringify({
        itemId: `${details.id}`,              //in the body send the itemID and the cartID to be used in the backend and database
        cartId: `${cartId}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())              //Upon successfully receiving the response cause the Confirmation button to show then disappear after 2 seconds
      .then((data) => {
        console.log(data);
        console.log(cartId);
        setHiddenConfirmation(true);
        setTimeout(removeConfirmation, 2000);
      })
      .catch((error) => {
        console.log("Something went wrong");      //In case of error, show the error
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <LeftWrapper>
        <Image
          onClick={(e) => {                   //Used to navigate to the specific item page for more details by clicking the image
            e.preventDefault();
            e.stopPropagation();
            navigate(`/items/id/${details.id}`);
          }}
          src={details.src}
        />
      </LeftWrapper>

      <RightWrapper>

        <Name
          onClick={(e) => {             //Used to navigate to the specific item page for more details by clicking the name
            e.preventDefault();
            e.stopPropagation();
            navigate(`/items/id/${details.id}`);
          }}
        >
          {details.name}
        </Name>
        {details.location} , {details.category}<br />
        <Price>{details.price}</Price>               
        {details.stock <= 0
        ?<OutOfStockButton disabled>Out of Stock</OutOfStockButton>
        :<ButtonBar>
          <AddCartButton onClick={() => handleAddToCart(details.name)}>Add to Cart</AddCartButton>
          {!hiddenConfirmation?<></>:<ConfirmCart>Added!</ConfirmCart>}
        </ButtonBar>
          }
      </RightWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  box-shadow: 0 2px 3px #292929, 0 0 77px #d6d6d6 inset,
    5px -5px 94px #292929 inset;
  padding: 25px;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  background: white;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
    border: 1px solid skyblue;
  }
`;
const Name = styled.div`
  cursor: pointer;
  font-weight: 900;
  &:hover {
    color: skyblue;
  }
`;
const Price = styled.p`
font-weight: 900;
`;

const AddCartButton = styled.button`
  cursor: pointer;
  background-color: lightslategrey;
  color: white;
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
  border: 1px solid lightslategray;
  &:hover {
    background-color: white;
    border: 1px solid white;
    color: skyblue;
  }
`;

const ButtonBar = styled.div`
display: flex;

`
const ConfirmCart = styled.button`
padding: 2px;
background-color: limegreen;
color: black;
border: none;
border-radius: 15px;
opacity: 85%;
margin-left: 5px;
`

const OutOfStockButton = styled.button`
  background-color: lightslategrey;
  color: white;
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
  border: 1px solid lightslategray;
  filter: grayscale(1);
`;

const ResetButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: skyblue;
    border: 1px solid skyblue;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export default ProductDetails;
