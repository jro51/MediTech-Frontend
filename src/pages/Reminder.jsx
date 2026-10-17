import { useState } from "react";

// ─── Datos iniciales de ejemplo ───────────────────────────────────────────────
const INITIAL_REMINDERS = [
  { id: 1, medicine: "Vitamina C", dose: "1 cápsula", time: "20:00", days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], active: true },
  { id: 2, medicine: "Metformina 850mg", dose: "1 tableta", time: "08:00", days: ["Lun", "Mar", "Mié", "Jue", "Vie"], active: true },
];

const ALL_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// ─── Progress ring ────────────────────────────────────────────────────────────
function ProgressRing({ pct = 85 }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle cx="24" cy="24" r={r} fill="none" stroke="#1a3a6b" strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
    </svg>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-2xl font-black text-gray-900 dark:text-white leading-none mt-0.5">{value}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Reminder card ────────────────────────────────────────────────────────────
function ReminderCard({ reminder, onToggle, onDelete }) {
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden
      ${reminder.active ? "border-gray-100 shadow-sm" : "border-gray-100 opacity-60"}`}>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Info */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
              ${reminder.active ? "bg-[#0040A2]" : "bg-gray-100"}`}>
              <svg className={`w-5 h-5 ${reminder.active ? "text-white" : "text-gray-400"}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{reminder.medicine}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{reminder.dose}</p>
            </div>
          </div>

          {/* Hora */}
          <div className="text-right shrink-0">
            <p className="text-xl font-black text-[#1a3a6b]">{reminder.time}</p>
            <p className="text-[10px] text-gray-400">hora de toma</p>
          </div>
        </div>

        {/* Días */}
        <div className="flex gap-1.5 mt-4">
          {ALL_DAYS.map((d) => (
            <span key={d}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                ${reminder.days.includes(d)
                  ? "bg-[#0040A2] text-white"
                  : "bg-gray-100 text-gray-300"}`}>
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Footer de la card */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50 bg-gray-50/50">
        <button
          onClick={() => onToggle(reminder.id)}
          className={`text-xs font-semibold transition-colors
            ${reminder.active ? "text-emerald-600 hover:text-emerald-700" : "text-gray-400 hover:text-[#1a3a6b]"}`}
        >
          {reminder.active ? "● Activo" : "○ Inactivo"}
        </button>
        <button
          onClick={() => onDelete(reminder.id)}
          className="text-xs text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  );
}

// ─── Formulario ───────────────────────────────────────────────────────────────
function ReminderForm({ onAdd }) {
  const [form, setForm] = useState({
    medicine: "", dose: "", time: "08:00", days: [...ALL_DAYS],
  });
  const [error, setError] = useState("");

  const toggleDay = (d) => {
    setForm((f) => ({
      ...f,
      days: f.days.includes(d) ? f.days.filter((x) => x !== d) : [...f.days, d],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.medicine.trim()) { setError("Escribe el nombre del medicamento."); return; }
    if (form.days.length === 0) { setError("Selecciona al menos un día."); return; }
    setError("");
    onAdd({ ...form, id: Date.now(), active: true });
    setForm({ medicine: "", dose: "", time: "08:00", days: [...ALL_DAYS] });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Nuevo Recordatorio</h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Configura alertas inteligentes para tus medicamentos.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Medicamento */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
            Medicamento
          </label>
          <input
            type="text"
            placeholder="Ej. Metformina 850mg"
            value={form.medicine}
            onChange={(e) => setForm({ ...form, medicine: e.target.value })}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 focus:border-[#1a3a6b] transition-all"
          />
        </div>

        {/* Dosis y Hora */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Dosis
            </label>
            <input
              type="text"
              placeholder="Ej. 1 tableta"
              value={form.dose}
              onChange={(e) => setForm({ ...form, dose: e.target.value })}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 focus:border-[#1a3a6b] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Hora de alerta
            </label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/20 focus:border-[#1a3a6b] transition-all"
            />
          </div>
        </div>

        {/* Días */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            Días de la semana
          </label>
          <div className="flex gap-2 flex-wrap">
            {ALL_DAYS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => toggleDay(d)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all
                  ${form.days.includes(d)
                    ? "bg-[#0040A2] border-[#1a3a6b] text-white"
                    : "bg-white border-gray-200 text-gray-400 hover:border-[#1a3a6b] hover:text-[#1a3a6b]"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#0040A2] hover:bg-[#14305a] text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md shadow-[#1a3a6b]/20 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Crear Recordatorio
        </button>
      </form>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Reminder() {
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);

  const addReminder = (r) => setReminders((prev) => [r, ...prev]);

  const toggleReminder = (id) =>
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );

  const deleteReminder = (id) =>
    setReminders((prev) => prev.filter((r) => r.id !== id));

  const active = reminders.filter((r) => r.active);
  const nextReminder = [...active].sort((a, b) => a.time.localeCompare(b.time))[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* ── Page header ── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs font-bold tracking-widest text-[#0040A2] uppercase mb-1">
            Gestión de Salud
          </p>
          <h1 className="text-3xl font-extrabold text-[#0040A2] dark:text-white">Mis Recordatorios</h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Alertas inteligentes para que nunca olvides una dosis.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Recordatorios activos"
            value={active.length}
            color="bg-blue-50"
            icon={
              <svg className="w-6 h-6 text-[#1a3a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            }
          />
          <StatCard
            label="Próxima alerta"
            value={nextReminder ? nextReminder.time : "—"}
            sub={nextReminder ? `${nextReminder.medicine} · ${nextReminder.dose}` : "Sin recordatorios activos"}
            color="bg-emerald-50"
            icon={
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            }
          />

          {/* Progreso semanal */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4">
            <div className="relative shrink-0">
              <ProgressRing pct={85} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-[#1a3a6b]">
                85%
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Progreso Semanal</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">Vas al 85% al día</p>
              <p className="text-[11px] text-gray-400">con tus dosis esta semana.</p>
            </div>
          </div>
        </div>

        {/* ── Layout 2 columnas ── */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Formulario — columna izquierda (2/5) */}
          <div className="lg:col-span-2">
            <ReminderForm onAdd={addReminder} />
          </div>

          {/* Lista — columna derecha (3/5) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Tus recordatorios
                <span className="ml-2 text-xs font-normal text-gray-400">
                  ({reminders.length})
                </span>
              </h2>
            </div>

            {reminders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#1a3a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Sin recordatorios aún</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Usa el formulario para crear el primero.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {reminders.map((r) => (
                  <ReminderCard
                    key={r.id}
                    reminder={r}
                    onToggle={toggleReminder}
                    onDelete={deleteReminder}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
