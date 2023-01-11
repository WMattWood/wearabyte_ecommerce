import { useReducer } from "react";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineCloseSquare} from 'react-icons/ai'
import { Navigate } from "react-router-dom";

// declation of reducer function
const reducer = (state, action) => {
    switch(action.type) {
    // returns a quantity incremented by 1
    case "increment": { 
        return {
            ...state,
            quantity: state.quantity + 1
        }
    }
    // returns a quantity decremented by 1
    case "decrement": {
        return {
            ...state,
            quantity: state.quantity - 1
        }
    }
    // returns a 0 state for quantity
    //as item is being removed from cart entirely.
    case "delete": {
      return {
        ...state,
        quantity: 0
    }
    }
    default: {
        throw new Error("Oops something Broke")
    }
  }
}

// Actual component definition
const CartDetails = (cartInformation) => {
    
    // Database query to update quantity of item
    // stored in currently active cart.
    const addOne = () => {
        fetch(`/order/addItem/${itemId}`, {
            "method": "POST",
            "body": JSON.stringify({
                "itemId": itemId,
                "cartId": cartId
            }),
            "headers": {
                "Content-Type": "application/json"
            }
        })
        .then( res => res.json() )
        .then( res => console.log(res) )
    }

    // Database query to update quantity of item
    // stored in currently active cart.
    const subtractOne = () => {
        fetch(`/order/subtractItem/${itemId}`, {
            "method": "POST",
            "body": JSON.stringify({
                "itemId": itemId,
                "cartId": cartId
            }),
            "headers": {
                "Content-Type": "application/json"
            }
        })
        .then( res => res.json() )
        .then( res => console.log(res) )
    }

    // Database query to remove item from cart in db
    const deleteOne = () => {
        fetch(`/order/deleteItem/${itemId}`, {
            "method": "DELETE",
            "body": JSON.stringify({
                "itemId": itemId,
                "cartId": cartId
            }),
            "headers": {
                "Content-Type": "application/json"
            }
        })
    }

    // deconstructing props
    const { numInStock, 
            quantityInCart, 
            itemId, 
            cartId, 
            productName, 
            productPrice,
            cartDetails,
            setCartDetails,
            } = cartInformation

    // initializing reducer with quantity in cart and number in stock remaining.
    // these values are used in the JSX to determine whether the increment and 
    // decrement buttons are disabled or not
    
    
    const [state, dispatch] = useReducer(reducer, { quantity: quantityInCart, numInStock: numInStock});
    console.log("Cart Specific Details", itemId)
    
    // calculate total cost of the current quantity of item in the cart.
    let totalPrice = Number(state.quantity) * Number(productPrice.slice(1));
    totalPrice = totalPrice.toFixed(2)
    
    // create the object which will be manipulated and then used to update
    // the cartDetails state upon firing of one of the three buttons to
    // edit the cart (add, subtract, delete).  In each of the add/sub/delete
    // functions the cartCopy will be modified in some way to reflect the 
    // new state, and then used to update the existing state.
    let objIndex = cartDetails.cart.findIndex(element => element._id === itemId)
    let cartCopy = cartDetails.cart

    return (
        <SingleItemWrapper>
            <Image src={cartInformation.imageSrc} alt="Product Image" />
            <Information>
                <NameWrapper>
                    Name:<StyledTextSpan>{productName}</StyledTextSpan>
                    <UnitPriceWrapper>
                        Individual Price:<StyledTextSpan>{productPrice}</StyledTextSpan>
                    </UnitPriceWrapper> 
                </NameWrapper>
                <QuantityInCartWrapper>
                    <NumbersWrapper>
                        { console.log('Quantity in cart', quantityInCart) }
                        { console.log('Quantity in cart', state.quantity) }
                        <div>Quantity: {state.quantity}</div>
                        <div>Price: ${totalPrice}</div>
                    </NumbersWrapper>
                    <IncrementWrapper>
                        {/* Note regarding the buttons below - the addOne(), subtractOne(), and 
                            deleteOne() methods are all database calls which cannot be performed
                            inside of a useReducer hook.  This is because useReducer may only 
                            perform 'pure' functions without side effects.  These calls are therefore
                            made in parallel to the calls to useReducer.  The RemoveFromCartButton 
                            also has an additional method to update the CSS and remove that element
                            from being displayed on the page.*/}
                        <IncrementButton onClick={() => {
                                // update quantity in db Order
                                subtractOne()
                                // update displayed quantity via useReducer
                                dispatch({type: "decrement"})
                                // update cartDetails state
                                cartCopy[objIndex].quantity = state.quantity - 1
                                setCartDetails( { _id: cartId, cart: cartCopy})
                            }} 
                            disabled={ state.quantity <= 0 } 
                        ><AiFillMinusCircle/></IncrementButton>
                        <IncrementButton onClick={() => {
                                // update quantity in db Order
                                addOne()
                                // update displayed quantity via useReducer
                                dispatch({type: "increment"})
                                // update cartDetails state
                                cartCopy[objIndex].quantity = state.quantity + 1
                                setCartDetails( { _id: cartId, cart: cartCopy})

                            }} 
                            disabled={ state.quantity >= state.numInStock } 
                        ><AiFillPlusCircle/></IncrementButton>
                    </IncrementWrapper>
                    <RemoveFromCartButton onClick={() => {
                                // remove item from db Order completely
                                deleteOne()
                                // update displayed quantity via useReducer
                                dispatch({type: "delete"})
                                // update cartDetails state
                                cartCopy.splice( objIndex, 1)
                                setCartDetails( { _id: cartId, cart: cartCopy})
                            }} 
                    ><AiOutlineCloseSquare/></RemoveFromCartButton>
                </QuantityInCartWrapper>
            </Information>
        </SingleItemWrapper>
        
    )
}

const SingleItemWrapper = styled.div`
    box-shadow: -5px 5px 9px 1px rgba(0,0,0,0.69);
    border-radius: 15px;
    margin-top:15px;
    padding: 15px;
    padding-right: 35px;
    display: flex;
`
const Image = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 15px;
  margin: 0px 40px;
`

const Information = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
`

const NameWrapper = styled.div`
    font-size: 25px;
    margin-right: auto;
`
const UnitPriceWrapper = styled.div`
margin-top: 5px;
`
const StyledTextSpan = styled.span`
    margin-left: 10px;
`

const QuantityInCartWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const NumbersWrapper = styled.div`
    /* border: 1px solid blue; */
    font-size: 25px;
    margin-right: 35px;
`
const IncrementWrapper = styled.div`
    display: flex;
    /* flex-direction: column; */
    padding: 5px;
`

const IncrementButton = styled.button`
    font-size: 48px;
    border: none;
    margin: 5px;
    color: gray;
    &:hover {
        cursor: pointer;
    }
    :disabled{
        opacity: 0.4;
    }
`

const RemoveFromCartButton = styled.button`
font-size: 48px;
    border: none;
    margin: 5px;
    color: red;
    &:hover {
        cursor: pointer;
    }
`

export default CartDetails;