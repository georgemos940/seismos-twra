// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import "../styles/globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Σεισμός Τώρα στην Ελλάδα: Ρίχτερ, Τοποθεσία & Βάθος",
  description:
    "Παρακολούθησε σεισμούς σε πραγματικό χρόνο στην Ελλάδα. Δες Ρίχτερ, τοποθεσία, βάθος και στατιστικά στοιχεία σε χάρτη. Ζωντανή ενημέρωση για σεισμική δραστηριότητα.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
  openGraph: {
    title: "Σεισμός Τώρα στην Ελλάδα: Ρίχτερ, Τοποθεσία & Βάθος",
    description:
      "Παρακολούθησε σεισμούς σε πραγματικό χρόνο στην Ελλάδα. Δες Ρίχτερ, τοποθεσία, βάθος και στατιστικά στοιχεία σε χάρτη. Ζωντανή ενημέρωση για σεισμική δραστηριότητα.",
    url: "https://seismos-twra.gr/",
    siteName: "Σεισμός Τώρα",
    images: [
      {
        url: "https://seismos-twra.gr/img/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Σεισμοί σε πραγματικό χρόνο στην Ελλάδα",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Σεισμός Τώρα στην Ελλάδα: Ρίχτερ, Τοποθεσία & Βάθος",
    description:
      "Παρακολούθησε σεισμούς σε πραγματικό χρόνο στην Ελλάδα. Δες Ρίχτερ, τοποθεσία, βάθος και στατιστικά στοιχεία σε χάρτη. Ζωντανή ενημέρωση για σεισμική δραστηριότητα.",
    images: ["https://seismos-twra.gr/img/logo/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>
          <h1>Σεισμός Τώρα: Ρίχτερ, Τοποθεσία και Βάθος στην Ελλάδα</h1>
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
