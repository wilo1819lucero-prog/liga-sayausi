export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="bg-green-700 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Liga Deportiva Barrial Sayausí</h1>
          <p className="text-green-100 mt-1">Fútbol, unión y comunidad</p>
        </div>
      </header>

      {/* Menú */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex gap-6 p-4">
          <a href="#" className="font-semibold text-green-700">Inicio</a>
          <a href="#" className="text-gray-600 hover:text-green-700">Equipos</a>
          <a href="#" className="text-gray-600 hover:text-green-700">Tabla</a>
          <a href="#" className="text-gray-600 hover:text-green-700">Calendario</a>
        </div>
      </nav>

      {/* Contenido */}
      <section className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bienvenidos al Campeonato 2026
          </h2>
          <p className="text-gray-600">
            Próximamente aquí verás los equipos, resultados y tabla de posiciones.
          </p>
          <div className="mt-6 text-sm text-green-700 font-mono">
            ✅ Conectado a Supabase: vfldragjgffnngnvmng
          </div>
        </div>
      </section>

      {/* Pie */}
      <footer className="bg-gray-800 text-gray-300 p-6 mt-12 text-center text-sm">
        © 2026 Liga Sayausí - Sayausí, Azuay
      </footer>
    </main>
  )
}
