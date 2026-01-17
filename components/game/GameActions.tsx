'use client';

import { useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Smartphone, Monitor } from "lucide-react";
import { logEvent } from "@/app/actions/analytics";

interface GameActionsProps {
    slug: string;
    platforms: {
        android?: string;
        web?: string;
        ios?: string;
    };
    labels: {
        googlePlay: string;
        playOnWeb: string;
        comingSoon: string;
    };
    locale: string;
}

export function GameActions({ slug, platforms, labels, locale }: GameActionsProps) {
    
    // Log Page View on mount
    useEffect(() => {
        // Fire and forget
        logEvent('page_view', slug, locale);
    }, [slug, locale]);

    const handleTrackAndNav = (type: string) => {
        logEvent(type, slug, locale);
    };

    return (
        <div className="space-y-4">
            {platforms.android && (
                <Button 
                    variant="default" 
                    className="w-full justify-start gap-3 h-9 md:h-14 text-[10px] md:text-base" 
                    asChild
                    onClick={() => handleTrackAndNav('click_android')}
                >
                    <Link href={platforms.android} target="_blank">
                        <Smartphone className="size-4 md:size-5 shrink-0" /> {labels.googlePlay}
                    </Link>
                </Button>
            )}

            {platforms.web && (
                <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 h-9 md:h-14 text-[10px] md:text-base border-white/20 hover:border-white" 
                    asChild
                    onClick={() => handleTrackAndNav('click_web')}
                >
                    <Link href={platforms.web} target="_blank">
                        <Monitor className="size-4 md:size-5 shrink-0" /> {labels.playOnWeb}
                    </Link>
                </Button>
            )}

            {!platforms.web && !platforms.android && (
                <div className="text-center p-4 border border-dashed border-white/20 text-muted-foreground text-sm font-sans">
                    {labels.comingSoon}
                </div>
            )}
        </div>
    );
}
