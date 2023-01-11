import { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useKeyPress from './hooks/useKeyPress.hook';

const Searchbar = ({suggestions}) => {
  
  ///////////////////////////
  // Hooks
  // declare a useState hook for 'value' (a.k.a. searchTerm)
  const [value, setValue] = useState('');
  // use the useKeyPress hook to set up a watcher for ArrowUp/ArrowDown
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');
  // assign useNavigate to a usable invocation keyword
  const navigate = useNavigate();

  ///////////////////////////
  // Component's helper logic
  // function to return an array of suggestions that contains searchterm
  const matchingResults = ( () => {
    let output = []
    if ( value.length > 1 ) {
      output = suggestions.filter(suggestion => {
        let theValue = value.toLowerCase() 
        let theTitle = suggestion.name.toLowerCase()
        return theTitle.includes(theValue)
      })
    }
    // limit search results to 10
    if (output.length > 10) output.length = 10
    return output
  });

  // function to highlight searchterm in returned results
  const splitterFunction = ( (capitalizedTitle, searchTerm) => {
    // format title and search for case insensitivity
    let title = capitalizedTitle.toLowerCase()
    let search = searchTerm.toLowerCase()
    // splice title based on search term size
    let index = title.indexOf(search) + search.length
    let firstHalf = capitalizedTitle.slice( 0, index )
    let secondHalf = capitalizedTitle.slice(index)

    return ( 
      <span>
        {firstHalf}
        <SearchResultPrediction>{secondHalf}</SearchResultPrediction>
      </span>
     );
  });

  // on selecting item, navigate to the suggested product id 
  // and clear the search field
  const handleSelect = (suggestion) => {
    setValue('')
    navigate(`/items/id/${suggestion._id}`) 
    navigate(0) 
  }

  /////////////////////////
  // Component's JSX return
  return ( 
    <Wrapper>

      {/* //////////////// Searchbar //////////////// */}
      <SearchBarInput  value={value} 
              type='text'
              onChange={ (event) => setValue(event.target.value) } 
              onKeyDown={ (event) => { 
                if (event.key === 'Enter') { handleSelect(event.target.value) } 
                } 
              }
      />
      <button onClick={ () => setValue('') }>Clear</button>

      {/* //////////////// Searchbar Resuts ///////////////// */}
      { matchingResults().length > 0 &&  
        <ListOfResults>
          {matchingResults().map( (suggestion) => {
            return (
              <SearchResult key={suggestion._id} onClick={()=>{handleSelect(suggestion)}}>
                {splitterFunction(suggestion.name, value)}
                <SearchResultCategory> in {suggestion.category} </SearchResultCategory>
              </SearchResult>
            )
          })}
        </ListOfResults>
      }
    </Wrapper> 
  )
};


const Wrapper = styled.div`
  * {
    margin: 10px;
    border-radius: 3px;
    z-index: 11;
  }

  input {
    height: 30px;
    width: 400px;
    border: 2px solid lightgray;
    box-shadow: 2px 2px;
  }

  input:focus {
    outline-width: 0;
  }

  button {
    color: white;
    font-weight: 900;
    background-color: lightgrey;
    height: 35px;
    width: 60px;
    border-radius: 20px;
    &:hover{
      cursor: pointer;
      background-color: skyblue;
    }
  }

  ul {
    width: 400px;
    border: 2px solid gray;
    box-shadow: 5px 10px;
    list-style: none;
    padding: 0px;
  }

  li, span {
    
    margin: 0px;
  }
`

const SearchBarInput = styled.input`
border-radius: 20px;
`

const ListOfResults = styled.ul`
  position: absolute;
  top: 110px;
`

const SearchResult = styled.li`
  margin: 0px;
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
  :hover {
    background-color: skyblue;
    cursor: pointer;
  }
`

const SearchResultPrediction = styled.span`
  font-weight: bold;
`

const SearchResultCategory = styled.span`
  font-style: italic;
  font-size: small;
`

export default Searchbar;
