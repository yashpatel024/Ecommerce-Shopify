import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
)

// INFO: As react-stripe-js does not support server-side rendering, Going to hold on Options for now
const options = {
  clientSecret: process.env.STRIPE_SECRET_KEY!,
  // stripeAccount: process.env.NEXT_PUBLIC_STRIPE_ACCOUNT!,
}

export { stripePromise, options }
