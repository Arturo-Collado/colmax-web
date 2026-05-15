import { prisma } from "./prisma"

export async function getDashboardStats() {
  // 1. Total de Artistas
  const totalArtistas = await prisma.artista.count()

  // 2. Contratos por vencer (Próximos 30 días) - Req. 110
  const fechaLimite = new Date()
  fechaLimite.setDate(fechaLimite.getDate() + 30)
  
  const contratosVencer = await prisma.contrato.count({
    where: {
      fecha_de_finalizacion: {
        lte: fechaLimite,
        gte: new Date()
      }
    }
  })

  // 3. Ventas Totales (Suma de ganancias) - Req. 112
  const ventasQuery = await prisma.venta.aggregate({
    _sum: {
      ganancia: true
    }
  })
  
  const ventasTotales = Number(ventasQuery._sum.ganancia || 0)

  // 4. Distribución por tipo (Streaming, Digital, Físico) - Req. 113
  const ventasPorTipo = await prisma.venta.groupBy({
    by: ['tipo'],
    _sum: {
      ganancia: true
    }
  })

  return {
    totalArtistas,
    contratosVencer,
    ventasTotales,
    ventasPorTipo
  }
}