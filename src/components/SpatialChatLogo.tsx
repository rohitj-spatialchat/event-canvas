export function SpatialChatLogo({ showText = true }: { showText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* SpatialChat S-mark: two opposing arcs forming an S, dark→blue gradient */}
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.5 1C10 1 5.5 3.5 5.5 7.5c0 4 4.5 5 8.5 6s6 2.5 6 5.5c0 3.5-4 6-9 6"
          stroke="url(#s-grad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id="s-grad" x1="11" y1="0" x2="11" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2D3436" />
            <stop offset="0.6" stopColor="#3B82C4" />
            <stop offset="1" stopColor="#56B4F9" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span className="text-[17px] font-semibold tracking-tight text-foreground">
          SpatialChat
        </span>
      )}
    </div>
  );
}
