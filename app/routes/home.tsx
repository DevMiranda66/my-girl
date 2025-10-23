import type { Route } from "./+types/home";
import DashboardPage from "./DashboardPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MY-GIRL-CAMI" },
    { name: "description", content: "Welcome to my love!" },
  ];
}

export default function Home() {
  return <DashboardPage />;
}

