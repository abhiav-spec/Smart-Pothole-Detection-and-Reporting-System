export const metadata = {
  title: "Explore Map — PotholeAI",
  description: "Live spatial map of active potholes and road damage hazards.",
};

import ExploreMap from "@/components/map/ExploreMap";

export default function MapPage() {
  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <ExploreMap />
    </div>
  );
}
