# Next.js E-commerce Platform with Shopify Integration

## Project Overview

This project is an ongoing migration of an e-commerce platform from WordPress/WooCommerce to a modern tech stack using Next.js, TypeScript, and Shopify API. The goal is to create a high-performance, SEO-friendly e-commerce solution with improved user experience.

## Features

- **Modern Tech Stack**: Built with Next.js, TypeScript, and Shopify API
- **Server-Side Rendering**: Improved performance and SEO
- **Responsive Design**: Mobile-friendly interface
- **Product Management**: Display and manage products from Shopify
- **Cart Functionality**: Add to cart and manage cart items
- **Checkout Process**: Integrated with Shopify's checkout system
- **SEO Optimization**: Implemented metadata, sitemaps, and robots.txt
- **Stripe Payment Gateway**: Integrated with Stripe for secure payment processing

## Work in Progress

- Blog integration using Strapi CMS
- Enhanced category and tag management
- Recommendation engine for products
- Further SEO improvements
- UI/UX enhancements using Shadcn UI
- API Rate Limiting: Implement to prevent overuse of Shopify API
- Content migration (including metadata)
- Implementation of missing sections (e.g., favorites, advanced filtering)
- Automated testing setup (Jest, React Testing Library, Cypress)
- Debugging in Next.js
- Structured Data: JSON-LD implementation for better search engine understanding
- Pagination: For product listings and search results
- URL Remapping: For improved SEO and user-friendly URLs

## Dependencies

- Next.js ^14.2.7
- React ^18
- TypeScript ^5
- @shopify/shopify-api ^11.4.0
- Shadcn UI
- Jest ^29.7.0
- React Testing Library ^14.0.0

## API Endpoints

- `/api/products`: Fetch products from Shopify
- `/api/cart`: Manage cart operations
- `/api/checkout`: Handle checkout process

## Environment Variables

```
# Upstash KV Store - Vercel based Redis alternative
KV_REST_API_READ_ONLY_TOKEN=your_kv_read_only_token
KV_REST_API_TOKEN=your_kv_api_token
KV_REST_API_URL=your_kv_api_url
KV_URL=your_kv_url

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Shopify
SHOPIFY_ADMIN_API_ACCESS_TOKEN=your_shopify_admin_api_access_token
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET_KEY=your_shopify_api_secret_key
SHOPIFY_DOMAIN=your_shopify_domain
SHOPIFY_SHOP_NAME=your_shopify_shop_name
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_shopify_storefront_access_token

# WooCommerce (if still needed)
WOOCOMMERCE_CONSUMER_KEY=your_woocommerce_consumer_key
WOOCOMMERCE_CONSUMER_SECRET=your_woocommerce_consumer_secret
WOOCOMMERCE_URL=your_woocommerce_url

# Deployment
PRODUCTION_URL=your_production_url
VERCEL_URL=your_vercel_url
```

## How to Run the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see above)
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

- Run unit tests: `npm run test`
- Run end-to-end tests: (To be implemented with Cypress)

## Known Issues

- There are some linter errors in the test files that need to be addressed.
- The `next` package has a known high severity vulnerability that needs to be investigated and resolved.

### This project is continuously evolving, with a focus on creating a robust, performant, and SEO-friendly e-commerce platform using modern web technologies.
