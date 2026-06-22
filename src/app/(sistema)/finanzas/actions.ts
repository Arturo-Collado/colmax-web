'use server'

export async function getReporteFinanciero() {
  return [
    { plataforma: "Spotify", ingresos: 8500.50, fecha: "Mayo 2026", estado: "Conciliado" },
    { plataforma: "Apple Music", ingresos: 4200.00, fecha: "Mayo 2026", estado: "Conciliado" },
    { plataforma: "Ventas Físicas", ingresos: 2720.00, fecha: "Mayo 2026", estado: "Pendiente" }
  ];
}