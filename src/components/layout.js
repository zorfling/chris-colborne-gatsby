import React from 'react';

import { rhythm } from '../utils/typography';
import HeaderHome from './Header/HeaderHome';
import HeaderInner from './Header/HeaderInner';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`;

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const header =
    location.pathname === rootPath ? (
      <HeaderHome title={title} />
    ) : (
      <HeaderInner title={title} />
    );
  return (
    <Wrapper>
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </Wrapper>
  );
};

export default Layout;
