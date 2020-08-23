import { Link, graphql, PageProps } from 'gatsby';
import React, { FC } from 'react';

import styled from 'styled-components';
import { AboutPageQuery } from '../../graphql-types';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm } from '../utils/typography';

const Container = styled.div`
  display: flex;

  @media (max-width: 700px) {
    flex-direction: column;
  }
  @media (max-width: 415px) {
    align-items: center;
  }
`;

const Title = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`;

const Intro = styled.div`
  margin-top: 1.75rem;

  & p {
    margin-bottom: 0;
  }
`;

const Callout = styled.h2`
  margin-top: ${rhythm(1 / 4)};
  margin-bottom: ${rhythm(1 / 4)};
`;

const Photo = styled.img`
  margin-right: 3rem;
  min-width: 175px;

  @media (max-width: 700px) {
    margin-right: 0;
    margin-bottom: 0;
  }
`;

const age = new Date().getFullYear() - 2013;

const AboutPage: FC<PageProps<AboutPageQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About Me" />
      <Title>About Me</Title>
      <Container>
        <Photo
          src="https://secure.gravatar.com/avatar/13dbc56733c2cc66fbc698cdb07fec12?s=175"
          width="175"
          height="175"
          alt="Photo of Chris Colborne"
        />
        <Intro>
          <Callout>Hi, I'm Chris Colborne.</Callout>
          <p>
            I'm a Web Developer from Brisbane, Australia. I specialise in
            building custom web applications, primarily with PHP and JavaScript.
          </p>
        </Intro>
      </Container>
      <p>
        I'm also a father to a beautiful {age} year old daughter, and husband to
        a crazy Hungarian.
      </p>

      <p>
        I post here about whatever occupies my mind, but it will be mostly tech.
      </p>
      <p>
        You can find me on{' '}
        <Link to="https://twitter.com/zorfling">Twitter</Link>,{' '}
        <Link to="https://www.facebook.com/zorfling">Facebook</Link>,{' '}
        <Link to="https://au.linkedin.com/in/chriscolborne">LinkedIn</Link> and{' '}
        <Link to="https://github.com/zorfling">GitHub</Link>. Or feel free to
        drop me an email at chris (at) chriscolborne.com.
      </p>
    </Layout>
  );
};

export default AboutPage;

export const pageQuery = graphql`
  query AboutPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
