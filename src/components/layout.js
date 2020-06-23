import React from 'react';
import styled from 'styled-components';

import { rhythm } from '../utils/typography';
import HeaderHome from './Header/HeaderHome';
import HeaderInner from './Header/HeaderInner';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
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
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
      </div>
      <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </Wrapper>
  );
};

export default Layout;
