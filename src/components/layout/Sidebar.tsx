"use client";

import  Link  from "next/link";


export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-blue-900 text-white p-4">
            <h2 className="text-2xl font-bold mb-6">
                Financial System
            </h2>
        

        <nav className="flex flex-col gap-4">
            <Link href="/dashboard">
            <i className="pi pi-home mr-2"></i>
            Dashboard
            </Link>
            <Link href="/users">
            <i className="pi pi-users mr-2"></i>
            Users
            </Link>
            <Link href="/accounts">
            <i className="pi pi-briefcase mr-2"></i>
            Accounts
            </Link>
            <Link href="/income">
            <i className="pi pi-money-bill mr-2"></i>
            Income
            </Link>
            <Link href="/expenses">
            <i className="pi pi-shopping-cart mr-2"></i>
            Expenses
            </Link>
            <Link href="/reports">
            <i className="pi pi-chart-bar mr-2"></i>
            Reports
            </Link>
            <Link href="/settings">
            <i className="pi pi-cog mr-2"></i>
            Settings
            </Link>
        </nav>

        </aside>
    );
}

