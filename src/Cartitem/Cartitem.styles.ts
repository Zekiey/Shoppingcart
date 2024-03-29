import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Haveletica, Sans-serif;
  border-bottom: 1px solid light-blue;
  padding-bottom: 20px;

  div {
    flex: 1;
  }
  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }

  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`;
export default Wrapper;
