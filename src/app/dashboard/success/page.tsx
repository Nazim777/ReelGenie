import { Suspense } from "react";
import SuccessPage from "./SuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
