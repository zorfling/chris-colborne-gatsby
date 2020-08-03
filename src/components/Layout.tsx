import { PageRendererProps } from 'gatsby';
import React from 'react';

import styled from 'styled-components';
import { rhythm } from '../utils/typography';
import HeaderHome from './Header/HeaderHome';
import HeaderInner from './Header/HeaderInner';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`;

const Footer = styled.footer`
  font-size: 0.75rem;
`;

interface Props extends PageRendererProps {
  title?: string | null;
  children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;

  const safeTitle = title || '';
  const header =
    location.pathname === rootPath ? (
      <HeaderHome title={safeTitle} />
    ) : (
      <HeaderInner title={safeTitle} />
    );
  return (
    <Wrapper>
      <header>{header}</header>
      <main>{children}</main>
      <Footer>Chris Colborne © {new Date().getFullYear()}</Footer>
    </Wrapper>
  );
};

export default Layout;
