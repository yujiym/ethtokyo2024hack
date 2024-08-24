"use client";
import Link from "next/link";

export default function Card() {
  return (
    <div className="space-y-8 p-6">
      <div className="rounded-2xl shadow-2xl bg-gray-400 hover:opacity-90 min-h-52 flex items-center justify-center">
        <Link href="/explore" className="p-8">
          <div className="text-6xl text-center text-white">+</div>
          <div className="text-3xl text-bold text-white text-center py-2">
            <span className="font-title">PASSPORT</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
