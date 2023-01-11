import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Confirmation = () => {

// using cartId from context 
const { cartId , setCartId } = useContext ( CartContext );
const [orders, setOrders] = useState(null);

const navigate = useNavigate();
// declare handleClick function which redirects user to homepage
const handleClick = () => {
  navigate("/");
}
// fetch call to get specific order from cartId
// setting new id with uuid
// getting cartId from session storage 
  useEffect(() => {
    fetch(`/order/${cartId}`)
        .then((res) => res.json())
        .then((data) => {
            setOrders(data.data)
            console.log(cartId);
            let newId = uuidv4();
            sessionStorage.setItem("cartId" , newId);
            setCartId(sessionStorage.getItem("cartId"));
});
}, []);
// set loading state while data is being fetched 
  return (
    <>
    {!orders ? <h1>Loading...</h1>
      :
      <Container>
        <Head>
        <p>☑</p>Hi, <span>{orders.firstName}</span>! Your order has been confirmed and will be shipped in the next two days!
        </Head>

        <Wrapper>
          <Confirm>
            Order Number:&nbsp;<span>{orders._id}</span>
          </Confirm>
          <Confirm>
            Name:&nbsp;<span>{orders.firstName}  {orders.lastName}</span>
          </Confirm>
          <Confirm>
            Address:&nbsp;<span>{orders.address}</span>
          </Confirm>
        </Wrapper>
        <H2>Thank you for your purchase at 
          <p>Wearabyte!</p>
        </H2>
        <P> 
          A email confirmation of your order has been sent to <p>{orders.email}</p>
        </P>
        <Button onClick={handleClick}>Continue Shopping</Button>
      </Container>
    }  
    </>
  );
};

export default Confirmation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Head = styled.h1`
  font-size:30px;
  font-weight:500;
  span{
    font-weight:bolder;
    font-size: 32px;
  }
  p{
    margin:0;
    font-size: 150px;
    display: flex;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid black;
  padding:50px;
  border-radius: 5px;
  box-shadow: 20px 20px rgba(0, 0, 0, 0.15);
`;
const Confirm = styled.p`
  font-size: 20px;
  span {
    font-weight: bolder;
  }
`;
const H2 = styled.p`
    padding-top: 20px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    p{
      font-weight:bolder;
      display: flex;
      justify-content: center;
      font-size: 30px;
    }
`
const P = styled.p`
    padding-top: 5px;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    p{
      font-weight:bolder; 
      font-size:30px;
      display: flex;
      justify-content: center;
    }
`
const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: grey;
  color: white;
  padding: 15px;
  font-size: 20px;
  margin-top: 10px;
  &:hover {
    background-color: goldenrod;
    cursor: pointer;
  }
`;
