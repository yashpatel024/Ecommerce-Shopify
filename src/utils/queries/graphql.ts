export const createProductQuery = `
  mutation createProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
        handle
        descriptionHtml
        variants(first: 1) {
          edges {
            node {
              id
              price
            }
          }
        }
        images(first: 1) {
          edges {
            node {
              id
              src
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`
