import { createServerFn } from "@tanstack/react-start";

type LetterInput = {
  to: string;
  from: string;
  message: string;
};

const STAMPS = [
  "Tulipanes de primavera",
  "Patitas viajeras",
  "Recuerdos de oro",
  "Cartas que perduran",
  "Pétalos al viento",
];

const POSTMARKS = [
  "Correos de Otoño",
  "Estación Girasol",
  "Oficina del Sol Tibio",
  "Posta de los Tulipanes",
];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export const sealLetter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): LetterInput => {
    const i = input as Partial<LetterInput>;
    if (!i || typeof i.to !== "string" || typeof i.from !== "string" || typeof i.message !== "string") {
      throw new Error("Datos incompletos");
    }
    const to = i.to.trim().slice(0, 60);
    const from = i.from.trim().slice(0, 60);
    const message = i.message.trim().slice(0, 600);
    if (!to || !from || !message) throw new Error("Por favor completa todos los campos");
    return { to, from, message };
  })
  .handler(async ({ data }) => {
    const seed = hashStr(data.to + data.from + data.message + Date.now().toString());
    const date = new Date();
    const months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const stamped = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;

    return {
      id: seed.toString(36).slice(0, 8).toUpperCase(),
      to: data.to,
      from: data.from,
      message: data.message,
      stamp: pick(STAMPS, seed),
      postmark: pick(POSTMARKS, Math.floor(seed / 7)),
      sealedAt: stamped,
    };
  });
