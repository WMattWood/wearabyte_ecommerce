import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useState } from "react";
import { useEffect } from "react";
import CartDetails from "./CartDetails";
import PurchasePage from "./PurchasePage";


const DisplayCart = () => {

  // declaration of state variables for component
  const [ cartId , setCartId ] = useState(sessionStorage.getItem("cartId"));
  const [ cartDetails, setCartDetails ] = useState("");
  const [ showModal , setShowModal ] = useState(false);
  const [ itemsInCart, setItemsInCart ] = useState("");

  // function to display PurchasePage modal
  const handlePurchasePage = () => {
    setShowModal(prev => !prev)
  };

  // useEffect to fetch cartDetails from the database
  useEffect(() => {
  	fetch(`/order/${cartId}`)
  		.then((res) => res.json() )
  		.then((res) => setCartDetails(res.data) )
      .catch((error) => console.log(error) );
  }, []);
  
  // tail useEffect to follow the cartDetails fetch...
  // ...note: this could be combined with the other
  // useEffect behaviour into an async method. This is
  // a potential future refactor.
  useEffect( () => {
    if (cartDetails) { setItemsInCart(cartDetails.cart) };
    console.log("Pew pew!", cartDetails)
  }, [cartDetails] )

  return (
    <>
      {
      !cartDetails
      ? <NoStockContainer>
          You do not have any items in your cart.
        </NoStockContainer>
      : !cartDetails
        ?<h1>Loading</h1>
        :<Container>
          <Head>
            <h1>Items in your cart</h1>
          </Head>
          <ModalWrapper>
            <PurchasePage showModal={showModal} setShowModal={setShowModal} cartDetails={cartDetails}/>
          </ModalWrapper>
          <ItemWrapper>
          { !itemsInCart
            ?<h1>Waiting on cart...</h1>
            :itemsInCart.map((items) => {
                // This is where the items in cart are rendered.
                return (
                  <div key={Math.floor(Math.random() * 1400000000)}>
                    <CartDetails  imageSrc={items.imageSrc} 
                                  productName={items.name} 
                                  productPrice={items.price} 
                                  quantityInCart={items.quantity}
                                  numInStock={items.numInStock}
                                  itemId={items._id}
                                  cartId={cartId}
                                  cartDetails={cartDetails}
                                  setCartDetails={setCartDetails}
                                  />
                  </div>
                );
              })}
          </ItemWrapper>

          <PriceWrapper>
            <p>
              <span>Subtotal: ITS FREE!!!</span>&nbsp;
            </p>
    
          </PriceWrapper>

          <ButtonWrapper>
            <Button onClick={handlePurchasePage}>BUY NOW</Button>
            <Link to={"/"}>
              <Shopping>Continue Shopping</Shopping>
            </Link>
          </ButtonWrapper>
        </Container>}
    </>
  );
};

const NoStockContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  box-shadow: 0 2px 3px #292929, 0 0 77px #d6d6d6 inset,
    5px -5px 94px #292929 inset;
  padding: 25px;
  margin-top: 25px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  box-shadow: 0 2px 3px #292929, 0 0 77px #d6d6d6 inset,
    5px -5px 94px #292929 inset;
  padding: 25px;
  margin-top: 25px;
`

const Head = styled.div`
  display: flex;
  border-bottom: 3px solid red;
  justify-content: center;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  span {
    font-weight: 900;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  border: none;
  background-color: grey;
  color: white;
  padding: 20px;
  border-radius: 15px;
  &:hover {
    background-color: goldenrod;
    cursor: pointer;
  }
`

const Link = styled(NavLink)`
  color: black;
  &:hover {
    color: goldenrod;
    cursor: pointer;
  }
`

const Shopping = styled.p`
  text-decoration: underline;
`

const ModalWrapper = styled.div`
`

export default DisplayCart;
