import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Colmax Record | Gestión Operativa",
  description: "Sistema de control operativo para la disquera Colmax",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        {/* Contenedor global de alertas Toast para todo el sistema */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}