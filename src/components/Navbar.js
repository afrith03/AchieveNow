import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="navbar bg-primary text-neutral-content z-50">
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl">AchieveNow</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><Link href="/RandomPics">Image Discovery</Link></li>
        <li><Link href="/Todo">Todo</Link></li>
        <li><Link href="/workspace">Work space</Link></li>
       
      </ul>
    </div>
  </div>
  );
}

export default Navbar;
