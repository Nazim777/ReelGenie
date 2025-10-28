"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserDetailContext } from "@/app/_context/UserDetailContext";
import {toast} from 'sonner'

export default function SuccessPage() {
  const params = useSearchParams();
  const sessionId = params?.get("session_id");
  const credits = Number(params?.get("credits") || 0);
  const router = useRouter();
  const { userDetail, setUserDetail } = useUserDetailContext();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !userDetail?.id || !credits) return;

      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            userId: userDetail.id,
            credits,
          }),
        });
        const data = await res.json();

        if (data.success) {
          router.push("/dashboard");
        } else {
          toast.error("Payment verification failed. Please contact support.");
          console.error("Payment not verified:", data.error);
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        toast.error("Payment verification failed. Please contact support.");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, credits, userDetail, router, setUserDetail]);

  return (
    <div className="p-6 text-center">
      {isVerifying ? (
        <h2 className="text-xl text-gray-500">Verifying your payment...</h2>
      ) : (
        <h2 className="text-2xl font-bold text-green-600">
          🎉 Payment Successful!
        </h2>
      )}
      <p>You purchased {credits} credits.</p>
    </div>
  );
}
