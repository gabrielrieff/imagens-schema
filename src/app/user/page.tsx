"use client";

import Link from "next/link";
import { FormLogin } from "~/components/FormLogin";
import { FormRegister } from "~/components/FormRegister";

export default function user() {
  return (
    <>
      <main className="h-full flex flex-col items-center justify-around gap-9 p-16 ms:p-2 ms:justify-normal">
        <div className="flex gap-20 lg:flex-col">
          <section className="h-[600px] lg:h-[400px]">
            <FormLogin />
          </section>

          <section className="h-[600px]">
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
