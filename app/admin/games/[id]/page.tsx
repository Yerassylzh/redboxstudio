import { Container } from "@/components/ui/Container";
import { GameForm } from "@/components/admin/GameForm";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: game } = await supabase.from('games').select('*').eq('id', id).single();
  
  if (!game) {
    notFound();
  }

  return (
    <div className="py-20">
      <Container>
         <div className="mb-8">
            <h1 className="text-2xl font-heading text-white uppercase tracking-widest">
                &gt; Edit Protocol: {game.title}
            </h1>
            <p className="font-mono text-xs text-muted-foreground mt-2">Modifying existing database entry [{id}]</p>
         </div>
         
         <GameForm game={game} />
      </Container>
    </div>
  )
}
