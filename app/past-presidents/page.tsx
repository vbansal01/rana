import { redirect } from "next/navigation";

export default function PastPresidentsRedirect() {
  redirect("/about#past-presidents");
}
