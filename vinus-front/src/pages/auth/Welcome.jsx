import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import vinus from '@/assets/vinus.jpg';

export default function Welcome() {
    const [ init, setInit ] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log("Partículas cargadas:", container);
    };

    const options = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#7c3aed",
            },
            links: {
                enable: false,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out",
                },
                random: true,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 30,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 10, max: 30 },
                animation: {
                    enable: true,
                    speed: 2,
                    sync: false,
                    startValue: "random",
                    destroy: "none"
                }
            },
        },
        detectRetina: true,
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-background overflow-hidden">

            { init && (
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                />
            )}
            <img src={vinus} alt="Vinus" className="w-48 h-48 rounded-3xl object-cover mb-8 shadow-2xl relative z-10" />
            <h1 className="text-4xl font-black mb-2 relative z-10">Bienvenido a Vinus</h1>
            <p className="text-muted-foreground mb-10 text-center relative z-10">Tu espacio para conectar, aprender y crecer.</p>

            <div className="w-full max-w-sm space-y-3 relative z-10">
                <Link to="/register" className="block w-full py-4 bg-primary text-primary-foreground text-center font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                    Crear cuenta
                </Link>
                <Link to="/login" className="block w-full py-4 bg-muted text-foreground text-center font-bold rounded-2xl hover:bg-muted/80 transition-colors">
                    Ya tengo una cuenta
                </Link>
            </div>
        </div>
    );
}