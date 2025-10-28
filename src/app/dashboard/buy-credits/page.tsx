// 'use client'
// import { useUserDetailContext } from "@/app/_context/UserDetailContext"
// import { Button } from "@/components/ui/button"
// import { db } from "@/config/db"
// import { Users } from "@/config/schema"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// type BuyCreditsProps = {
//   credits?: number
//   amount?: number
// }

// const BuyCreditsPage = () => {
//   const [selectedOption, setSelectedOption] = useState<BuyCreditsProps | null>(null)
//   const router = useRouter()

//   const { userDetail, setUserDetail } = useUserDetailContext()

//   const creditsOption = [
//     { credits: 10, amount: 2.99 },
//     { credits: 20, amount: 5.99 },
//     { credits: 30, amount: 8.99 },
//     { credits: 50, amount: 11.99 },
//     { credits: 100, amount: 20.99 }
//   ];

//   const onPaymentSuccess = async () => {
//     console.log("Payment Success");
//     // Update user details db
//     if (selectedOption) {
//       const result = await db.update(Users).set({
//         credits: (userDetail?.credits || 0) + (selectedOption?.credits || 0)
//       }).returning({ id: Users.id })

//       if (result) {
//         setUserDetail(prev => ({
//           ...prev,
//           credits: (userDetail?.credits || 0) + (selectedOption?.credits || 0)
//         }))
//         router.push('/dashboard')
//       }
//     }
//   }

//   return (
//     <div>
//       <h2 className="font-bold text-2xl">Buy More Credits</h2>
//       <p>Unlock endless possibilities - Buy more credits to create your ideal videos!✨</p>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-6">
//         {creditsOption.map((item, idx) => (
//           <div key={idx} className={`flex flex-col gap-2 justify-center items-center border border-lightgray p-4 md:py-7 md:px-5 rounded-lg max-w-[230px]
//             ${selectedOption?.credits == item.credits && 'border-primary'}`}>

//             <h2 className="font-bold text-3xl">{item.credits}</h2>
//             <h2 className="font-medium text-xl">Credits</h2>
//             <Button className="w-full" onClick={() => setSelectedOption(item)}>
//               Select
//             </Button>
//             <h2 className="font-medium text-primary">${item.amount}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default BuyCreditsPage





'use client';

import { useUserDetailContext } from "@/app/_context/UserDetailContext";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

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
    <div className="p-6">
      <h2 className="font-bold text-2xl mb-4">Buy More Credits</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {creditsOption.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelected(item)}
            className={`border rounded-lg p-4 cursor-pointer text-center ${
              selected?.credits === item.credits ? "border-primary" : "border-gray-300"
            }`}
          >
            <h3 className="text-2xl font-bold">{item.credits}</h3>
            <p className="text-gray-600">${item.amount}</p>
          </div>
        ))}
      </div>

      <Button
        onClick={handleCheckout}
        disabled={!selected || loading}
        className="mt-6"
      >
        {loading ? "Processing..." : `Buy ${selected?.credits || ""} Credits`}
      </Button>
    </div>
  );
}
