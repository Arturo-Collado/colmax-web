'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// Esta es la función que tu page.tsx está buscando
export async function getVentas() {
  try {
    return await prisma.venta.findMany({
      orderBy: { id_venta: 'desc' }
    });
  } catch (error) {
    console.error("Error obteniendo ventas:", error);
    return [];
  }
}

export async function guardarVenta(prevState: any, formData: FormData) {
  try {
    const tipo = formData.get('tipo') as string;
    const ganancia = Number(formData.get('ganancia'));
    const fecha_evento = formData.get('fecha_evento') as string;

    await prisma.venta.create({
      data: {
        tipo,
        ganancia,
        fecha_evento: fecha_evento ? new Date(fecha_evento) : new Date()
      }
    });

    revalidatePath('/liquidaciones');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al guardar." };
  }
}