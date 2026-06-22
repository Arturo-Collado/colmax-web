// IMPORTANTE: Comentamos Prisma para el modo Diseño/Netlify
// import { prisma } from "./prisma";

export async function getDashboardStats() {
  // Simulamos un pequeño tiempo de carga de medio segundo
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Devolvemos estadísticas falsas pero realistas para la presentación
  return {
    totalArtistas: 24,
    contratosVencer: 3, // Mostrará la alerta en el dashboard
    ventasTotales: 15420.50,
    ventasPorTipo: [
      { tipo: "Streaming", _sum: { ganancia: 10200.00 } },
      { tipo: "Físico", _sum: { ganancia: 5220.50 } }
    ]
  };
}