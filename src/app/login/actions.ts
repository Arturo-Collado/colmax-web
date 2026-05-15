'use server'

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  // 1. Buscar el usuario en SQL Server vía Prisma
  const usuario = await prisma.usuario.findUnique({
    where: { nombre_usuario: username }
  })

  // 2. Validar credenciales (Aquí podrías usar bcrypt si están encriptadas)
  if (!usuario || usuario.contrasena !== password) {
    return { error: "Credenciales inválidas" }
  }

  // 3. PR-10: Persistencia de sesión
  // Creamos una cookie básica para mantener al usuario dentro (para el proyecto uni)
  const cookieStore = await cookies()
  cookieStore.set("session_user", usuario.nombre_usuario, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 día de persistencia
    path: "/",
  })

  // 4. Redirigir al Dashboard
  redirect("/dashboard")
}