import { Link, graphql, PageProps } from 'gatsby';
import React from 'react';

import styled from 'styled-components';
import { BlogIndexQuery } from '../../graphql-types';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { rhythm } from '../utils/typography';

const PostTitle = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`;

const BlogIndex: React.FC<PageProps<BlogIndexQuery>> = ({ data, location }) => {
  const siteTitle = data.site?.siteMetadata?.title;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="" />
      <Bio />
      {posts.map(({ node }, idx) => {
        const title = node.frontmatter?.title || node.fields?.slug;
        const slug = node.fields?.slug || `${idx}`;
        return (
          <article key={slug}>
            <header>
              <PostTitle>
                <Link to={slug}>{title}</Link>
              </PostTitle>
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
          }
        }
      }
    }
  }
`;
