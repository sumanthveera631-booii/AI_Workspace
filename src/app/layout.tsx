import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "@/components/layout/root-layout-client";

export const metadata: Metadata = {
  title: "AI Workspace",
  description: "Next generation AI workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground overflow-x-hidden">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}