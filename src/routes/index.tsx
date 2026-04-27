import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroTulips from "@/assets/hero-tulips.jpg";
import photoPuppy from "@/assets/photo-puppy.jpg";
import photoTulipsField from "@/assets/photo-tulips.jpg";
import photoLetter from "@/assets/photo-letter.jpg";
import tulipDoodle from "@/assets/tulip-doodle.png";
import { TulipIcon, PawIcon, HeartIcon } from "@/components/TulipIcon";
import { sealLetter } from "@/server/letter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cartas de Tulipán — Postales vintage hechas a mano" },
      { name: "description", content: "Una colección minimalista de postales vintage en tonos arena, mostaza y cacao. Tulipanes amarillos, perritos y cartas para guardar." },
      { property: "og:title", content: "Cartas de Tulipán — Postales vintage" },
      { property: "og:description", content: "Postales vintage en tonos arena y mostaza. Tulipanes, perritos y cartas hechas con cariño." },
      { property: "og:image", content: heroTulips },
      { name: "twitter:image", content: heroTulips },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type SealedLetter = Awaited<ReturnType<typeof sealLetter>>;

function Index() {
  const [form, setForm] = useState({ to: "", from: "", message: "" });
  const [letter, setLetter] = useState<SealedLetter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSeal(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await sealLetter({ data: form });
      setLetter(res);
      setTimeout(() => {
        document.getElementById("sealed")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative z-10">
      {/* NAV */}
      <header className="px-6 md:px-12 pt-8 pb-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-cocoa">
          <TulipIcon className="w-6 h-9 text-mustard" />
          <span className="font-display text-xl tracking-wide">Cartas de Tulipán</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-[0.2em] text-cocoa/80">
          <a href="#galeria" className="hover:text-cocoa transition">Galería</a>
          <a href="#historia" className="hover:text-cocoa transition">Historia</a>
          <a href="#carta" className="hover:text-cocoa transition">Escribir</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <p className="font-script text-3xl text-mustard mb-2">— hecho a mano, con cariño</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-ink mb-6">
            Postales que <em className="font-script text-cocoa">huelen</em><br/>a primavera tibia.
          </h1>
          <p className="text-lg md:text-xl text-cocoa/80 max-w-md leading-relaxed mb-8">
            Una colección de cartas y fotografías vintage. Tulipanes amarillos, perritos dormidos y atardeceres color miel — guardados en papel envejecido.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#carta" className="inline-flex items-center gap-2 px-6 py-3 bg-cocoa text-background hover:bg-ink transition rounded-sm uppercase tracking-[0.2em] text-xs">
              Escribir una carta <HeartIcon className="w-3.5 h-3.5"/>
            </a>
            <a href="#galeria" className="inline-flex items-center gap-2 px-6 py-3 border border-cocoa/40 text-cocoa hover:bg-sand transition rounded-sm uppercase tracking-[0.2em] text-xs">
              Ver galería
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="polaroid rotate-[-3deg] max-w-md mx-auto" style={{ ['--r' as string]: '-3deg' }}>
            <img
              src={heroTulips}
              alt="Ramo de tulipanes amarillos sobre papel envejecido"
              width={1280}
              height={896}
              className="w-full h-auto block"
            />
            <p className="font-script text-2xl text-cocoa text-center mt-3">tulipanes de abril ✿</p>
          </div>
          <img src={tulipDoodle} alt="" aria-hidden="true" className="absolute -bottom-10 -left-6 w-24 opacity-80 animate-float" style={{ ['--r' as string]: '-15deg' }}/>
          <PawIcon className="absolute -top-6 -right-2 w-12 text-mustard/80 rotate-12 animate-float" />
        </div>
      </section>

      <div className="vintage-divider max-w-4xl mx-auto" />

      {/* GALERÍA */}
      <section id="galeria" className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <p className="font-script text-2xl text-mustard">— álbum de recuerdos</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mt-1">Pequeñas cosas lindas</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          <div className="polaroid rotate-[-4deg] md:mt-8" style={{ ['--r' as string]: '-4deg' }}>
            <img src={photoPuppy} alt="Cachorro vintage en jardín" loading="lazy" width={800} height={1024} className="w-full h-72 object-cover block" />
            <p className="font-script text-2xl text-cocoa text-center mt-2">mi pequeño Otoño 🐾</p>
          </div>
          <div className="polaroid rotate-[2deg]" style={{ ['--r' as string]: '2deg' }}>
            <img src={photoTulipsField} alt="Campo de tulipanes al atardecer" loading="lazy" width={1024} height={800} className="w-full h-72 object-cover block" />
            <p className="font-script text-2xl text-cocoa text-center mt-2">campos de oro, mayo</p>
          </div>
          <div className="polaroid rotate-[-2deg] md:mt-12" style={{ ['--r' as string]: '-2deg' }}>
            <img src={photoLetter} alt="Carta abierta con pétalos amarillos" loading="lazy" width={1024} height={800} className="w-full h-72 object-cover block" />
            <p className="font-script text-2xl text-cocoa text-center mt-2">la carta de la abuela</p>
          </div>
        </div>
      </section>

      <div className="vintage-divider max-w-4xl mx-auto" />

      {/* HISTORIA */}
      <section id="historia" className="max-w-4xl mx-auto px-6 md:px-12 py-24 grid md:grid-cols-[auto_1fr] gap-10 items-center">
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full bg-mustard/30 flex items-center justify-center border border-cocoa/20">
            <TulipIcon className="w-14 h-20 text-cocoa"/>
          </div>
        </div>
        <div>
          <p className="font-script text-2xl text-mustard">— nuestra historia</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mt-1 mb-4">Cosas pequeñas, guardadas con cuidado.</h2>
          <p className="text-cocoa/85 leading-relaxed text-lg">
            Empezamos coleccionando pétalos secos entre páginas de libros viejos.
            Después vinieron las polaroids, los sobres color trigo y las patitas
            del perrito sobre la arena. Esta es nuestra forma de guardar la luz
            de la tarde — para que nunca se vaya del todo.
          </p>
        </div>
      </section>

      <div className="vintage-divider max-w-4xl mx-auto" />

      {/* CARTA / BACKEND */}
      <section id="carta" className="max-w-3xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-12">
          <p className="font-script text-2xl text-mustard">— sella tu carta</p>
          <h2 className="font-display text-4xl md:text-5xl text-ink mt-1">Escribe una postal</h2>
          <p className="text-cocoa/75 mt-3 max-w-md mx-auto">
            La sellamos en nuestro pequeño taller con un matasellos único.
            No la guardamos — es solo tuya, para llevártela.
          </p>
        </div>

        <form onSubmit={handleSeal} className="paper-card p-8 md:p-12 rounded-sm space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.2em] text-cocoa mb-2">Para</span>
              <input
                type="text"
                value={form.to}
                onChange={(e) => setForm({ ...form, to: e.target.value })}
                placeholder="Mamá, abuela, mi mejor amiga…"
                className="w-full bg-transparent border-b border-cocoa/40 focus:border-cocoa outline-none py-2 font-display text-lg text-ink placeholder:text-cocoa/40"
                maxLength={60}
                required
              />
            </label>
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.2em] text-cocoa mb-2">De</span>
              <input
                type="text"
                value={form.from}
                onChange={(e) => setForm({ ...form, from: e.target.value })}
                placeholder="Tu nombre"
                className="w-full bg-transparent border-b border-cocoa/40 focus:border-cocoa outline-none py-2 font-display text-lg text-ink placeholder:text-cocoa/40"
                maxLength={60}
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="block text-xs uppercase tracking-[0.2em] text-cocoa mb-2">Mensaje</span>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Escribe algo bonito…"
              rows={6}
              maxLength={600}
              className="w-full bg-transparent border border-cocoa/30 rounded-sm p-4 font-script text-2xl text-ink leading-snug outline-none focus:border-cocoa placeholder:text-cocoa/40 resize-none"
              required
            />
            <span className="block text-right text-xs text-cocoa/60 mt-1">{form.message.length}/600</span>
          </label>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 bg-cocoa text-background hover:bg-ink transition rounded-sm uppercase tracking-[0.2em] text-xs disabled:opacity-50"
          >
            {loading ? "Sellando…" : "Sellar y mostrar carta"}
          </button>
        </form>

        {letter && (
          <div id="sealed" className="mt-16 animate-fade-up">
            <div className="paper-card p-8 md:p-12 rounded-sm relative rotate-[-0.5deg] shadow-2xl">
              {/* Stamp */}
              <div className="absolute -top-3 right-6 md:right-12 rotate-6">
                <div className="bg-mustard/90 text-ink px-3 py-2 deckle text-center" style={{ minWidth: 90 }}>
                  <TulipIcon className="w-5 h-7 mx-auto text-cocoa" />
                  <p className="text-[9px] uppercase tracking-widest mt-1">{letter.stamp}</p>
                </div>
              </div>
              <div className="absolute top-4 left-6 opacity-70">
                <div className="border-2 border-cocoa/60 rounded-full px-3 py-2 rotate-[-8deg]">
                  <p className="text-[10px] uppercase tracking-widest text-cocoa font-display">{letter.postmark}</p>
                  <p className="text-[10px] text-cocoa/80 text-center">{letter.sealedAt}</p>
                </div>
              </div>

              <div className="pt-20">
                <p className="font-script text-3xl text-cocoa mb-6">Para mi querida/o {letter.to},</p>
                <p className="font-script text-2xl text-ink leading-relaxed whitespace-pre-wrap">
                  {letter.message}
                </p>
                <p className="font-script text-3xl text-cocoa mt-8 text-right">
                  con cariño,<br/>{letter.from}
                </p>
                <div className="mt-8 pt-4 border-t border-cocoa/20 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-cocoa/60">
                  <span>N.º {letter.id}</span>
                  <span>Sellada en nuestro taller</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-cocoa/20 mt-12 py-10 text-center text-cocoa/70 text-sm">
        <div className="flex justify-center gap-3 mb-3 text-mustard">
          <TulipIcon className="w-5 h-7"/>
          <PawIcon className="w-5 h-5"/>
          <TulipIcon className="w-5 h-7"/>
        </div>
        <p className="font-script text-xl text-cocoa">Cartas de Tulipán · {new Date().getFullYear()}</p>
        <p className="text-xs mt-1">Hecho con pétalos secos y mucho cariño.</p>
      </footer>
    </div>
  );
}
