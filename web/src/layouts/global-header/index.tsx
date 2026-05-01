// Import components
import ProtectedRoute from "@/components/protected-route";
import GlobalHeader from "@/components/global-header";

export default function GlobalHeaderLayout() {
  return (
    <>
      <GlobalHeader />
      <ProtectedRoute />
    </>
  );
}
