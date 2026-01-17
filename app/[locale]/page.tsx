import { Hero } from "@/components/home/Hero";
import { RecentReleases } from "@/components/home/RecentReleases";
import { FAQ } from "@/components/home/FAQ";
import { getLatestGame } from "@/lib/games";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale();
  const latestGame = await getLatestGame(locale);

  return (
    <div className="flex flex-col gap-24 pb-20">
      <Hero latestGame={latestGame} />
      <RecentReleases />
      <FAQ />
    </div>
  )
}
