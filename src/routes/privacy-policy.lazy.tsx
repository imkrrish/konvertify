import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/privacy-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/privacy-policy"!</div>;
}
