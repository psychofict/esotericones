export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-[#2A2A2A] border-t-[#E8385D] rounded-full animate-spin" />
        <p className="text-sm text-white/40">Loading...</p>
      </div>
    </div>
  );
}
