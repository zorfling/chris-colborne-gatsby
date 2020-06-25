import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

const Header = styled.h3`
  font-family: Montserrat, sans-serif;
  margin-top: 0;
`;

const HeaderInner: React.FC<Props> = ({ title }) => {
  return (
    <Header>
      <Link to="/">{title}</Link>
    </Header>
  );
};

export default HeaderInner;
