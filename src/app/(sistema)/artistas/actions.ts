'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

// Inicializamos Prisma
const prisma = new PrismaClient()

export interface AccionResultado {
  success: boolean;
  error?: string;
}

// 1. FUNCIÓN PARA LEER DATOS REALES
export async function getArtistas() {
  try {
    const artistas = await prisma.artista.findMany({
      orderBy: { id_artista: 'desc' } // Muestra los más nuevos primero
    });
    return artistas;
  } catch (error) {
    console.error("Error obteniendo artistas:", error);
    return [];
  }
}

// 2. FUNCIÓN PARA GUARDAR DATOS EN SUPABASE
export async function guardarArtista(prevState: any, formData: FormData): Promise<AccionResultado> {
  try {
    // Extraemos lo que el usuario escribió en el formulario web
    const nombre_artistico = formData.get('nombre_artistico') as string;
    const nombre_real = formData.get('nombre_real') as string;
    const genero_musical = formData.get('genero_musical') as string;

    // Validamos que no vengan vacíos
    if (!nombre_artistico || !nombre_real || !genero_musical) {
      return { success: false, error: "Todos los campos son obligatorios." };
    }

    // Insertamos físicamente en Supabase
    await prisma.artista.create({
      data: {
        nombre_artistico: nombre_artistico,
        nombre_real: nombre_real,
        genero_musical: genero_musical,
        estado: "Activo"
      }
    });

    // Refrescamos la página de artistas para que muestre el nuevo dato
    revalidatePath('/artistas');
    
    return { success: true };

  } catch (error) {
    console.error("Error al guardar:", error);
    return { success: false, error: "Hubo un problema al guardar en la base de datos." };
  }
}

// 3. FUNCIÓN PARA ELIMINAR DATOS
export async function eliminarArtista(id: number): Promise<AccionResultado> {
  try {
    await prisma.artista.delete({
      where: { id_artista: id }
    });
    
    revalidatePath('/artistas');
    return { success: true };
  } catch (error) {
    return { success: false, error: "No se pudo eliminar el registro." };
  }
}