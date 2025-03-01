"use client";

import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-[#B7B1F2] text-black flex justify-between items-center h-16 px-16">
      <div className="brand flex items-center gap-1">
        <span className="font-bold text-lg">
          <Link href={"/"}>TodoList</Link>
        </span>
      </div>

      <ul className="flex justify-between items-center gap-4">
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        <li>About</li>

        {session ? (
          <li>
            <button className="bg-black text-white p-2 px-3 rounded-2xl hover:cursor-pointer" onClick={() => signOut()}>Sign out</button>
          </li>
        ) : (
          <li>
            <button className="bg-black text-white p-2 px-3 rounded-2xl hover:cursor-pointer" onClick={() => signIn("google")}>Sign in</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
