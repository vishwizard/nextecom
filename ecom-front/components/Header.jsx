import Link from "next/link"
import styled from "styled-components"
import Center from "./Center";
const StyledHeaders = styled.header`
background-color : #222
`;


const Logo = styled(Link)`
color:#fff;

`;


export default function Header() {
  return (
    <div>
    <StyledHeaders>
        <Center>
      <Logo href={'/'}>Ecommerce</Logo>
      <nav>
        <Link href={'/'}>Home</Link>
        <Link href={'/products'}>All Products</Link>
        <Link href={'/categories'}>Categories</Link>
        <Link href={'/account'}>Account</Link>
        <Link href={'/cart'}>Cart(0)</Link>
      </nav>
      </Center>
    </StyledHeaders>
  </div>
  )
}
