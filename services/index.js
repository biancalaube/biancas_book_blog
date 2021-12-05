// this file has all the graphql request to graphcms to get the data for the webpage

import { request, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

//gets all the nessccary components for a post experts
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

//gets the categories on the webpage
export const getCategories = async () => {
  const query = gql`
    query GetGategories {
        categories {
          name
          slug
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

// gets post details
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

// gets post for the widgets and gets posts in the same category
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

//get posts for the main page
export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

//gets all the posts in a specific category
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

//gets all the featured posts
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

//sends cooment via gql
export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

//receieved all the comments for a specific post
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

//gets the last 3 recent post created for the widget
export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};