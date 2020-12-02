import { Link, graphql, PageProps } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

import { Helmet, MetaProps } from 'react-helmet';
import styled from 'styled-components';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import MailingSignup from '../components/MailingSignup';
import SEO from '../components/SEO';
import { rhythm, scale } from '../utils/typography';

const Title = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`;

const Date = styled.p`
  ${{ ...scale(-1 / 5) }};
  display: block;
  margin-bottom: ${rhythm(1)};
`;

const Separator = styled.hr`
  margin-bottom: ${rhythm(1)};
`;

const Pagination = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const BlogPostTemplate: React.FC<PageProps<
  GraphqlTypes.BlogPostBySlugQuery
>> = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const siteTitle = data.site?.siteMetadata?.title;
  const { previous, next } = pageContext as any;
  const featuredImage = post?.frontmatter?.featuredImage;
  const attribution = post?.frontmatter?.attribution;

  const fluid = post?.frontmatter?.featuredImage?.childImageSharp?.fluid;
  const fluidObject: FluidObject | undefined = fluid
    ? {
        ...fluid,
        base64: fluid.base64 || undefined,
      }
    : undefined;

  const additionalMeta: MetaProps[] = [
    {
      property: 'og:image',
      content: `${data.site?.siteMetadata?.siteUrl}${fluidObject?.src}`,
    },
    {
      property: 'og:type',
      content: `article`,
    },
    {
      property: 'article:published_time',
      content: `${post?.frontmatter?.timestamp}`,
    },
  ];

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet>
        <link
          rel="canonical"
          href={`${data.site?.siteMetadata?.siteUrl}/${post?.fields?.slug}`}
        />
      </Helmet>
      <SEO
        title={post?.frontmatter?.title || ''}
        description={post?.frontmatter?.description || post?.excerpt}
        meta={additionalMeta}
      />
      <article>
        <header>
          <Title>{post?.frontmatter?.title}</Title>
          <Date>{post?.frontmatter?.date}</Date>
        </header>
        {featuredImage && (
          <>
            <Img fluid={fluidObject} />
            <small style={{ display: 'block', marginBottom: '1rem' }}>
              {attribution}
            </small>
          </>
        )}
        <MDXRenderer>{post?.body || ''}</MDXRenderer>
        <Separator />
        <footer>
          <MailingSignup />
          <Bio />
        </footer>
      </article>

      <nav>
        <Pagination>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </Pagination>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        timestamp: date(formatString: "X")
        description
        attribution
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
