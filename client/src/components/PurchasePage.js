import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import {FiX} from "react-icons/fi";


const PurchasePage = ({ showModal, setShowModal, cartDetails}) => {

    const { cartId , setCartId } = useContext ( CartContext ); 
    const [firstName, setFirstName] = useState("");                      //set a state for each value the users needs to enter
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [creditCard, setCreditCard] = useState("ITS FREE (Concordia Bootcamp Special)");
    const navigate = useNavigate();

    const customerOrder = cartDetails.cart

    return (
        <div>
            {showModal ? 
            <Background>
                <ModalWrapper showModal={showModal}>
                    <StyledForm onSubmit={ async (ev) => {               // on submit send the data to the backend
                        ev.preventDefault();

                        await customerOrder.forEach( item => {
                            let itemId = item._id
                            let quantity = item.quantity
                            fetch(`/items/update/${itemId}`, {
                                "method": "PATCH",
                                "body": JSON.stringify({
                                    "itemId": itemId,
                                    "quantity": quantity
                                }),
                                "headers": {
                                    "Content-Type": "application/json"
                                }
                            })
                        })

                        fetch(`/order/updateOrder/${cartId}`, {         // send the data the user inputted to the cart
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                firstName,
                                lastName,
                                email,
                                address,
                                creditCard
                            }),
                        })
                        .then((res) => res.json())                      // on successful fetch send to confirmation page
                        .then((data) => {
                            navigate("/confirmation");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }}>
                        <TextBar>
                            {/* the input field for the all values, sets the variables when the field is changed */}
                            Name: <StyledInput type="text" name="fName" value ={firstName} onChange={(ev) => setFirstName(ev.currentTarget.value)} required/> 
                        </TextBar>
                        <TextBar>
                            Last Name: <StyledInput type="text" name="lName" value ={lastName} onChange={(ev) => setLastName(ev.currentTarget.value)} required/>
                        </TextBar>
                        <TextBar> 
                            {/* check for an @ sign in the value */}
                            Email: <StyledInput type="email" name="eMail" value ={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required/> 
                        </TextBar>
                        <TextBar>
                            Address: <StyledInput type="text" name="eMail" value ={address} onChange={(ev) => setAddress(ev.currentTarget.value)} required/>
                        </TextBar>
                        <TextBar>
                            Credit Card: <StyledInput disabled={true} type="text" name="cCard" value ={creditCard} onChange={(ev) => setAddress(ev.currentTarget.value)}/>
                        </TextBar>
                        <StyledSubmitButton type="submit" value="Submit" >Submit</StyledSubmitButton>
                    </StyledForm>
                    <StyledButton onClick={() => setShowModal(prev => !prev)}><FiX  size={28}/></StyledButton>
                </ModalWrapper>
                
            </Background> 
            :null}
        </div>
    );
}


const Background = styled.div`
width: 100%;
height: 100%;
top: 0;
left: 0;
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
position: fixed;
display: flex;
justify-content: center;
align-items: center;
z-index: 100;
`
const TextBar = styled.div`
display: flex;
margin: 10px;
font-size: 30px;
width: 75%;
justify-content: flex-end;
align-items: center;
`
const ModalWrapper = styled.div`
width: 45%;
height: 45%;
display: flex;
justify-content: center;
align-items: center;
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
background-color: #ffff;
color: #000;
display: flex;
position: relative;
z-index: 10;
border-radius: 10px;
`
const StyledButton = styled.button`
padding: 15px;
border-radius: 25px;
position: absolute;
right: 0;
top: 0;
margin: 25px;
`
const StyledForm = styled.form`
display: flex;
flex-direction: column;
width: 70%;
align-items: center;
button {
    justify-content: center;
}
input {
    align-items: center;
}
`

const StyledInput = styled.input`

  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-left: 25px;
  margin-right: 5px;

  
`
const StyledSubmitButton = styled.button`
  width: 50%;
  background-color: black;
  color: white;
  padding: 14px 20px;
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
`
export default PurchasePage;