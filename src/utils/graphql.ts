export const productQuery = `
  query ProductQuery($handle: String) {
    product(handle: $handle) {
      id
      handle
      title
      description
      images(first: 1) {
        nodes {
          id
          src
        }
      }
      priceRange {
        maxVariantPrice {
          amount
        }
      }
    }
  }
`
