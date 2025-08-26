import React from 'react';

// Anda bisa mengganti tipe 'any' dengan tipe yang lebih spesifik jika perlu
// Misalnya, ikon dari library seperti 'react-icons'
const CircleButton = ({ icon, onClick }: { icon: React.ReactNode, onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-200"
    >
        {icon}
    </button>
);

const ArticleHome = () => {
    // Placeholder untuk ikon, Anda bisa menggunakan SVG atau library ikon
    const MoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>;
    const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

    return (
        <div className="relative w-full max-w-[280px] h-[450px] rounded-3xl overflow-hidden shadow-2xl group">
            {/* Background Image */}
            <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                alt="EcoHarvest Business Center"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                    <button className="bg-white/90 backdrop-blur-sm text-gray-800 font-semibold py-1.5 px-4 rounded-full text-xs tracking-wider shadow-md hover:bg-white transition-all duration-200">
                        LEARN DETAILS
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center text-gray-700 shadow-md hover:bg-white transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-end">
                    {/* Title */}
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">EcoHarvest</h2>
                        <h3 className="text-2xl font-light text-gray-700 leading-tight">Business Center</h3>
                    </div>

                    {/* Side Buttons */}
                    <div className="flex flex-col space-y-2">
                        <CircleButton icon={<MoreIcon />} />
                        <CircleButton icon={<SettingsIcon />} />
                        <CircleButton icon={<EyeIcon />} />
                        <CircleButton icon={<CloseIcon />} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleHome;