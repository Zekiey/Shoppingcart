import  IconButton  from "@material-ui/core/IconButton";
import styled from "styled-components";

const Wrapper = styled.div `
margin:40px;

`

const StyledButton=styled(IconButton)`
postition:fixed;
z-index:100;
right:20px;
top:5px;
color:white

`;

export {Wrapper,StyledButton};