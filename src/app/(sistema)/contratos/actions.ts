'use server'

import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { revalidatePath } from 'next/cache'

// Conexión nativa de alto rendimiento
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export interface AccionResultado {
  success: boolean;
  error?: string;
  message?: string; 
}

export async function getContratos() {
  try {
    return await prisma.contrato.findMany({
      include: { artista: true },
      orderBy: { id_contrato: 'desc' }
    });
  } catch (error) {
    console.error("Error obteniendo contratos:", error);
    return [];
  }
}

export async function guardarContrato(prevState: any, formData: FormData): Promise<AccionResultado> {
  try {
    const id_artista = Number(formData.get('id_artista'));
    const fecha_de_inicio = formData.get('fecha_de_inicio') as string;
    const fecha_de_finalizacion = formData.get('fecha_de_finalizacion') as string;
    const estado = formData.get('estado') as string || "Vigente";

    if (!id_artista || !fecha_de_inicio || !fecha_de_finalizacion) {
      return { success: false, error: "Faltan datos obligatorios." };
    }

    await prisma.contrato.create({
      data: {
        id_artista: id_artista,
        fecha_de_inicio: new Date(fecha_de_inicio),
        fecha_de_finalizacion: new Date(fecha_de_finalizacion),
        estado: estado
      }
    });

    revalidatePath('/contratos');
    return { success: true, message: "Contrato registrado exitosamente." };
  } catch (error) {
    console.error("Error al guardar contrato:", error);
    return { success: false, error: "Error al guardar en la base de datos." };
  }
}

export async function eliminarContrato(id: number): Promise<AccionResultado> {
  try {
    await prisma.contrato.delete({ where: { id_contrato: id } });
    revalidatePath('/contratos');
    return { success: true, message: "Contrato eliminado correctamente." };
  } catch (error) {
    return { success: false, error: "No se pudo eliminar el registro." };
  }
}