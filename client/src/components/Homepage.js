import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import ProductDetails from "./ProductDetails";
// import { CartContext } from "./CartContext"; TBD
import Pagination from "./Pagination";
import banner from "../images/banner.jpg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Homepage = () => {

  const [pageItems, setPageItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // These states are needed to make the Pagination by setting
  const [itemsPerPage, setItemsPerPage] = useState(24); // a start and end point for a slice on the array

  // const { cartId } = useContext(CartContext); TBD

  // ~~~~ useEffect GET all items ~~~~
  useEffect(() => { // fetches all items in the database and sets the items to a the Page Items

    fetch("/allItems")
      .then((res) => res.json())
      .then((data) => {
        setPageItems(data.data);
      });
  }, []);

  // ~~~~ Get current items ~~~~
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // ~~~~ Change the page ~~~~

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {!pageItems ? (
        <Spinner>
          <AiOutlineLoading3Quarters
            className="spinner"
            style={{ width: "200px", height: "200px", color: "skyblue" }}
          />
        </Spinner>
      ) : (
        <HomepageWrapper>
          <Banner>
            <img src={banner} alt="banner" />
          </Banner>

          <ImageWrapper> 
            {pageItems.slice(indexOfFirstItem, indexOfLastItem).map((items) => { //uses a map after a slice to render the items
              return (                                                      //into a component to produce each Item element to display on the Homepage
                <ImageContainer key={Math.floor(Math.random() * 1400000000)}>
                  <ProductDetails                             // the Element that will create each item element. It passes the variable to be used in Product Details
                    src={items.imageSrc}
                    name={items.name}
                    location={items.body_location}
                    category={items.category}
                    price={items.price}
                    id={items._id}
                    stock={items.numInStock}
                  />
                </ImageContainer>
              );
            })}
          </ImageWrapper>
          <Pagination   // The Pagination (a clickable bar that seperates the mass items into easy to read tables)
            itemsPerPage={itemsPerPage}
            totalItems={pageItems.length}
            paginate={paginate}
          />
        </HomepageWrapper>
      )}
    </>
  );
};

const HomepageWrapper = styled.div`     //The styles for the entire Homepage section
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  box-shadow: 0 2px 3px #292929, 0 0 77px #d6d6d6 inset,
    5px -5px 94px #292929 inset;
  padding: 25px;
  margin-top: 25px;
`;

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

const Banner = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid darkslategrey;
  border-radius: 30px;
  width: 100%;
  margin-bottom: 30px;
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 30px;
  }
`;
const ImageContainer = styled.div``;
const ImageWrapper = styled.div`                //The styles to contain the item objects being generated from the map
  display: grid;
  grid-template-columns: 350px 350px 350px 350px;
  grid-row-gap: 35px;
  grid-column-gap: 10px;
  justify-content: center;
  align-items: center;
  column-gap: 8rem;
  top: 30px;
`;
export default Homepage;
