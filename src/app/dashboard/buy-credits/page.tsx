



'use client';

import { useUserDetailContext } from "@/app/_context/UserDetailContext";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const creditsOption = [
  { credits: 10, amount: 2.99 },
  { credits: 20, amount: 5.99 },
  { credits: 30, amount: 8.99 },
  { credits: 50, amount: 11.99 },
  { credits: 100, amount: 20.99 },
];

export default function BuyCreditsPage() {
  const { userDetail } = useUserDetailContext();
  const [selected, setSelected] = useState<{ credits: number; amount: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!selected || !userDetail?.id) {
      alert("Please select a credit pack and make sure you are logged in.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selected.amount,
          credits: selected.credits,
          userId: userDetail.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Failed to load Stripe");

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.error(err);
      alert("Error starting checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="font-bold text-3xl mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Buy More Credits 💳
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {creditsOption.map((item, i) => (
          <motion.div
            key={i}
            onClick={() => setSelected(item)}
            className={`relative border rounded-2xl p-6 cursor-pointer text-center bg-white shadow-sm hover:shadow-lg transition-all ${
              selected?.credits === item.credits
                ? "border-primary scale-105 shadow-md"
                : "border-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-2xl font-semibold">{item.credits} Credits</h3>
            <p className="text-gray-600 mt-2">${item.amount}</p>

            {/* Animated check mark */}
            <AnimatePresence>
              {selected?.credits === item.credits && (
                <motion.div
                  className="absolute top-2 right-2 text-primary"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ✅
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleCheckout}
            disabled={!selected || loading}
            className="px-6 py-3 text-lg"
          >
            {loading
              ? "Processing..."
              : selected
              ? `Buy ${selected.credits} Credits`
              : "Select a Credit Pack"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
