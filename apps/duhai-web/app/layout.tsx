import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://duhai.pk"),
  title: {
    default: "Duhai | Lawyer-reviewed legal notices for Pakistan",
    template: "%s | Duhai"
  },
  description:
    "Tell us what happened. Duhai prepares a structured legal notice for Pakistan and routes it for lawyer review before delivery."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
