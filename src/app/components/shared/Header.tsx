import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center h-[120px]">
      <section>imagens-schema</section>
      <Link href={"/user"} className="py-2 px-4 bg-zinc-500">
        Login
      </Link>
    </header>
  );
};
