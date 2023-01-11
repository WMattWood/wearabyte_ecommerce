import styled from "styled-components";

const Pagination = ({ itemsPerPage, totalItems , paginate }) => { //Page the create the Scrolling Page object in the HomePage

    const pageNumbers = [];             //First we create an empty array to push the page numbers into

    for (let i = 1; i < Math.ceil(totalItems / itemsPerPage); i++) { //runs a For Loop based on the start and end point created in Homepage and pushes into array
        pageNumbers.push(i);
    }

    return (
        <Wrapper>
            {pageNumbers.map(number => { //map through the newly pushed array to create the buttons for move to new sections of the pages to see new items
                return(
                    <div key={Math.floor(Math.random() * 1400000000)}>
                        <NumberTags onClick={() => paginate(number)}>{number}</NumberTags>
                    </div>
                    
                )
            })
            }
                    
        </Wrapper>
    )
}

const Wrapper = styled.div` // Styles used to create the pagination appearance
display: flex;
flex-direction: row;
margin-top: 30px;
`

const NumberTags = styled.button`
border: 1px solid black;
border-radius: 5px;
margin: 10px;
padding: 10px;
background-color: white;
cursor: pointer;
&:hover {
border: 1px solid skyblue;
color: skyblue;
}

`
export default Pagination;