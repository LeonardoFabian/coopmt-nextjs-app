import { Montserrat, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
// const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export const metadata = {
  title: "Cooperativa",
  description: "Sitio web oficial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
