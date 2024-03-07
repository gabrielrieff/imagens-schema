"use client";

import Link from "next/link";
import { FormLogin } from "~/components/FormLogin";
import { FormRegister } from "~/components/FormRegister";

export default function user() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-around p-24">
        <h1 className="text-3xl font-medium">Imagens-schema</h1>
        <div className="flex gap-20">
          <section className="h-[550px]">
            <FormLogin />
          </section>

          <section className="h-[550px]">
            <FormRegister />
          </section>
        </div>

        <Link
          href={"/"}
          className="hover:underline text-blue-700 hover:text-blue-400"
        >
          Voltar para Home
        </Link>
      </main>
    </>
  );
}
