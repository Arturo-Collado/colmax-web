'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const datos = [
  { nombre: 'Streaming', valor: 10200.00 },
  { nombre: 'Ventas Físicas', valor: 5220.50 }
]

// Colores de la marca Colmax (Azul primario y Verde éxito)
const COLORES = ['#2563eb', '#10b981']

export function GraficoIngresos() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={datos} 
            cx="50%" 
            cy="50%" 
            innerRadius={60} 
            outerRadius={80} 
            paddingAngle={5} 
            dataKey="valor"
            nameKey="nombre"
            className="focus:outline-none"
          >
            {datos.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} className="hover:opacity-80 transition-opacity duration-300 cursor-pointer" />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => new Intl.NumberFormat('es-NI', { style: 'currency', currency: 'NIO' }).format(Number(value))}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}