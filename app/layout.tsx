import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulse — your presence, all in one place",
  description: "A beautiful home for every link that matters.",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }, { url: "/pulse-mark.svg", type: "image/svg+xml" }],
    apple: "/pulse-mark.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
