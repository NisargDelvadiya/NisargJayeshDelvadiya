"use client";

import React from "react";

export default function BackgroundElements() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden opacity-20 pointer-events-none">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/assets/bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
    );
}
