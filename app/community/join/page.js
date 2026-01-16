import { Suspense } from "react";
import JoinCommunityClient from "./JoinCommunityClient";
import { GlobalLoader } from "@/app/components/Loader";

export default function JoinCommunityPage() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <JoinCommunityClient />
    </Suspense>
  );
}
