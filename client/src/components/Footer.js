import React from "react";
import styled from "styled-components";
import { BsFacebook, BsInstagram, BsSnapchat, BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
// imported and slightly styled react icons 
const Footer = () => {
const styleFacebook = { color: "#4267B2", marginRight:"10px" };
const styleInstagram = { color: "#DD2A7B" , marginRight:"10px"};
const styleSnapchat = { color: "#FFFC00" , marginRight:"10px"};
const styleTwitter = { color: "#1DA1F2" , marginRight:"10px"};
const navigate = useNavigate();
return (
    <>
    <StyledFooter>
        <Links>
{/* navigate HOME and ABOUT page */}
            <p onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate("/");
                }}>Home</p>
            <p onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate("/about");
                }}>About Us</p>
        </Links>
        <Icons>
            <BsFacebook style={styleFacebook} />
            <BsInstagram style={styleInstagram} />
            <BsSnapchat style={styleSnapchat} />
            <BsTwitter style={styleTwitter} />
        </Icons>
        <Content>© Wearabyte - 2022</Content>
        <Service>
            <span>Customer Service</span>
            <p>1(800) Wearabyte</p>
            <p>Wearabyte@support.ca</p>
        </Service>
    </StyledFooter>
    </>
    );
};

const StyledFooter = styled.footer`
display: flex;
flex-direction: row;
background-color: #ffffff;
color: #4b4c4d;
margin-top: 20px;
border-radius: 15px;
text-decoration: none;
opacity: 0.8;
height: 80px;
position: relative;
bottom: 0%;
width: 100%;
opacity: 1;
box-shadow: 0 2px 3px #292929, 0 0 77px #d6d6d6 inset,
    5px -5px 94px #292929 inset;
    padding-top: 40px;
    padding-bottom: 40px;
`;
const Icons = styled.div`
position: relative;
left:42%;
top: 20%;
font-size: 25px;
padding-top:8px;
font-size:30px;
margin-top: 15px;
`;

const Content = styled.div`
position: relative;
color: darkslategrey;
left: 29%;
bottom: 15%;
font-size: 30px;
`;

const Links = styled.div`
display:flex;
flex-direction: column;
justify-content: space-evenly;
font-size: 18px;
position: relative;
left: 18%;
cursor: pointer;
p {
  &:hover {
    color: skyblue;
  }
}
`;
const Service = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
text-align: center;
color: darkslategrey;
margin:0;
position: relative;
left: 50%;
font-size: 12px;
span{
    font-weight: bolder;
    font-size: 18px;
    text-decoration: underline;
}
`;

export default Footer;