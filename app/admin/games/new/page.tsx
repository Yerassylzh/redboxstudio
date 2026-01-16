import { Container } from "@/components/ui/Container";
import { GameForm } from "@/components/admin/GameForm";

export default function NewGamePage() {
  return (
    <div className="py-20">
      <Container>
         <div className="mb-8">
            <h1 className="text-2xl font-heading text-white uppercase tracking-widest">
                &gt; Initialize Validation Protocol
            </h1>
            <p className="font-mono text-xs text-muted-foreground mt-2">Create a new game entry in the database.</p>
         </div>
         
         <GameForm />
      </Container>
    </div>
  )
}
