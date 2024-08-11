"use client";
import { ReactNode } from "react";
import { AppProvider } from "./MyContext";

export default function ContextProvider({ children }: { children: ReactNode }) {
    return (
        <AppProvider>
            {children}
        </AppProvider>
    )
}