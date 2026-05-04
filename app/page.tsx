import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header oscuro con acentos rojos */}
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
            <a href="#" className="text-gray-300 hover:text-red-500 transition">Sanciones</a>
            <button className="bg-red-700 hover:bg-red-600 px-5 py-2 rounded-lg text-sm font-semibold transition">
              Calendario
            </button>
          </nav>
        </div>
      </header>

      {/* Hero con escudo de fondo */}
      <div className="relative">
        <div className="absolute inset-0 opacity-5">
          <Image 
            src="/logo.jpeg" 
            alt="" 
            fill
            className="object-contain object-right"
          />
        </div>
        
        <div className="max-w-7xl mx-auto p-6 relative">
          <h2 className="text-4xl font-bold mb-6 text-white">LIGA DEPORTIVA SAYAUSI</h2>
          
          {/* Botones de filtros */}
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

          {/* Grid: Tabla + Goleadores */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Tabla de Posiciones */}
            <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Tabla de Posiciones</h3>
                <button className="bg-gray-800 px-4 py-1 rounded text-xs text-gray-400">Serie A</button>
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
                      <th className="p-3 text-center rounded-tr-lg">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800 bg-gray-800/30 hover:bg-red-900/20 transition">
                      <td className="p-3 font-bold text-red-500">1</td>
                      <td className="p-3">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </td>
                      <td className="p-3 font-semibold text-white">Boca Juniors Sayausi</td>
                      <td className="p-3 text-center">5</td>
                      <td className="p-3 text-center">4</td>
                      <td className="p-3 text-center">1</td>
                      <td className="p-3 text-center">0</td>
                      <td className="p-3 text-center">12</td>
                      <td className="p-3 text-center">3</td>
                      <td className="p-3 text-center font-bold text-white">13</td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-red-900/20 transition">
                      <td className="p-3 font-bold text-gray-400">2</td>
                      <td className="p-3">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </td>
                      <td className="p-3 font-semibold text-white">Club LDS 1970</td>
                      <td className="p-3 text-center">5</td>
                      <td className="p-3 text-center">3</td>
                      <td className="p-3 text-center">2</td>
                      <td className="p-3 text-center">0</td>
                      <td className="p-3 text-center">9</td>
                      <td className="p-3 text-center">4</td>
                      <td className="p-3 text-center font-bold text-white">11</td>
                    </tr>
                    <tr>
                      <td className="p-4" colSpan={10}>
                        <p className="text-center text-gray-500 py-6">
                          ⏳ PROXIMAMENTE: EQUIPOS REALES DESDE SUPABASE
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Columna derecha: Goleadores */}
            <div className="space-y-6">
              {/* Card Goleador principal */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Goleadores</h3>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-3 border-2 border-red-700"></div>
                  <p className="font-bold text-white">Juan Perez</p>
                  <p className="text-sm text-gray-400 mb-3">Boca Juniors</p>
                  <div className="bg-red-700 text-white px-3 py-1 rounded-full text-sm font-bold inline-block">
                    8 GOLES
                  </div>
                </div>
              </div>

              {/* Lista de goleadores */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h4 className="font-bold mb-4 text-white">Top Goleadores</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-gray-700 rounded-full border-red-700"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-white">Carlos Lema</p>
                      <p className="text-xs text-gray-400">LDS 1970 - 6</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-gray-700 rounded-full border border-gray-600"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-white">Pedro Quispe</p>
                      <p className="text-xs text-gray-400">Real Sayausi - 5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-12 p-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© 2026 LIGA DEPORTIVA SAYAUSI - SAYAUSI, AZUAY</p>
          <p className="mt-2 text-red-600 font-semibold">FUNDADA EN 1970</p>
        </div>
      </footer>
    </main>
  )
}
