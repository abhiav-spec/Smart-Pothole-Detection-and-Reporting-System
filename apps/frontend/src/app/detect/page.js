import ReportPotholePage from "@/components/detection/ReportPotholePage";

export const metadata = {
  title: "PotholeAI — Report a Road Hazard",
  description: "Snap a photo and confirm your location to report potholes directly to municipal maintenance crews.",
};

export default function DetectPage() {
  return <ReportPotholePage />;
}
