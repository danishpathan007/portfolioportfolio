export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[410px] w-[200px] overflow-hidden rounded-t-[32px] border-x-[6px] border-t-[6px] border-[#1c2029] bg-[#11141b] shadow-[0_-18px_60px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
      <div className="absolute left-1/2 top-2 z-[2] h-4 w-16 -translate-x-1/2 rounded-full bg-[#1c2029]" />
      {children}
    </div>
  );
}
