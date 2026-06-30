
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// import "./globals.css";
import { QueryClientProviderWrapper } from "./queryclientprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://joincloud.cloud"),

  title: "JoinCloud - Your System, Your Cloud. Share Files Instantly",
  description:
    "Share files globally, directly from your own device in minutes, no cloud uploads. Turn your system into a personal cloud. Join the waitlist now.",

  openGraph: {
    type: "website",
    url: "https://joincloud.cloud",
    siteName: "JoinCloud",
    title: "JoinCloud - Your System, Your Cloud. Share Files Instantly",
    description:
      "Share files globally, directly from your own device in minutes, no cloud uploads. Turn your system into a personal cloud. Join the waitlist now.",
    images: [
      {
        url: "/og-image.jpg", // resolves to https://joincloud.cloud/og-image.jpg
        width: 1200,
        height: 630,
        alt: "JoinCloud - Your System, Your Cloud. Share files directly from your device.",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "JoinCloud - Your System, Your Cloud. Share Files Instantly",
    description:
      "Share files globally, directly from your own device in minutes, no cloud uploads. Turn your system into a personal cloud. Join the waitlist now.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full `}
    >
      <body className="min-h-full flex flex-col">
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
      </body>
    </html>
  );
}


