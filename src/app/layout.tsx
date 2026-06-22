import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"; 

const inter = Inter({ subsets: ["latin"] });

// Configuración de Branding para la pestaña del navegador
export const metadata: Metadata = {
  title: "Colmax Record | Sistema Operativo",
  description: "Plataforma de gestión administrativa y operativa para Colmax Record.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* El Toaster es el componente que permite que tus notificaciones 
            de éxito aparezcan en la esquina superior derecha */}
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}