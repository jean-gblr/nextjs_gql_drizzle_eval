"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  {
    name: "Kanban",
    href: "/kanban",
  },
];

export function NavbarComponent() {
  const pathname = usePathname();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-gray-600">
          Task Manager
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <div className="flex items-center space-x-4 text-lg">
          {links.map((link) => (
            <Navbar.Link
              key={link.name}
              as={Link}
              href={link.href}
              active={pathname === link.href}
            >
              {link.name}
            </Navbar.Link>
          ))}
          <DarkThemeToggle />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
