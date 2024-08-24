"use client";
import { Fingerprint } from "lucide-react";

export default function Top() {
  return (
    <>
      <div className="bg-primary text-white w-full h-full items-center justify-center">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="font-title text-[148px]">P</h1>
          <p className="text-2xl">
            PASSPORT is ens based <br />
            membership/community/DAO tool.
          </p>
          <div className="mx-auto max-w-60 space-y-6 mt-32">
            <button className="flex text-bold border-2 border-white rounded-full px-8 py-2 items-center justify-center w-full">
              <Fingerprint size={32} className="mr-4" />
              Register
            </button>
            <button className="flex text-bold border-2 border-white rounded-full px-8 py-2 items-center justify-center w-full">
              <Fingerprint size={32} className="mr-4" />
              Signin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
