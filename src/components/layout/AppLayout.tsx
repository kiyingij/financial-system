"use client";


import Sidebar from "./Sidebar";
import Topbar from "./Topbar";


export default function AppLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 bg-gray-100 min-h-screen">
                <Topbar />

                <main className="p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}
