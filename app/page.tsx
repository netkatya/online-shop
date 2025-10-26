import OurFeatures from "@/components/features/features";
import Hero from "@/components/hero/hero";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full min-w-[1440px] flex-col items-center justify-between sm:items-start">
        <Hero />
        <OurFeatures />
      </main>
    </div>
  );
}
