import { Hero } from "@/components/home/Hero";
import { RecentReleases } from "@/components/home/RecentReleases";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      <Hero />
      <RecentReleases />
      <FAQ />
    </div>
  )
}
