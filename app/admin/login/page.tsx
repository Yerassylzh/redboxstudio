"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { login } from "./actions";

// Initial state for the action
const initialState = {
  error: '',
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
      <Container className="max-w-md w-full">
        <div className="bg-black/80 backdrop-blur-md border-2 border-primary/50 p-8 shadow-[0_0_20px_rgba(255,0,0,0.3)] relative overflow-hidden">
             {/* Retro Scanline */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20" />
            
            <div className="relative z-20 space-y-6">
                 <div className="text-center space-y-2">
                    <h1 className="text-2xl font-heading text-white uppercase tracking-widest">
                       <span className="text-primary">&gt;</span> Admin Access
                    </h1>
                    <p className="text-xs text-muted-foreground font-mono">SECURE TERMINAL // AUTHORIZED PERSONNEL ONLY</p>
                 </div>

                 <form action={formAction} className="space-y-4">
                    {state?.error && (
                        <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 text-xs font-mono">
                            ERROR: {state.error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-primary tracking-wider" htmlFor="email">Identity (Email)</label>
                        <input 
                            id="email"
                            name="email"
                            type="email" 
                            required 
                            className="w-full bg-white/5 border border-white/20 p-3 text-white font-mono focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
                            placeholder="admin@redbox.studio"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs uppercase font-bold text-primary tracking-wider" htmlFor="password">Passcode</label>
                        <input 
                            id="password"
                            name="password"
                            type="password" 
                            required 
                            className="w-full bg-white/5 border border-white/20 p-3 text-white font-mono focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <Button 
                        type="submit" 
                        variant="default" 
                        className="w-full mt-4 font-mono uppercase tracking-widest"
                        disabled={isPending}
                    >
                        {isPending ? 'Authenticating...' : 'Initialize Session'}
                    </Button>
                 </form>
            </div>
        </div>
      </Container>
    </div>
  );
}
