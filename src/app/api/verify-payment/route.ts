import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/config/db";
import { Users, Payments } from "@/config/schema";
import { eq,sql } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: Request) {
  try {
    const { sessionId, userId, credits } = await req.json();

    if (!sessionId || !userId || !credits) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Verify Stripe session is paid
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { success: false, error: "Payment not completed" },
        { status: 400 }
      );
    }

    // ✅ Check if already credited (via Payments table)
    const existingPayment = await db
      .select()
      .from(Payments)
      .where(eq(Payments.sessionId, sessionId))
      .limit(1);

    if (existingPayment.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Already processed",
      });
    }

    // ✅ Update user credits
  const udpatedUser=  await db
      .update(Users)
      .set({
        credits: sql`${Users.credits} + ${credits}`,
      })
      .where(eq(Users.id, userId)).returning({
    id: Users.id,
    name: Users.name,
    email: Users.email,
    imageUrl: Users.imageUrl,
    credits: Users.credits,
  });;

    // ✅ Record the payment
    await db.insert(Payments).values({
      sessionId,
      userId,
      credits,
    });

    return NextResponse.json({ success: true,user:udpatedUser[0]});
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
