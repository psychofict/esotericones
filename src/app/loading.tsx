export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-[#EAF4FC] border-t-[#2E86DE] rounded-full animate-spin" />
        <p className="text-sm text-[#1A1A2E]/40">Loading...</p>
      </div>
    </div>
  );
}
