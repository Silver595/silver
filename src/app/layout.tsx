import type { Metadata } from "next";
import localFont from "next/font/local";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

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

export const metadata: Metadata = {
  title: "TechMock",
  description: "Live video interviews with a shared code editor.",
};

// Every page is auth-gated (Clerk) and reads live data (Convex/Stream), so there's
// nothing here that can be statically prerendered. Forcing dynamic rendering skips
// build-time prerendering of these routes entirely — otherwise `next build` tries
// to prerender them and Clerk's SDK fails resolving its API URL without a real
// CLERK_SECRET_KEY present at build time.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* "Jenkins Nord" is not a Google Font — using Playfair Display as a
              stand-in. If you have the real Jenkins Nord file, drop it in and it
              takes priority via the .font-display stack in globals.css. */}
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
