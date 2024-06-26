
import styled from "styled-components";

const CenterDiv = styled.div`
max-width:800px;
margin:0,auto;
`;

export default function Center({children}) {
  return (
    <CenterDiv>
    {children}
    </CenterDiv>
  )
}
