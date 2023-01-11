import styled from "styled-components";

// Component to render underneath the optional navigation menus
// Additional work could be done here to render categories...
const Underbar = (menuDetails) => {
  // console.log(menuDetails)
  return (
    <DropdownItem>
      <CategoryWrapper>
        <Category>{menuDetails.section}</Category>
      </CategoryWrapper>
      <ListWrapper>
        <List>Feature Will be Available Soon</List>
      </ListWrapper>
    </DropdownItem>
  );
};

const DropdownItem = styled.div`
  background-color: #525151;
  display: flex;
  flex-direction: column;
  width: 1786px;
  color: white;
  padding: 26px;
  border-radius: 12px;
`

const CategoryWrapper = styled.div``
const Category = styled.p`
  font-size: 20px;
  border: 1px solid goldenrod;
  background-color: goldenrod;
  width: fit-content;
  padding: 10px;
  border-radius: 20px;
`

const ListWrapper = styled.div``
const List = styled.p``

export default Underbar;
