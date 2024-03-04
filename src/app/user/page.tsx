"use client";

import { FormLogin } from "../components/FormLogin";
import { FormRegister } from "../components/FormRegister";

export default function user() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-between p-24">
        <section>
          <FormLogin />
        </section>

        <section>
          <FormRegister />
        </section>
      </main>
    </>
  );
}
