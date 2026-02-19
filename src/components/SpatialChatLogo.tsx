export function SpatialChatLogo({ showText = true }: { showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14c3.866 0 7.39-1.568 9.932-4.104A13.953 13.953 0 0030 16c0-7.732-6.268-14-14-14z" fill="url(#logo-gradient)" />
        <path d="M12 10c-1.657 0-3 1.343-3 3s1.343 3 3 3h8c1.657 0 3 1.343 3 3s-1.343 3-3 3h-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="logo-gradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2D3748" />
            <stop offset="1" stopColor="#4F9CF7" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
          SpatialChat
        </span>
      )}
    </div>
  );
}
