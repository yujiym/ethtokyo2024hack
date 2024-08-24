import Link from "next/link";
import { SquareUserRound, Search, Cog } from "lucide-react";
import Logo from "./Logo";

export default function Menu() {
  return (
    <nav className="px-6 fixed bottom-6 right-1/2 translate-x-1/2 w-full max-w-screen-sm">
      <ul className="bg-primary z-50 text-white rounded-lg h-16 flex items-center px-10 space-x-10 shadow-2xl justify-between">
        <div className="shrink-0">
          <Logo />
        </div>
        <li className="pl-6">
          <Link href="/home">
            <SquareUserRound size={32} />
          </Link>
        </li>
        <li>
          <Link href="/explore">
            <Search size={32} />
          </Link>
        </li>
        <li>
          <Link href="/setting">
            <Cog size={32} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
