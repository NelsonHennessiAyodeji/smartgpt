import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SmartGPT",
  description: `SmartGPT: Your ultimate AI-powered reading companion. Seamlessly bridging the gap between curiosity and knowledge, SmartGPT finds the book for you've been searching for. Just provide a title and an author, and kick back as the AI chatbot navigates the book and bring your search to an end. Fast, reliable, and effortlessly smart—because every story deserves to be discovered. 😎`,
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
