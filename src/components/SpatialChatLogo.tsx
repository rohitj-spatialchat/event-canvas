import logo from "@/assets/logo.png";
import logoIcon from "@/assets/logo-icon.png";

export function SpatialChatLogo({ showText = true }: { showText?: boolean }) {
  return (
    <div className="flex items-center">
      {showText ? (
        <img src={logo} alt="SpatialChat" className="h-7" />
      ) : (
        <img src={logoIcon} alt="SpatialChat" className="h-7 w-7 object-contain" />
      )}
    </div>
  );
}
