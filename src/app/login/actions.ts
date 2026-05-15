'use server'

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

// IMPORTANTE: Ahora recibe prevState como primer argumento
export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  let loginExitoso = false;

  try {
    // 1. Buscar el usuario en SQL Server vía Prisma
    const usuario = await prisma.usuario.findUnique({
      where: { nombre_usuario: username }
    })

    // 2. Validar credenciales
    if (!usuario || usuario.contrasena !== password) {
      return { error: "Credenciales inválidas" }
    }

    // 3. Persistencia de sesión (PR-10)
    const cookieStore = await cookies()
    cookieStore.set("session_user", usuario.nombre_usuario, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 día de persistencia
      path: "/",
    })

    loginExitoso = true;

  } catch (error) {
    console.error(error)
    return { error: "Error de conexión a la base de datos." }
  }

  // 4. Redirigir al Dashboard (DEBE ir estrictamente fuera del try-catch)
  if (loginExitoso) {
    redirect("/dashboard")
  }
}