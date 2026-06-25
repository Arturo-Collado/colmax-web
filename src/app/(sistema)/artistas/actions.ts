'use server'

import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { revalidatePath } from 'next/cache'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export interface AccionResultado {
  success: boolean;
  error?: string;
  message?: string;
}

export async function getArtistas() {
  try {
    const artistas = await prisma.artista.findMany({
      orderBy: { id_artista: 'desc' }
    });
    return artistas;
  } catch (error) {
    console.error("Error obteniendo artistas:", error);
    return [];
  }
}

export async function guardarArtista(prevState: any, formData: FormData): Promise<AccionResultado> {
  try {
    const nombre_artistico = formData.get('nombre_artistico') as string;
    const nombre_real = formData.get('nombre_real') as string;
    const genero_musical = formData.get('genero_musical') as string;

    if (!nombre_artistico || !nombre_real || !genero_musical) {
      return { success: false, error: "Todos los campos son obligatorios." };
    }

    await prisma.artista.create({
      data: {
        nombre_artistico: nombre_artistico,
        nombre_real: nombre_real,
        genero_musical: genero_musical,
        estado: "Activo"
      }
    });

    revalidatePath('/artistas');
    return { success: true, message: "Artista guardado con éxito." };
  } catch (error: any) {
    // AQUÍ ESTÁ LA MAGIA: Ahora devolverá el error exacto de Supabase a tu pantalla
    const mensajeError = error?.message || error?.name || JSON.stringify(error);
    console.error("ERROR REAL DB:", error);
    return { success: false, error: `Fallo en DB: ${mensajeError}` };
  }
}

export async function eliminarArtista(id: number): Promise<AccionResultado> {
  try {
    await prisma.artista.delete({
      where: { id_artista: id }
    });
    
    revalidatePath('/artistas');
    return { success: true, message: "Artista eliminado." };
  } catch (error: any) {
    return { success: false, error: `Fallo al eliminar: ${error?.message || "Desconocido"}` };
  }
}