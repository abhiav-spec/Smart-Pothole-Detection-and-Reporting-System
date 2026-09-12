export const metadata = {
  title: "Potholes — PotholeAI",
  description: "Detailed catalog of detected potholes and status lifecycles.",
};

export default function PotholesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-on-surface">Potholes Catalog</h1>
      <p className="text-on-surface-variant mt-2">Manage and view reported pothole records.</p>
    </div>
  );
}
