'use server'

import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { revalidatePath } from 'next/cache'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function getCompositores() {
  try {
    return await prisma.compositor.findMany({ orderBy: { id_compositor: 'desc' } });
  } catch (error) {
    return [];
  }
}

export async function guardarCompositor(prevState: any, formData: FormData) {
  try {
    const nombre = formData.get('nombre') as string;
    const apellido = formData.get('apellido') as string;
    const correo = formData.get('correo') as string;
    const regalias = formData.get('regalias') as string;

    if (!nombre || !apellido) return { success: false, error: "Nombre y apellido obligatorios." };

    await prisma.compositor.create({
      data: { nombre, apellido, correo, regalias }
    });

    revalidatePath('/compositores');
    return { success: true, message: "Compositor registrado con éxito." };
  } catch (error: any) {
    return { success: false, error: `Fallo en DB: ${error.message}` };
  }
}