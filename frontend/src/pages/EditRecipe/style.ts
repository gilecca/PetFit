import styled from "styled-components"
import { colors } from "../../styles/GlobalStyle"

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${colors.text};
`

export const NotFound = styled.div`
  text-align: center;
  padding: 3rem;
`

export const NotFoundTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${colors.text};
`

export const NotFoundMessage = styled.p`
  color: ${colors.errorLight};
  margin-bottom: 2rem;
`

export const BackButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: ${colors.primary};
  }
`