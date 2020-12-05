import { graphql, PageProps } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import React, { FC } from 'react';

import styled from 'styled-components';
import { CoursesPageQuery } from '../../graphql-types';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm } from '../utils/typography';

const Title = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`;

const CoursesPage: FC<PageProps<CoursesPageQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Recommended Courses" />
      <Title>Recommended Courses</Title>
      <div>
        <h1>Courses</h1>
        <p>
          I can thoroughly recommend all of Wes Bos' courses. I've personally
          bought almost all of them and found his style of project based
          teaching really works well for me. Give one of his free courses a try
          and see if you like his style too.
        </p>
        <h2>JavaScript</h2>
        <ul>
          <li>
            <OutboundLink href="https://BeginnerJavaScript.com/friend/JS4PHP">
              Beginner JavaScript
            </OutboundLink>
          </li>
          <li>
            <OutboundLink href="https://javascript30.com/friend/JS4PHP">
              JavaScript30 (FREE)
            </OutboundLink>
          </li>
          <li>
            <OutboundLink href="https://ES6.io/friend/JS4PHP">
              ES6+ For Everyone
            </OutboundLink>
          </li>
        </ul>
        <h2>React</h2>
        <ul>
          <li>
            <OutboundLink href="https://ReactForBeginners.com/friend/JS4PHP">
              React for Beginners
            </OutboundLink>
          </li>
          <li>
            <OutboundLink href="https://AdvancedReact.com/friend/JS4PHP">
              Fullstack Advanced React and GraphQL
            </OutboundLink>
          </li>
          <li>
            <OutboundLink href="https://learnredux.com/friend/JS4PHP">
              Learn Redux (FREE)
            </OutboundLink>
          </li>
        </ul>
        <h2>Node</h2>
        <ul>
          <li>
            <OutboundLink href="https://LearnNode.com/friend/JS4PHP">
              Learn Node
            </OutboundLink>
          </li>
        </ul>
        <h2>CSS</h2>
        <ul>
          <li>
            <OutboundLink href="https://flexbox.io/friend/JS4PHP">
              What the Flexbox?! (FREE)
            </OutboundLink>
          </li>
          <li>
            <OutboundLink href="https://cssgrid.io/friend/JS4PHP">
              CSS Grid (FREE)
            </OutboundLink>
          </li>
        </ul>
        <p>
          PS: The above are affiliate links - I recommended Wes' courses so
          often to friends and workmates that I signed up as an affiliate. It
          doesn't cost you any more, and just says thanks for the tip!
        </p>
      </div>
    </Layout>
  );
};

export default CoursesPage;

export const pageQuery = graphql`
  query CoursesPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
