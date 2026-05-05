"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// URL Y KEY CORRECTAS DE WILLIAM - YA NO DICE "tu_proyecto"
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

export default function Home() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [competicion, setCompeticion] = useState("LIGA");
  const [categoria, setCategoria] = useState("VARONES");
  const [serie, setSerie] = useState("A");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarEquipos();
  }, [competicion, categoria, serie]);

  async function cargarEquipos() {
    setCargando(true);
    let query = supabase
     .from("equipos")
     .select("*")
     .eq("competicion", competicion)
     .eq("categoria", categoria);

    if (categoria === "VARONES") {
      query = query.eq("serie", serie);
    } else {
      query = query.eq("serie", "UNICA");
    }

    const { data, error } = await query
     .order("puntos", { ascending: false })
     .order("gf", { ascending: false });

    if (error) {
      console.error('ERROR SUPABASE:', error);
      setEquipos([]);
    } else {
      console.log('EQUIPOS CARGADOS:', data);
      setEquipos(data || []);
    }
    setCargando(false);
  }

  useEffect(() => {
    if (categoria!== "VARONES") {
      setSerie("UNICA");
    } else if (serie === "UNICA") {
      setSerie("A");
    }
  }, [categoria]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-700 to-red-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">
          LIGA DEPORTIVA BARRIAL SAYAUSI
        </h1>
        <p className="text-center text-red-200 mb-6 text-lg">Temporada 2025</p>

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

        <div className="flex justify-center gap-3 mb-4 flex-wrap">
          {["DAMAS", "MASTER", "VARONES"].map((c) => (
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

        {categoria === "VARONES" && (
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {["A", "B", "C"].map((s) => (
              <button
                key={s}
                onClick={() => setSerie(s)}
                className={`px-6 py-2 rounded-lg font-bold text-lg transition-all ${
                  serie === s
                   ? "bg-white text-red-700 scale-105 shadow-lg"
                    : "bg-red-800 text-white hover:bg-red-700"
                }`}
              >
                SERIE {s}
              </button>
            ))}
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          {competicion} {categoria} {categoria === "VARONES"? `SERIE ${serie}` : ""}
        </h2>

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

        <p className="text-center mt-6 text-red-200 text-lg">
          Total equipos: {equipos.length}
        </p>
      </div>
    </main>
  );
}
