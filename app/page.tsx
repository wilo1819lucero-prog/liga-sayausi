"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vfldrqgigffnngrnvmng.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbGRycWdpZ2Zmbm5ncm52bW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MzcyMjUsImV4cCI6MjA5MzQxMzIyNX0.oSeEPjz9-HmM8r9lIQ26JuHYuTWbViJB7xor6xdtCIM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Equipo = {
  id: number;
  nombre: string;
  competicion: string;
  categoria: string;
  serie: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  puntos: number;
};

type Partido = {
  id: number;
  competicion: string;
  categoria: string;
  serie: string;
  jornada: number;
  fecha: string;
  hora: string;
  equipo_local: string;
  equipo_visitante: string;
  goles_local: number;
  goles_visitante: number;
  jugado: boolean;
  estadio: string;
};

export default function Home() {
  const [vista, setVista] = useState<"POSICIONES" | "CALENDARIO" | "ADMIN">("CALENDARIO");
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [competicion, setCompeticion] = useState("LIGA");
  const [categoria, setCategoria] = useState("TODAS");
  const [serie, setSerie] = useState("TODAS");
  const [jornada, setJornada] = useState<number | "TODAS">("TODAS");
  const [cargando, setCargando] = useState(true);

  // Formulario admin
  const [nuevoPartido, setNuevoPartido] = useState({
    competicion: "LIGA",
    categoria: "VARONES",
    serie: "A",
    jornada: 1,
    fecha: "",
    hora: "",
    equipo_local: "",
    equipo_visitante: "",
    estadio: "ESTADIO SAYAUSI"
  });
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const tieneSeries = competicion === "LIGA" && categoria === "VARONES";

  useEffect(() => {
    if (vista === "POSICIONES") {
      cargarEquipos();
    } else if (vista === "CALENDARIO") {
      cargarPartidos();
    }
  }, [competicion, categoria, serie, jornada, vista]);

  useEffect(() => {
    if (!tieneSeries && serie!== "TODAS") {
      setSerie("TODAS");
    }
  }, [competicion, categoria]);

  async function cargarEquipos() {
    setCargando(true);
    let query = supabase.from("equipos").select("*").eq("competicion", competicion);

    if (categoria!== "TODAS") query = query.eq("categoria", categoria);
    if (serie!== "TODAS") query = query.eq("serie", serie);

    const { data } = await query.order("puntos", { ascending: false }).order("gf", { ascending: false });
    setEquipos(data || []);
    setCargando(false);
  }

  async function cargarPartidos() {
    setCargando(true);
    let query = supabase.from("partidos").select("*").eq("competicion", competicion);

    if (categoria!== "TODAS") query = query.eq("categoria", categoria);
    if (serie!== "TODAS") query = query.eq("serie", serie);
    if (jornada!== "TODAS") query = query.eq("jornada", jornada);

    const { data } = await query.order("jornada", { ascending: true }).order("fecha", { ascending: true }).order("hora", { ascending: true });
    setPartidos(data || []);
    setCargando(false);
  }

  async function guardarPartido() {
    setGuardando(true);
    setMensaje("");

    const { error } = await supabase.from("partidos").insert([
      {
       ...nuevoPartido,
        serie: nuevoPartido.categoria === "DAMAS" || nuevoPartido.categoria === "MASTER"? "UNICA" : nuevoPartido.serie,
        jugado: false,
        goles_local: 0,
        goles_visitante: 0
      }
    ]);

    if (error) {
      setMensaje("Error: " + error.message);
    } else {
      setMensaje("Partido guardado correctamente");
      setNuevoPartido({
       ...nuevoPartido,
        equipo_local: "",
        equipo_visitante: ""
      });
      if (vista === "CALENDARIO") cargarPartidos();
    }
    setGuardando(false);
    setTimeout(() => setMensaje(""), 3000);
  }

  function formatearFecha(fecha: string) {
    if (!fecha) return "-";
    const dias = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
    const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const d = new Date(fecha + "T00:00:00");
    return `${dias[d.getDay()]}, ${d.getDate()} DE ${meses[d.getMonth()]} DE ${d.getFullYear()}`;
  }

  function formatearHora(hora: string) {
    if (!hora) return "-";
    return hora.slice(0, 5);
  }

  const partidosAgrupados = partidos.reduce((acc, partido) => {
    const key = `JORNADA ${partido.jornada} - ${formatearFecha(partido.fecha)}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(partido);
    return acc;
  }, {} as Record<string, Partido[]>);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-700 to-red-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">
          LIGA DEPORTIVA BARRIAL SAYAUSI
        </h1>
        <p className="text-center text-red-200 mb-6 text-lg">Temporada 2026</p>

        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {["POSICIONES", "CALENDARIO", "ADMIN"].map((v) => (
            <button
              key={v}
              onClick={() => setVista(v as "POSICIONES" | "CALENDARIO" | "ADMIN")}
              className={`px-8 py-3 rounded-lg font-bold text-xl transition-all ${
                vista === v
             ? "bg-white text-red-700 scale-105 shadow-lg"
                  : "bg-red-800 text-white hover:bg-red-700"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {vista!== "ADMIN" && (
          <>
            <div className="flex justify-center gap-3 mb-4 flex-wrap">
              {["LIGA", "COPA"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCompeticion(c)}
                  className={`px-6 py-2 rounded-lg font-bold text-lg transition-all ${
                    competicion === c
                 ? "bg-white text-red-700 scale-105 shadow-lg"
                      : "bg-red-800 text-white hover:bg-red-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {vista === "CALENDARIO" && (
              <div className="flex justify-center gap-3 mb-4 flex-wrap">
                <button
                  onClick={() => setJornada("TODAS")}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    jornada === "TODAS"
                 ? "bg-white text-red-700 scale-105"
                      : "bg-red-800 text-white hover:bg-red-700"
                  }`}
                >
                  TODAS
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((j) => (
                  <button
                    key={j}
                    onClick={() => setJornada(j)}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${
                      jornada === j
                   ? "bg-white text-red-700 scale-105"
                        : "bg-red-800 text-white hover:bg-red-700"
                    }`}
                  >
                    J{j}
                  </button>
                ))}
              </div>
            )}

            {vista === "POSICIONES" && (
              <>
                <div className="flex justify-center gap-3 mb-4 flex-wrap">
                  {["TODAS", "DAMAS", "MASTER", "VARONES"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategoria(c)}
                      className={`px-6 py-2 rounded-lg font-bold text-lg transition-all ${
                        categoria === c
                     ? "bg-white text-red-700 scale-105 shadow-lg"
                          : "bg-red-800 text-white hover:bg-red-700"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                {tieneSeries && (
                  <div className="flex justify-center gap-3 mb-6 flex-wrap">
                    {["TODAS", "A", "B", "C"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSerie(s)}
                        className={`px-6 py-2 rounded-lg font-bold text-lg transition-all ${
                          serie === s
                       ? "bg-white text-red-700 scale-105 shadow-lg"
                            : "bg-red-800 text-white hover:bg-red-700"
                        }`}
                      >
                        {s === "TODAS"? "TODAS" : `SERIE ${s}`}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          {vista === "ADMIN"? "CARGAR PARTIDOS" : `${competicion} ${vista}`}
        </h2>

        {vista === "ADMIN"? (
          <div className="bg-white text-black rounded-lg p-6 shadow-2xl max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1">Competición</label>
                <select
                  value={nuevoPartido.competicion}
                  onChange={(e) => setNuevoPartido({...nuevoPartido, competicion: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option>LIGA</option>
                  <option>COPA</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Categoría</label>
                <select
                  value={nuevoPartido.categoria}
                  onChange={(e) => setNuevoPartido({...nuevoPartido, categoria: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option>VARONES</option>
                  <option>DAMAS</option>
                  <option>MASTER</option>
                </select>
              </div>

              {nuevoPartido.competicion === "LIGA" && nuevoPartido.categoria === "VARONES" && (
                <div>
                  <label className="block font-bold mb-1">Serie</label>
                  <select
                    value={nuevoPartido.serie}
                    onChange={(e) => setNuevoPartido({...nuevoPartido, serie: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block font-bold mb-1">Jornada</label>
                <input
                  type="number"
                  value={nuevoPartido.jornada}
                  onChange={(e) => setNuevoPartido({...nuevoPartido, jornada: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                  min="1"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Fecha</label>
                <input
                  type="date"
                  value={nuevoPartido.fecha}
                  onChange={(e) => setNuevoPartido({...nuevoPartido, fecha: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Hora</label>
                <input
                  type="time"
                  value={nuevoPartido.hora}
                  onChange={(e) => setNuevoPartido({...nuevoPartido, hora: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-bold mb-1">Equipo Local</label>
                <input
                  type="text"
                  value={nuevoPartido.equipo_local}
                  onChange={(e) => setNuevoPartido({...nuevoPartido, equipo_local: e.target.value.toUpperCase() })}
                  className="w-full p-2 border rounded"
                  placeholder="SAN MARTIN"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-bold mb-1">Equipo Visitante</label>
                <input
                  type="text"
                  value={nuevoPartido.equipo_visitante}
                  onChange={(e) => setNuevoPartido({...nuevoPartido, equipo_visitante: e.target.value.toUpperCase() })}
                  className="w-full p-2 border rounded"
                  placeholder="LIBERTAD"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-bold mb-1">Estadio</label>
                <input
                  type="text"
                  value={nuevoPartido.estadio}
                  onChange={(e) => setNuevoPartido({...nuevoPartido, estadio: e.target.value })}
                  className="w-full p-2 border rounded bg-gray-100"
                  disabled
                />
              </div>
            </div>

            <button
              onClick={guardarPartido}
              disabled={guardando}
              className="w-full mt-6 bg-red-700 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-800 disabled:bg-gray-400"
            >
              {guardando? "GUARDANDO..." : "GUARDAR PARTIDO"}
            </button>

            {mensaje && (
              <p className={`mt-4 text-center font-bold ${mensaje.includes("Error")? "text-red-600" : "text-green-600"}`}>
                {mensaje}
              </p>
            )}
          </div>
        ) : vista === "POSICIONES"? (
          <div className="bg-white text-black rounded-lg overflow-x-auto shadow-2xl">
            <table className="w-full min-w-">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="p-3 text-left">Pos</th>
                  <th className="p-3 text-left">Equipo</th>
                  <th className="p-3 text-center">PJ</th>
                  <th className="p-3 text-center">PG</th>
                  <th className="p-3 text-center">PE</th>
                  <th className="p-3 text-center">PP</th>
                  <th className="p-3 text-center">GF</th>
                  <th className="p-3 text-center">GC</th>
                  <th className="p-3 text-center">DG</th>
                  <th className="p-3 text-center font-bold">PTS</th>
                </tr>
              </thead>
              <tbody>
                {cargando? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-gray-500 text-lg">
                      Cargando equipos...
                    </td>
                  </tr>
                ) : equipos.length === 0? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-gray-500 text-lg">
                      No hay equipos en esta categoría
                    </td>
                  </tr>
                ) : (
                  equipos.map((eq, i) => (
                    <tr key={eq.id} className="border-b hover:bg-red-50 transition-colors">
                      <td className="p-3 font-bold text-lg">{i + 1}</td>
                      <td className="p-3 font-semibold text-base">{eq.nombre}</td>
                      <td className="p-3 text-center">{eq.pj}</td>
                      <td className="p-3 text-center">{eq.pg}</td>
                      <td className="p-3 text-center">{eq.pe}</td>
                      <td className="p-3 text-center">{eq.pp}</td>
                      <td className="p-3 text-center">{eq.gf}</td>
                      <td className="p-3 text-center">{eq.gc}</td>
                      <td className="p-3 text-center font-semibold">
                        {eq.gf - eq.gc > 0? `+${eq.gf - eq.gc}` : eq.gf - eq.gc}
                      </td>
                      <td className="p-3 text-center font-bold text-xl text-red-700">
                        {eq.puntos}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-6">
            {cargando? (
              <div className="bg-white text-black rounded-lg p-8 text-center text-gray-500 text-lg">
                Cargando calendario...
              </div>
            ) : Object.keys(partidosAgrupados).length === 0? (
              <div className="bg-white text-black rounded-lg p-8 text-center text-gray-500 text-lg">
                No hay partidos programados
              </div>
            ) : (
              Object.entries(partidosAgrupados).map(([titulo, partidosDia]) => (
                <div key={titulo} className="bg-white text-black rounded-lg overflow-hidden shadow-2xl">
                  <div className="bg-red-700 text-white p-4 text-center font-bold text-xl">
                    {titulo}
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-3 text-center">HORA</th>
                        <th className="p-3 text-right">LOCAL</th>
                        <th className="p-3 text-center w-16">VS</th>
                        <th className="p-3 text-left">VISITANTE</th>
                        <th className="p-3 text-center">SERIE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partidosDia.map((p) => (
                        <tr key={p.id} className="border-b hover:bg-red-50 transition-colors">
                          <td className="p-3 text-center font-bold">{formatearHora(p.hora)}</td>
                          <td className="p-3 text-right font-semibold">{p.equipo_local}</td>
                          <td className="p-3 text-center font-bold text-lg">
                            {p.jugado? `${p.goles_local} - ${p.goles_visitante}` : "VS"}
                          </td>
                          <td className="p-3 text-left font-semibold">{p.equipo_visitante}</td>
                          <td className="p-3 text-center font-bold text-red-700">
                            {p.serie === "UNICA"? "DAMAS" : p.serie}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        )}

        <p className="text-center mt-6 text-red-200 text-lg">
          ESTADIO SAYAUSI - Temporada 2026
        </p>
      </div>
    </main>
  );
}
