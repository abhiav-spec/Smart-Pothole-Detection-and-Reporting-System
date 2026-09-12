export const metadata = {
  title: "AI Detection — PotholeAI",
  description: "AI-powered camera capture and neural segmentation pipeline.",
};

export default function DetectPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-on-surface">AI Detection Pipeline</h1>
      <p className="text-on-surface-variant mt-2">Upload road footage or capture image for YOLOv8 analysis.</p>
    </div>
  );
}
