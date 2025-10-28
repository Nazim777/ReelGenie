import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: Request) {
  try {
    const { amount, credits, userId } = await req.json();

    if (!amount || !credits || !userId) {
      return NextResponse.json(
        { error: "Missing amount, credits, or userId" },
        { status: 400 }
      );
    }

    // Stripe expects amount in cents
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${credits} Credits Pack`,
              description: `Buy ${credits} credits for your account.`,
            },
            unit_amount: Math.round(amount * 100), // convert dollars → cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}&credits=${credits}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/buy-credits`,
      client_reference_id: userId,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session", error);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: error },
      { status: 500 }
    );
  }
}
