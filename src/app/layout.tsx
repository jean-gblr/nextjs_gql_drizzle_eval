import type { Metadata } from "next";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";
import { NavbarComponent } from "./ui/Navbar";
import { ApolloWrapper } from "./ApolloWrapper";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Track your tasks in a simple and efficient way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className="dark:bg-gray-900">
        <NavbarComponent />
        <div className="p-4">
          <ApolloWrapper>{children}</ApolloWrapper>
        </div>
      </body>
    </html>
  );
}
