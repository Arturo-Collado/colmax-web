'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export interface AccionResultado {
  success: boolean;
  error?: string;
  message?: string;
}

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

export async function guardarVenta(prevState: any, formData: FormData): Promise<AccionResultado> {
  try {
    const tipo = formData.get('tipo') as string;
    const ganancia = Number(formData.get('ganancia'));
    const fecha_evento = formData.get('fecha_evento') as string;

    if (!tipo || isNaN(ganancia)) {
      return { success: false, error: "Datos inválidos." };
    }

    await prisma.venta.create({
      data: {
        tipo: tipo,
        ganancia: ganancia,
        fecha_evento: fecha_evento ? new Date(fecha_evento) : new Date()
      }
    });

    revalidatePath('/liquidaciones'); 
    return { success: true, message: "Venta registrada exitosamente." };
  } catch (error) {
    console.error("Error al guardar venta:", error);
    return { success: false, error: "Error al guardar en la base de datos." };
  }
}

export async function eliminarVenta(id: number): Promise<AccionResultado> {
  try {
    await prisma.venta.delete({ where: { id_venta: id } });
    revalidatePath('/liquidaciones');
    return { success: true, message: "Venta eliminada." };
  } catch (error) {
    return { success: false, error: "No se pudo eliminar el registro." };
  }
}