import { loadStripe } from "@stripe/stripe-js";

let stripePromised;

const getStripe = () => {
  if (!stripePromised)
    stripePromised = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

  return stripePromised;
};
export default getStripe;