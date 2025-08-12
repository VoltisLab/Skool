import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import ConditionalNavbar from "./conditionNavbar";

export const metadata: Metadata = {
  title: "Skool App",
  description: "A community learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sfpro">
        <Providers>
          <ConditionalNavbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
