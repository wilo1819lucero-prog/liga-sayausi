export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Encabezado con logo */}
      <header className="bg-green-700 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <img 
            src="/logo.jpeg" 
            alt="ESCUDO LIGA DEPORTIVA SAYAUSI" 
            className="h-16 w-16 object-contain bg-white rounded-full p-1"
          />
          <div>
            <h1 className="text-3xl font-bold">LIGA DEPORTIVA SAYAUSI</h1>
            <p className="text-green-100 mt-1">FUTBOL, UNION Y COMUNIDAD</p>
          </div>
        </div>
      </header>

      {/* Menu */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex gap-6 p-4">
          <a href="#" className="font-semibold text-green-700">INICIO</a>
          <a href="#" className="text-gray-600 hover:text-green-700">EQUIPOS</a>
          <a href="#" className="text-gray-600 hover:text-green-700">TABLA</a>
          <a href="#" className="text-gray-600 hover:text-green-700">CALENDARIO</a>
        </div>
      </nav>

      {/* Contenido */}
      <section className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            BIENVENIDOS AL CAMPEONATO 2026
          </h2>
          <p className="text-gray-600">
            PROXIMAMENTE AQUI VERAS LOS EQUIPOS, RESULTADOS Y TABLA DE POSICIONES.
          </p>
          <div className="mt-6 text-sm text-green-700 font-mono">
            ✅ CONECTADO A SUPABASE: VFLDRAGJGFFNNGNVMNG
          </div>
        </div>
      </section>

      {/* Pie */}
      <footer className="bg-gray-800 text-gray-300 p-6 mt-12 text-center text-sm">
        © 2026 LIGA DEPORTIVA SAYAUSI - SAYAUSI, AZUAY
      </footer>
    </main>
  )
}
