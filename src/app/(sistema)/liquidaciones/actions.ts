'use server'

export async function getLiquidaciones() {
  return [
    { id: 1001, artista: "DJ Nova", reproducciones: 1500000, tasa: 0.0035, total: 5250.00, estado: "Pendiente" },
    { id: 1002, artista: "Luna", reproducciones: 850000, tasa: 0.0035, total: 2975.00, estado: "Pagado" }
  ];
}