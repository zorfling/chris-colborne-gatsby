import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { rhythm, scale } from '../../utils/typography';

interface Props {
  title: string;
}

const Container = styled.h1`
  ${{ ...scale(1.5) }};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
`;

const HeaderHome: React.FC<Props> = ({ title }) => {
  return (
    <Container>
      <Link to="/">{title}</Link>
    </Container>
  );
};

export default HeaderHome;
