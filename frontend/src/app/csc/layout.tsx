"use client"

import React from 'react';
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import Chatbot from "@/components/chatbot";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="flex pt-16">
                <Sidebar />

                <main className="flex-1 ml-[250px] p-6">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            <Chatbot />
        </div>
    );
};

export default Layout;