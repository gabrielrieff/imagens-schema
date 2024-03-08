"use client";

import logo from "../../../public/logo-image-schema.png";

import Link from "next/link";
import Image from "next/image";
import { FormLogin } from "~/components/FormLogin";
import { FormRegister } from "~/components/FormRegister";

export default function user() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-around gap-9 p-16">
        <Image alt="image-schema" src={logo} width={250} />
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
