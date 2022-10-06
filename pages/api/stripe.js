
import Stripe from 'stripe'
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log('body',req.body)
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
          shipping_options: [
            { shipping_rate: "shr_1LpwSIEWIR3JUZEEXnjINeAr" },
            { shipping_rate: "shr_1LpwTAEWIR3JUZEEjMBfOpPv" },
          ],
          line_items: req.body?.map((item) => {        
            const img = item.image[0].asset._ref;
            console.log(img)
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
    
            return {
              price_data: {
                currency: "aed",
                product_data: {
                  name: item.name,
                  images: [newImage],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled:true,
                minimum: 1,
              },
              quantity: item.quantity,
            }
          }),
          
          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}`,
        };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      console.log(session)
      res.status(200).json(session)
    } catch (err) {
        console.log('error',err.message)
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
