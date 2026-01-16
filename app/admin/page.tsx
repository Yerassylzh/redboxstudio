import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: games } = await supabase.from('games').select('*').order('created_at', { ascending: false });

  return (
    <div className="py-20">
      <Container>
        <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-heading text-primary uppercase tracking-widest">
                System Mainframe
            </h1>
            <Button asChild variant="default" className="font-mono">
                <Link href="/admin/games/new">
                   + Initialize New Protocol
                </Link>
            </Button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
            {/* Table Header */}
            <div className="grid grid-cols-[80px_1fr_1fr_100px] gap-4 p-4 border-b border-white/10 bg-white/5 font-mono text-xs uppercase text-muted-foreground">
                <div>Icon</div>
                <div>Protocol Name</div>
                <div>Category</div>
                <div className="text-right">Action</div>
            </div>

            {/* List */}
            {games && games.length > 0 ? (
                games.map((game) => (
                    <div key={game.id} className="grid grid-cols-[80px_1fr_1fr_100px] gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors group">
                        <div className="relative size-12 bg-black border border-white/20 overflow-hidden rounded-sm">
                            {game.image_url ? (
                                <Image src={game.image_url} alt={game.title} fill className="object-cover" />
                            ) : (
                                <div className="size-full flex items-center justify-center text-xs text-white/20">N/A</div>
                            )}
                        </div>
                        <div className="font-heading text-sm text-white group-hover:text-primary transition-colors">
                            {game.title}
                            <div className="text-[10px] breadcrumbs font-mono text-muted-foreground">{game.slug}</div>
                        </div>
                         <div className="font-mono text-xs text-white/70">
                            {game.category}
                        </div>
                        <div className="text-right">
                             <Button asChild variant="outline" size="sm" className="font-mono text-xs h-7">
                                <Link href={`/admin/games/${game.id}`}>
                                   Access
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-12 text-center text-muted-foreground font-mono text-sm">
                    NO ACTIVE PROTOCOLS FOUND
                </div>
            )}
        </div>
      </Container>
    </div>
  );
}
