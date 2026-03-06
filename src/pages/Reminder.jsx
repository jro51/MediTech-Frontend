import Header from "../components/Header";
export default function Reminder(){
    return (
        <>
            <Header name={"Crear Recordatorio"}/>
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-dashed border-gray-800">
                    <svg className="mx-auto h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="mt-4 text-gray-400 text-lg">Aún no disponible.</p>
                </div>
            </main>
        </>
    );
}