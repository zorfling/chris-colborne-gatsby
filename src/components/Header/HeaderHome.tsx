import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { rhythm, scale } from '../../utils/typography';

interface Props {
  title: string;
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rhythm(1.5)};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  ${{ ...scale(1.5) }};
  margin-top: 0;
  margin-bottom: 0;
`;

const Nav = styled.nav`
  font-size: 0.825rem;

  & a {
    margin-left: ${rhythm(0.5)};
    &:first-child {
      margin-left: 0;
    }
  }
`;

const HeaderHome: React.FC<Props> = ({ title }) => {
  return (
    <HeaderContainer>
      <Title>
        <Link to="/">{title}</Link>
      </Title>
      <Nav>
        <Link to="/about">About Me</Link>
        <a target="_blank" href="/rss.xml">
          Subscribe
        </a>
      </Nav>
    </HeaderContainer>
  );
};

export default HeaderHome;
