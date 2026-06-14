export default function About() {
  const features = [
    {
      color: "bg-blue-50 dark:bg-blue-900/20 text-[#1a3a6b] dark:text-blue-400",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "IA Predictiva",
      desc: "Recomendaciones personalizadas basadas en cada compra y tu historial de salud.",
    },
    {
      color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      title: "Control Total",
      desc: "Gestión de inventario personal y recordatorios de dosis en tiempo real.",
    },
    {
      color: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Escalabilidad",
      desc: "Arquitectura robusta con microservicios y Kafka para miles de usuarios simultáneos.",
    },
  ];

  const stats = [
    { num: "99%", label: "Precisión en dosis" },
    { num: "24/7", label: "Asesoría disponible" },
    { num: "<2h", label: "Entrega express" },
    { num: "10k+", label: "Usuarios activos" },
  ];

  const stack = ["Java Spring Boot", "React", "Python AI", "Apache Kafka", "PostgreSQL", "Docker"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* ── Page header ── */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs font-bold tracking-widest text-[#0040A2] dark:text-blue-400 uppercase mb-1">
            La empresa
          </p>
          <h1 className="text-3xl font-extrabold text-[#0040A2] dark:text-white">Acerca de Nosotros</h1>
          <p className="text-gray-400 text-sm mt-1">
            Tecnología al servicio de tu bienestar.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* ── Hero misión ── */}
        <div className="bg-[#1a3a6b] rounded-3xl p-10 md:p-14 relative overflow-hidden">
          {/* Decoración */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Nuestra Misión
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
              Innovación en el<br />Cuidado Médico
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              Este proyecto nace con el objetivo de fusionar el e-commerce farmacéutico con
              la potencia de la Inteligencia Artificial. No es solo una tienda — es un
              asistente personal para tu salud.
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 text-center">
              <p className="text-3xl font-black text-[#1a3a6b] dark:text-blue-400">{s.num}</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Características ── */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Lo que nos diferencia
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stack tecnológico ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-6">
            Stack tecnológico
          </h2>
          <div className="flex flex-wrap gap-3">
            {stack.map((s) => (
              <span key={s} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs font-mono font-semibold tracking-wider uppercase px-4 py-2 rounded-lg">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── Quote ── */}
        <blockquote className="text-center max-w-2xl mx-auto pb-8">
          <p className="text-gray-400 dark:text-gray-500 text-sm italic leading-relaxed">
            "En PharmaCare Systems, creemos que la tecnología debe estar al servicio de la vida.
            Nuestra misión es simplificar la gestión farmacéutica para que tú solo te preocupes
            de sentirte bien."
          </p>
          <p className="mt-4 text-xs font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
            — Equipo PharmaCare
          </p>
        </blockquote>

      </div>
    </div>
  );
}
