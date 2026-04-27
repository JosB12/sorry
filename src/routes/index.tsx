import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import heroTulips from "@/assets/hero-tulips.jpg";
import photoPuppy from "@/assets/hqdefault.webp";
import photoTulipsField from "@/assets/sorry-dog.gif";
import photoLetter from "@/assets/ynmq.webp";
import tulipDoodle from "@/assets/tulip-doodle.png";
import { TulipIcon, HeartIcon } from "@/components/TulipIcon";

// ─── EmailJS config ───────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "REEMPLAZA_SERVICE_ID";   // ← paso 3
const EMAILJS_TEMPLATE_ID = "REEMPLAZA_TEMPLATE_ID";  // ← paso 4
const EMAILJS_PUBLIC_KEY  = "REEMPLAZA_PUBLIC_KEY";   // ← paso 2
// ─────────────────────────────────────────────────────────────────────────────

function sendNotification(respuesta: "✅ SÍ ME PERDONÓ" | "❌ Todavía no...") {
  emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      respuesta,
      fecha: new Date().toLocaleString("es"),
      to_email: "blancojosue931@gmail.com",
    },
    EMAILJS_PUBLIC_KEY
  ).catch(() => { /* silencioso si falla */ });
}

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Lo siento mucho — Una disculpa de corazón" },
      { name: "description", content: "Una página especial para pedir perdón con todo el cariño del mundo." },
    ],
  }),
  component: Index,
}));

function FloatingPetal({ style }: { style: React.CSSProperties }) {
  return (
    <div className="petal" style={style} aria-hidden="true">
      🌸
    </div>
  );
}

function Index() {
  const [accepted, setAccepted] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [petals, setPetals] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const [buttonClicks, setButtonClicks] = useState(0);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${6 + Math.random() * 6}s`,
        fontSize: `${14 + Math.random() * 12}px`,
        opacity: 0.5 + Math.random() * 0.4,
      } as React.CSSProperties,
    }));
    setPetals(generated);
  }, []);

  function handleNoClick() {
    setShaking(true);
    setButtonClicks((c) => c + 1);
    setTimeout(() => setShaking(false), 600);
    if (buttonClicks === 0) {
      // Solo notifica la primera vez que presiona "No"
      sendNotification("❌ Todavía no...");
    }
  }

  function handleAccept() {
    setAccepted(true);
    sendNotification("✅ SÍ ME PERDONÓ");
    setTimeout(() => {
      document.getElementById("gracias")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  const noButtonMessages = [
    "¿En serio? 🥺",
    "Piénsalo bien… 💔",
    "Pero te lo juro 😢",
    "Por favor… 🌸",
    "Okay pero considera que te quiero mucho 🥺",
    "Nooooo espera 😭",
    "…¿y si te digo que me arrepiento mucho?",
    "Este botón ya no debería existir…",
  ];

  const noMessage = noButtonMessages[Math.min(buttonClicks, noButtonMessages.length - 1)];

  return (
    <div className="relative z-10 overflow-hidden">
      {/* Floating petals background */}
      <div className="petals-container" aria-hidden="true">
        {petals.map((p) => (
          <FloatingPetal key={p.id} style={p.style} />
        ))}
      </div>

      {/* HERO — apología principal */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        <div className="animate-fade-up max-w-2xl mx-auto">
          {/* Tulipán animado */}
          <div className="flex justify-center mb-8">
            <div className="sorry-tulip-wrap">
              <TulipIcon className="w-16 h-24 text-mustard animate-float" />
            </div>
          </div>

          <p className="font-script text-3xl text-mustard mb-3">— con todo mi corazón</p>

          <h1 className="font-display text-6xl md:text-8xl leading-[1.05] text-ink mb-6">
            Lo siento <em className="font-script text-cocoa">mucho.</em>
          </h1>

          <p className="text-xl md:text-2xl text-cocoa/80 leading-relaxed mb-6 font-body max-w-lg mx-auto">
            Sé que puedo llegar a ser un poco estresante, como una garrapatita que no suelta. No tengo excusas, lo siento mucho y trataré de mejorar cada día. No te canses de mí.
          </p>

          <div className="flex justify-center mb-8">
            <div className="polaroid rotate-[-2deg] max-w-xs">
              <img
                src={heroTulips}
                alt="Tulipanes amarillos — un regalo de disculpa"
                width={1280}
                height={896}
                className="w-full h-48 object-cover block"
              />
              <p className="font-script text-xl text-cocoa text-center mt-3">
                para ti, con cariño ✿
              </p>
            </div>
          </div>

          <a
            href="#carta"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cocoa text-background hover:bg-ink transition rounded-sm uppercase tracking-[0.2em] text-xs animate-pulse-gentle"
          >
            Leer mi carta <HeartIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft opacity-60">
          <div className="w-px h-12 bg-cocoa/40 mx-auto mb-1" />
          <p className="font-script text-sm text-cocoa">sigue leyendo</p>
        </div>
      </section>

      <div className="vintage-divider max-w-4xl mx-auto" />

      {/* CARTA — el mensaje de disculpa */}
      <section id="carta" className="max-w-3xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-12">
          <p className="font-script text-2xl text-mustard">— mi carta para ti</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mt-1">
            Lo que necesito que sepas
          </h2>
        </div>

        <div className="paper-card p-8 md:p-14 rounded-sm relative rotate-[-0.5deg] shadow-2xl">
          {/* Sello decorativo */}
          <div className="absolute -top-3 right-6 md:right-12 rotate-6">
            <div className="bg-mustard/90 text-ink px-3 py-2 deckle text-center" style={{ minWidth: 90 }}>
              <TulipIcon className="w-5 h-7 mx-auto text-cocoa" />
              <p className="text-[9px] uppercase tracking-widest mt-1">perdón sincero</p>
            </div>
          </div>

          {/* Matasellos */}
          <div className="absolute top-4 left-6 opacity-60">
            <div className="border-2 border-cocoa/50 rounded-full px-3 py-2 rotate-[-8deg]">
              <p className="text-[10px] uppercase tracking-widest text-cocoa font-display">lo siento</p>
              <p className="text-[10px] text-cocoa/80 text-center">{new Date().toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" })}</p>
            </div>
          </div>

          <div className="pt-16">
            <p className="font-script text-3xl text-cocoa mb-8">Para la flor más brillante del jardín,</p>

            <div className="space-y-5 font-script text-2xl text-ink leading-relaxed">
              <p>
                Sé que lo que pasó te pudo haber dolido, o enojado un poco.
                Pero quiero que sepas que no fue mi intención hacerte sentir de esa manera.
              </p>
              <p>
                Me equivoqué. No hay otra forma de decirlo.
                Y aunque sé que un "lo siento" no borra las cosas,
                sí viene del lugar más sincero que tengo.
              </p>
              <p>
                Nuestra amistad significa mucho para mí, demasiado como para
                estar mal en este momento. Eres de las personas más importantes
                en mi vida, y me duele saber que te fallé.
              </p>
              <p>
                Espero que puedas perdonarme y que volvamos a hablar bien.
                Y cuando veas esto espero poder llamarte <span style={{ color: "#D4A017" }}>🌷</span>
              </p>
              <p className="text-right pt-4">
                Con todo mi cariño,<br />
                <span className="text-3xl text-cocoa">El ñoñito</span> 🤍
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-cocoa/20 flex items-center justify-center">
              <div className="flex gap-2 text-mustard">
                <TulipIcon className="w-4 h-6" />
                <TulipIcon className="w-4 h-6" />
                <TulipIcon className="w-4 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="vintage-divider max-w-4xl mx-auto" />

      {/* RECUERDOS — galería de momentos bonitos */}
      <section id="recuerdos" className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-mustard">Entonces...</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mt-1">
            Me perdonas?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          <div className="polaroid rotate-[-4deg] md:mt-8" style={{ ["--r" as string]: "-4deg" }}>
            <img src={photoPuppy} alt="Momentos pequeños y bonitos" loading="lazy" width={800} height={1024} className="w-full h-72 object-cover block" />
            <p className="font-script text-xl text-cocoa text-center mt-2">los momentos pequeños 🐾</p>
          </div>
          <div className="polaroid rotate-[2deg]" style={{ ["--r" as string]: "2deg" }}>
            <img src={photoTulipsField} alt="Todo lo que compartimos" width={1024} height={800} className="w-full h-72 object-cover block" />
            <p className="font-script text-xl text-cocoa text-center mt-2">todo lo que compartimos ✿</p>
          </div>
          <div className="polaroid rotate-[-2deg] md:mt-12" style={{ ["--r" as string]: "-2deg" }}>
            <img src={photoLetter} alt="Las cartas que nunca me atrevo a escribir" loading="lazy" width={1024} height={800} className="w-full h-72 object-cover block" />
            <p className="font-script text-xl text-cocoa text-center mt-2">lo que no sé cómo decir 💌</p>
          </div>
        </div>
      </section>

      <div className="vintage-divider max-w-4xl mx-auto" />

      {/* DECISIÓN — el botón icónico */}
      <section className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="text-center mb-10">
          <p className="font-script text-2xl text-mustard mb-2">— la gran pregunta</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink">
            ¿Me perdonas?
          </h2>
          <p className="text-cocoa/70 mt-4 text-lg max-w-sm mx-auto">
            Solo necesito saberlo. Te prometo que lo merezco… o al menos lo estoy intentando. 🥺
          </p>
        </div>

        {!accepted ? (
          <div className="paper-card p-10 rounded-sm">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button
                id="btn-yes"
                onClick={handleAccept}
                className="px-10 py-4 bg-cocoa text-background hover:bg-ink transition rounded-sm uppercase tracking-[0.2em] text-sm font-display hover:scale-105 active:scale-95 transition-all"
              >
                Sí, te perdono 🌸
              </button>
              <button
                id="btn-no"
                onClick={handleNoClick}
                className={`px-8 py-4 border border-cocoa/40 text-cocoa/70 hover:bg-sand transition rounded-sm uppercase tracking-[0.1em] text-xs ${shaking ? "animate-shake" : ""}`}
                style={{
                  transform: buttonClicks > 0 ? `translate(${Math.random() * 40 - 20}px, ${Math.random() * 20 - 10}px) scale(${Math.max(0.7, 1 - buttonClicks * 0.05)})` : undefined,
                  transition: "transform 0.3s ease, opacity 0.5s",
                  opacity: Math.max(0.2, 1 - buttonClicks * 0.1),
                  fontSize: `${Math.max(9, 12 - buttonClicks)}px`,
                }}
              >
                {buttonClicks === 0 ? "Todavía no…" : noMessage}
              </button>
            </div>
            {buttonClicks > 0 && (
              <p className="font-script text-xl text-cocoa/80 animate-fade-up">
                {buttonClicks < 3 ? "Ese botón no debería existir 🥺" : "Okay, ya casi desaparece ese botón…"}
              </p>
            )}
          </div>
        ) : (
          <div id="gracias" className="paper-card p-10 md:p-14 rounded-sm animate-fade-up">
            <div className="text-6xl mb-4 animate-float" style={{ display: "inline-block" }}>🌷</div>
            <h3 className="font-display text-4xl text-ink mb-4">¡Gracias, de verdad!</h3>
            <p className="font-script text-2xl text-cocoa leading-relaxed max-w-md mx-auto">
              Sabía que eras la mejor persona del mundo.
              Te prometo que no te vuelvo a fallar.
              ¡Mereces todos los tulipanes! 🌸✨
            </p>
            <div className="mt-8 flex justify-center gap-3 text-mustard animate-float">
              <TulipIcon className="w-6 h-9" />
              <HeartIcon className="w-6 h-6 mt-2 text-red-400" />
              <TulipIcon className="w-6 h-9" />
            </div>
          </div>
        )}
      </section>

      {/* Doodle decorativo */}
      <div className="fixed bottom-8 right-6 opacity-60 pointer-events-none animate-float" aria-hidden="true" style={{ ["--r" as string]: "-15deg" }}>
        <img src={tulipDoodle} alt="" className="w-20" />
      </div>

      {/* FOOTER */}
      <footer className="border-t border-cocoa/20 mt-4 py-10 text-center text-cocoa/70 text-sm">
        <div className="flex justify-center gap-3 mb-3 text-mustard">
          <TulipIcon className="w-5 h-7" />
          <HeartIcon className="w-5 h-5 mt-1 text-red-300" />
          <TulipIcon className="w-5 h-7" />
        </div>
        <p className="font-script text-xl text-cocoa">con todo mi cariño · {new Date().getFullYear()}</p>
        <p className="text-xs mt-1">Hecha con pétalos secos, arrepentimiento genuino y mucho amor. 🌸</p>
      </footer>
    </div>
  );
}
