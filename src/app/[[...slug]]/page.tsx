"use client";

import nextDynamic from "next/dynamic";

// Force client-side dynamic rendering to prevent static pre-rendering of client routes
export const dynamic = "force-dynamic";

const App = nextDynamic(() => import("../../App"), { ssr: false });

export default function CatchAllPage() {
  return <App />;
}
