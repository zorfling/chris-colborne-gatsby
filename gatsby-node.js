const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/BlogPostTemplate.tsx`);
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                status
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges;

  posts.forEach((post, index) => {
    let previous = null;
    let next = null;
    let checkIndex = index - 1;
    while (checkIndex >= 0 && previous === null) {
      if (posts[checkIndex].node.frontmatter.status !== 'DRAFT') {
        previous = posts[checkIndex].node;
      }
      checkIndex--;
    }

    checkIndex = index + 1;
    while (checkIndex < posts.length && next === null) {
      if (posts[checkIndex].node.frontmatter.status !== 'DRAFT') {
        next = posts[checkIndex].node;
      }
      checkIndex++;
    }

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: node.frontmatter.path || value,
    });
  }
};
