import { ModeToggle } from "@/components/ModeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-1 border-b">
      <div>WebRTC Example</div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <LocaleSwitcher />
      </div>
    </div>
  );
};
