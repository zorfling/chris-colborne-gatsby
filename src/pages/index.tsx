import { Link, graphql, PageProps } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React from 'react';

import styled from 'styled-components';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm } from '../utils/typography';

const PostTitle = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`;

const BlogIndex: React.FC<PageProps<GraphqlTypes.BlogIndexQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site?.siteMetadata?.title;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="" />
      <Bio />
      {posts.map(({ node }, idx) => {
        const title = node.frontmatter?.title || node.fields?.slug;
        const slug = node.fields?.slug || `${idx}`;

        const fluid = node.frontmatter?.featuredImage?.childImageSharp?.fluid;
        const fluidObject: FluidObject | undefined = fluid
          ? {
              ...fluid,
              base64: fluid.base64 ?? undefined,
            }
          : undefined;
        return (
          <article key={slug}>
            {idx > 0 ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <hr
                  style={{
                    width: '25%',
                    marginBottom: '0',
                    marginTop: '1.5rem',
                  }}
                />
              </div>
            ) : null}
            <header>
              <PostTitle>
                <Link to={slug}>{title}</Link>
              </PostTitle>
              {fluid && (
                <Link to={slug}>
                  <Img fluid={fluidObject} />
                </Link>
              )}
              <small>{node.frontmatter?.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter?.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { status: { eq: "PUBLISHED" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
