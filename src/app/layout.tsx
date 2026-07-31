import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CREWCAM Platform Admin",
  description: "CrewCam super-admin console",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${poppins.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <QueryProvider>
            {children}

<Toaster
    position="top-right"
    toastOptions={{
        duration: 4000,
        style: {
            background: '#ffffff',
            color: '#020b22',
            borderRadius: '10px',
            padding: '12px 16px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
            border: '1px solid #e4e4e7',
            maxWidth: '380px',
        },
    }}
/>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
