import { ChevronDown, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function AppHeader() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="flex h-14 items-center justify-between bg-card px-6">
      <div />
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button className="flex items-center gap-2 rounded-full border border-border pl-1 pr-3 py-1 hover:bg-muted transition-colors">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
            AS
          </div>
          <span className="text-sm font-medium">Arty Starr</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
