import { graphql, PageProps } from 'gatsby';
import Image, { FixedObject } from 'gatsby-image';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import React, { FC } from 'react';

import styled from 'styled-components';
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
`;

const Callout = styled.h2`
  margin-top: ${rhythm(1 / 4)};
  margin-bottom: ${rhythm(1 / 4)};
`;

const StyledImage = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0px;
  min-width: 175px;
  border-radius: 100%;

  @media (max-width: 700px) {
    margin-right: 0;
  }
`;

const age = new Date().getFullYear() - 2013;

const AboutPage: FC<PageProps<GraphqlTypes.AboutPageQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site?.siteMetadata?.title;
  const author = data.site?.siteMetadata?.author;

  const fixed = data.avatar?.childImageSharp?.fixed;
  const fixedObject: FixedObject | undefined = fixed
    ? { ...fixed, base64: fixed.base64 ?? undefined }
    : undefined;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About Me" />
      <Title>About Me</Title>
      <Container>
        <StyledImage
          fixed={fixedObject}
          alt={author?.name ?? ''}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <Intro>
          <Callout>Hi, I'm Chris Colborne.</Callout>
          <p>
            I'm a Web Developer from Brisbane, Australia{' '}
            <span role="img" aria-label="Australian flag">
              🇦🇺
            </span>
            . I specialise in building custom web applications with TypeScript.
          </p>
        </Intro>
      </Container>
      <p>
        I'm also a father to a beautiful {age} year old daughter.
      </p>

      <p>
        I post here about whatever occupies my mind, but it will be mostly tech.
      </p>
      <p>
        You can find me on{' '}
        <OutboundLink href="https://twitter.com/zorfling">Twitter</OutboundLink>
        ,{' '}
        <OutboundLink href="https://www.facebook.com/zorfling">
          Facebook
        </OutboundLink>
        ,{' '}
        <OutboundLink href="https://au.linkedin.com/in/chriscolborne">
          LinkedIn
        </OutboundLink>{' '}
        and{' '}
        <OutboundLink href="https://github.com/zorfling">GitHub</OutboundLink>.
        Or feel free to drop me an email at chris (at) chriscolborne.com.
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
        author {
          name
        }
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 175, height: 175) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
