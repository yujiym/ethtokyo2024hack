"use client";
import Link from "next/link";
import Menu from "../../components/Menu";
import { CLUBS } from "../../utils/const";
import { cn } from "../../utils/lib";

export default function Explore() {
  return (
    <div className="h-full">
      <div className="wrapper">
        <div className="p-6 space-y-8">
          <input type="search" className="w-full rounded-xl h-12 px-4" />
          {CLUBS.map((club) => (
            <Link key={club.ens} href={`/pass/${club.ens}`}>
              <div
                className={cn(
                  "rounded-2xl shadow-2xl pt-8 px-8 mb-8",
                  club.color
                )}
              >
                <div className="text-6xl text-center">{club.emoji}</div>
                <div className="text-3xl text-bold text-white text-center py-2">
                  {club.name}
                </div>
                <div className="font-barcode text-white text-5xl text-center mt-10">
                  {club.barcode}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Menu />
      </div>
    </div>
  );
}
