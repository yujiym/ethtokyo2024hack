"use client";
import Menu from "../../components/Menu";
import AddCard from "../../components/AddCard";

export default function Home() {
  return (
    <div className="h-full">
      <div className="wrapper">
        <AddCard />
        <Menu />
      </div>
    </div>
  );
}
