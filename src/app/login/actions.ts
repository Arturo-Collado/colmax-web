'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
// import { prisma } from "@/lib/prisma" // Desconectado

export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Simulamos el tiempo de consulta
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Credenciales fijas para la presentación
  if (username === "admin" && password === "Colmax2026") {
    
    // En Next.js 15, cookies() es asíncrono
    const cookieStore = await cookies();
    cookieStore.set("session", "token-simulado-123", { 
      httpOnly: true, 
      maxAge: 60 * 60 * 24 // Dura 24 horas
    });
    
    // Redirigimos al sistema
    redirect("/dashboard");
    
  } else {
    return { error: "Credenciales inválidas. Usa: admin / Colmax2026" };
  }
}