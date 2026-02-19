import logo from "@/assets/logo.png";

export function SpatialChatLogo({ showText = true }: { showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt="SpatialChat"
        className={showText ? "h-7" : "h-6 w-6 object-contain object-left"}
        style={!showText ? { clipPath: "inset(0 60% 0 0)" } : undefined}
      />
    </div>
  );
}
