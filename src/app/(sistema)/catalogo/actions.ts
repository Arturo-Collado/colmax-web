'use server'

import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { revalidatePath } from 'next/cache'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function getAlbumes() {
  try {
    return await prisma.album.findMany({ orderBy: { id_album: 'desc' } });
  } catch (error) {
    return [];
  }
}

export async function guardarAlbum(prevState: any, formData: FormData) {
  try {
    const titulo = formData.get('titulo') as string;
    const artista = formData.get('artista') as string;
    const lanzamiento = formData.get('lanzamiento') as string;
    const pistas = Number(formData.get('pistas'));

    if (!titulo || !artista) return { success: false, error: "Título y artista obligatorios." };

    await prisma.album.create({
      data: { titulo, artista, lanzamiento, pistas: pistas || 1, estado: "Publicado" }
    });

    revalidatePath('/catalogo');
    return { success: true, message: "Álbum registrado con éxito." };
  } catch (error: any) {
    return { success: false, error: `Fallo en DB: ${error.message}` };
  }
}