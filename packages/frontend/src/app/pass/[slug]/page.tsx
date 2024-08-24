"use client";
import Menu from "../../../components/Menu";

export default function PassPage({ params }: { params: { slug: string } }) {
  return (
    <div className="h-full">
      <div className="wrapper">
        <div className="rounded-2xl shadow-2xl bg-red-400 hover:opacity-90 min-h-52 flex items-center justify-center">
          <div className="p-6 text-white">{params.slug}</div>
        </div>
        <Menu />
      </div>
    </div>
  );
}
