import { Link, graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

import styled from 'styled-components';
import { BlogPostBySlugQuery } from '../../graphql-types';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
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

const BlogPostTemplate: React.FC<PageProps<BlogPostBySlugQuery>> = ({
  data,
  pageContext,
  location,
}) => {
  const post = data.mdx;
  const siteTitle = data.site?.siteMetadata?.title;
  const { previous, next } = pageContext as any;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post?.frontmatter?.title || ''}
        description={post?.frontmatter?.description || post?.excerpt}
      />
      <article>
        <header>
          <Title>{post?.frontmatter?.title}</Title>
          <Date>{post?.frontmatter?.date}</Date>
        </header>
        <MDXRenderer>{post?.body || ''}</MDXRenderer>
        <Separator />
        <footer>
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
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;