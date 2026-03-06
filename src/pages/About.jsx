import Header from "../components/Header";
export default function About(){
    return(
        <>
            
      <Header name={"Acerca de Nosotros"} />

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Tarjeta Principal */}
        <div className="relative overflow-hidden bg-gray-900/50 rounded-3xl border border-gray-800 p-8 md:p-12 shadow-2xl">
          {/* Decoración de fondo (Brillo sutil) */}
          <div className="absolute -top-24 -right-24 size-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-6">
              Innovación en el Cuidado Médico
            </h2>
            
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              Este proyecto individual nace con el objetivo de fusionar el E-Commerce farmacéutico con la potencia de la Inteligencia Artificial. No es solo una tienda, es un asistente 
              personal para tu salud.
            </p>

            {/* Grid de características clave */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-950/50 p-6 rounded-2xl border border-gray-800">
                <div className="size-10 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-2">IA Predictiva</h4>
                <p className="text-sm text-gray-500">Recomendaciones personalizadas basadas en cada compra.</p>
              </div>

              <div className="bg-gray-950/50 p-6 rounded-2xl border border-gray-800">
                <div className="size-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-2">Control Total</h4>
                <p className="text-sm text-gray-500">Gestión de inventario y recordatorios en tiempo real.</p>
              </div>

              <div className="bg-gray-950/50 p-6 rounded-2xl border border-gray-800">
                <div className="size-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="font-bold text-white mb-2">Escalabilidad</h4>
                <p className="text-sm text-gray-500">Arquitectura robusta con microservicios y Kafka.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de tecnología (Opcional, pero se ve muy bien) */}
        <div className="mt-12 flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
          <span className="text-xs text-white font-mono tracking-widest uppercase">Java Spring Boot</span>
          <span className="text-xs text-white font-mono tracking-widest uppercase">React</span>
          <span className="text-xs text-white font-mono tracking-widest uppercase">Python AI</span>
          <span className="text-xs text-white font-mono tracking-widest uppercase">Kafka</span>
        </div>
      </main>
    
        </>
    );
}