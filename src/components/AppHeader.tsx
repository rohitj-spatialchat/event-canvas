import { ChevronDown } from "lucide-react";

export function AppHeader() {
  return (
    <header className="flex h-14 items-center justify-between bg-card px-4">
      <div className="flex items-center gap-4">
        {/* Removed Acme Corporation button */}
      </div>
      <div className="flex items-center gap-3">
        {/* Removed Billing button from top header */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
          JD
        </div>
        <button className="flex items-center gap-1 text-sm font-medium">
          John Doe
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
