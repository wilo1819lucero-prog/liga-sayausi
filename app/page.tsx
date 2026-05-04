import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'

const supabase = createClient(
  'https://vfldragjgrfnngnvmnvg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbGRyYWdqZ3Jmbm5nbnZtbnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5ODkzODMsImV4cCI6MjA2MDU2NTM4M30.nDy3gX4HwQJ8CbPxlfgo20ZgOZpmMWWS-IzQps5f1Sw'
)

export default async function Home() {
  const { data: equipos, error } = await supabase
    .from('equipos')
    .select('*')
    .order('puntos', { ascending: false })

  if (error) {
    console.error('Error de Supabase:', error)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.jpeg" 
              alt="ESCUDO LIGA DEPORTIVA SAYAUSI" 
              width={45}
              height={45}
              className="object-contain bg-white rounded-full p-1"
            />
            <div>
              <h1 className="text-lg font-bold text-white">LIGA DEPORTIVA</h1>
              <p className="text-xs text-gray-400">SAYAUSI</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-red-500 transition">Inicio</a>
            <a href="#" className="text-gray-300 hover:text-red-500 transition">Tabla</a>
            <a href="#" className="text-gray-300 hover:text-red-500 transition">Equipos</a>
            <a href="#" className="bg-red-700 hover:bg-red-600 px-5 py-2 rounded-lg text-sm font-semibold transition">
              Calendario
            </a>
          </nav>
        </div>
      </header>

      <div className="relative">
        <div className="absolute inset-0 opacity-5">
          <Image src="/logo.jpeg" alt="" fill className="object-contain object-right" />
        </div>
        
        <div className="max-w-7xl mx-auto p-6 relative">
          <h2 className="text-4xl font-bold mb-6 text-white">LIGA DEPORTIVA SAYAUSI</h2>
          
          <div className="flex gap-3 flex-wrap mb-8">
            <button className="bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold border-2 border-red-600">
              Competicion
            </button>
            <button className="bg-gray-800 border border-gray-700 px-5 py-2 rounded-lg text-sm hover:border-red-700 transition">
              Goleadores
            </button>
            <button className="bg-gray-800 border border-gray-700 px-5 py-2 rounded-lg text-sm hover:border-red-700 transition">
              Equipos
            </button>
            <button className="bg-gray-800 border border-gray-700 px-5 py-2 rounded-lg text-sm hover:border-red-700 transition">
              Sanciones
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Tabla de Posiciones</h3>
              <span className="bg-green-600 px-3 py-1 rounded text-xs font-bold">EN VIVO</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-red-700 text-white">
                    <th className="p-3 text-left rounded-tl-lg">Pos</th>
                    <th className="p-3 text-left">Escudo</th>
                    <th className="p-3 text-left">Equipo</th>
                    <th className="p-3 text-center">PJ</th>
                    <th className="p-3 text-center">PG</th>
                    <th className="p-3 text-center">PE</th>
                    <th className="p-3 text-center">PP</th>
                    <th className="p-3 text-center">GF</th>
                    <th className="p-3 text-center">GC</th>
                    <th className="p-3 text-center">DG</th>
                    <th className="p-3 text-center rounded-tr-lg">Pts</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {equipos && equipos.length > 0 ? (
                    equipos.map((equipo, index) => (
                      <tr key={equipo.id} className="border-b border-gray-800 hover:bg-red-900/20 transition">
                        <td className="p-3 font-bold text-red-500">{index + 1}</td>
                        <td className="p-3">
                          {equipo.logo_url ? (
                            <Image 
                              src={equipo.logo_url} 
                              alt={equipo.nombre}
                              width={32}
                              height={32}
                              className="rounded-full bg-white object-contain"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                              {equipo.nombre.charAt(0)}
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-semibold text-white">{equipo.nombre}</td>
                        <td className="p-3 text-center">{equipo.pj}</td>
                        <td className="p-3 text-center">{equipo.pg}</td>
                        <td className="p-3 text-center">{equipo.pe}</td>
                        <td className="p-3 text-center">{equipo.pp}</td>
                        <td className="p-3 text-center">{equipo.gf}</td>
                        <td className="p-3 text-center">{equipo.gc}</td>
                        <td className="p-3 text-center">{equipo.gf - equipo.gc}</td>
                        <td className="p-3 text-center font-bold text-white">{equipo.puntos}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="p-6 text-center text-gray-500">
                        No hay equipos registrados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 border-t border-gray-800 mt-12 p-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© 2026 LIGA DEPORTIVA SAYAUSI - SAYAUSI, AZUAY</p>
          <p className="mt-2 text-red-600 font-semibold">FUNDADA EN 1970</p>
        </div>
      </footer>
    </main>
  )
}
