"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://TU_PROYECTO.supabase.co",
  "TU_ANON_KEY"
);

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

  useEffect(() => {
    cargarEquipos();
  }, [competicion, categoria, serie]);

  async function cargarEquipos() {
    let query = supabase
     .from("equipos")
     .select("*")
     .eq("competicion", competicion)
     .eq("categoria", categoria);

    // Solo VARONES tiene series A, B, C. DAMAS y MASTER usan UNICA
    if (categoria === "VARONES") {
      query = query.eq("serie", serie);
    } else {
      query = query.eq("serie", "UNICA");
    }

    const { data } = await query.order("puntos", { ascending: false });
    if (data) setEquipos(data);
  }

  // Si cambias a DAMAS o MASTER, forzar serie a UNICA
  useEffect(() => {
    if (categoria!== "VARONES") {
      setSerie("UNICA");
    } else if (serie === "UNICA") {
      setSerie("A"); // Default a Serie A
    }
  }, [categoria]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-700 to-red-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          LIGA DEPORTIVA BARRIAL SAYAUSI
        </h1>
        <p className="text-center text-red-200 mb-6">Temporada 2025</p>

        {/* FILTRO 1: COMPETICION */}
        <div className="flex justify-center gap-3 mb-4">
          {["LIGA", "COPA"].map((c) => (
            <button
              key={c}
              onClick={() => setCompeticion(c)}
              className={`px-6 py-2 rounded-lg font-bold ${
                competicion === c
                 ? "bg-white text-red-700"
                  : "bg-red-800 text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FILTRO 2: CATEGORIA */}
        <div className="flex justify-center gap-3 mb-4">
          {["DAMAS", "MASTER", "VARONES"].map((c) => (
            <button
              key={c}
              onClick={() => setCategoria(c)}
              className={`px-6 py-2 rounded-lg font-bold ${
                categoria === c
                 ? "bg-white text-red-700"
                  : "bg-red-800 text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FILTRO 3: SERIE - Solo aparece para VARONES */}
        {categoria === "VARONES" && (
          <div className="flex justify-center gap-3 mb-6">
            {["A", "B", "C"].map((s) => (
              <button
                key={s}
                onClick={() => setSerie(s)}
                className={`px-6 py-2 rounded-lg font-bold ${
                  serie === s
                   ? "bg-white text-red-700"
                    : "bg-red-800 text-white"
                }`}
              >
                SERIE {s}
              </button>
            ))}
          </div>
        )}

        {/* TITULO DE LA TABLA */}
        <h2 className="text-2xl font-bold text-center mb-4">
          {competicion} {categoria} {categoria === "VARONES"? `SERIE ${serie}` : ""}
        </h2>

        {/* TABLA */}
        <div className="bg-white text-black rounded-lg overflow-hidden shadow-xl">
          <table className="w-full">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Equipo</th>
                <th className="p-3">PJ</th>
                <th className="p-3">PG</th>
                <th className="p-3">PE</th>
                <th className="p-3">PP</th>
                <th className="p-3">GF</th>
                <th className="p-3">GC</th>
                <th className="p-3">DG</th>
                <th className="p-3 font-bold">PTS</th>
              </tr>
            </thead>
            <tbody>
              {equipos.length === 0? (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-gray-500">
                    No hay equipos en esta categoría
                  </td>
                </tr>
              ) : (
                equipos.map((eq, i) => (
                  <tr key={eq.id} className="border-b hover:bg-red-50">
                    <td className="p-3 font-bold">{i + 1}</td>
                    <td className="p-3 font-semibold">{eq.nombre}</td>
                    <td className="p-3 text-center">{eq.pj}</td>
                    <td className="p-3 text-center">{eq.pg}</td>
                    <td className="p-3 text-center">{eq.pe}</td>
                    <td className="p-3 text-center">{eq.pp}</td>
                    <td className="p-3 text-center">{eq.gf}</td>
                    <td className="p-3 text-center">{eq.gc}</td>
                    <td className="p-3 text-center">{eq.gf - eq.gc}</td>
                    <td className="p-3 text-center font-bold text-lg text-red-700">
                      {eq.puntos}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-center mt-6 text-red-200">
          Total equipos en esta categoría: {equipos.length}
        </p>
      </div>
    </main>
  );
}
