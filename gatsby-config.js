module.exports = {
  siteMetadata: {
    title: 'Chris Colborne',
    author: {
      name: 'Chris Colborne',
      summary: 'an Aussie software engineer from Brisbane, Australia.',
    },
    description: 'An Aussie software engineer, talking tech and more.',
    siteUrl: 'https://chriscolborne.com',
    social: {
      twitter: 'zorfling',
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Solarized Dark', // Or install your favorite theme from GitHub
              extensions: ['twig-language', 'graphql-for-vscode'], // From package.json: name
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
        plugins: [`gatsby-remark-images`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-1359868-4`,
      },
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `
              {
                allMdx(sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {status: {ne: "DRAFT"}}}) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'chriscolborne.com',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chris Colborne`,
        short_name: `Chris Colborne`,
        start_url: `/`,
        background_color: `#bec3d2`,
        theme_color: `#bec3d2`,
        display: `standalone`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://chriscolborne.com`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: true,
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        namespace: 'GraphqlTypes',
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-PSM2894',
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(filter: {context: {status: {ne: "DRAFT"}}, path: {regex: "/^(?!/(dev-404-page|404|offline-plugin-app-shell-fallback)).*$/"}}) {
            edges {
              node {
                path
              }
            }
          }
        }`,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Open Sans',
              variants: ['700'],
              // subsets: ['latin']
              // text: 'Hello'
              // fontDisplay: 'swap',
              // strategy: 'selfHosted' // 'base64' || 'cdn'
            },
            {
              family: 'Merriweather',
              variants: ['300', '300i', '700', '700i'],
              // subsets: ['latin']
              // text: 'Hello'
              // fontDisplay: 'swap',
              // strategy: 'selfHosted' // 'base64' || 'cdn'
            },
          ],
        },
        // formats: ['woff2', 'woff'],
        // useMinify: true,
        // usePreload: true,
        // usePreconnect: false,
      },
    },
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn:
          'https://98ba23f094444aadba4b46a9e934b45a@o235038.ingest.sentry.io/5714563',
        tracesSampleRate: 1,
      },
    },
    {
      resolve: `gatsby-plugin-amplitude-analytics`,
      options: {
        // Specify the API key for your Amplitude Project (required)
        apiKey: '2b6c6ca8e11a7afca23e5929a535b646',
        // Puts tracking script in the head instead of the body (optional)
        head: false,
        // Prevents loading Amplitude and logging events if visitors have "Do Not Track" enabled (optional)
        respectDNT: true,
        // Avoids sending pageview hits from custom paths (optional)
        // exclude: ['/preview/**', '/do-not-track/me/too/'],
        // Override the default event types (optional)
        eventTypes: {
          outboundLinkClick: 'OUTBOUND_LINK_CLICK',
          pageView: 'PAGE_VIEW',
        },
        // Amplitude JS SDK configuration options (optional)
        amplitudeConfig: {
          saveEvents: true,
          includeUtm: true,
          includeReferrer: true,
        },
        // Specify NODE_ENVs in which the plugin should be loaded (optional)
        environments: ['production'],
      },
    },
  ],
};
