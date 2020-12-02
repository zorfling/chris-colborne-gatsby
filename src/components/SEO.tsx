/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Helmet, MetaProps } from 'react-helmet';

interface Props {
  description?: string;
  lang?: string;
  meta?: MetaProps[];
  title: string;
}

const SEO: React.FC<Props> = ({
  description = '',
  lang = 'en',
  meta = [
    {
      property: 'og:type',
      content: `website`,
    },
  ],
  title,
}) => {
  const { site } = useStaticQuery<GraphqlTypes.SEOQuery>(
    graphql`
      query SEO {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site?.siteMetadata?.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site?.siteMetadata?.title}`}
      defaultTitle={site?.siteMetadata?.title}
      meta={
        [
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            name: `author`,
            content: `Chris Colborne`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: site?.siteMetadata?.social?.twitter,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          ...meta,
        ] as MetaProps[]
      }
    />
  );
};

export default SEO;
