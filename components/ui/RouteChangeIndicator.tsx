'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';
import './nprogress.css'; // We'll create this next

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.1 });

// This component listens to pathname/searchParams changes to stop the bar.
// For STARTING the bar, we need to wrap Link clicks or use a bespoke solution,
// but usually listening to `usePathname` is for *stopping*.
// To capture the *start* of a navigation in App Router (without generic events),
// we often wrap the `next/link` or rely on the fact that Next.js doesn't give us
// a perfect "start" event out of the box easily. 
// However, standard practice for now is to trigger on click of links or mutation.
// BUT, a simpler way is to use a library like `nextjs-toploader` or `NextTopLoader`.
// Since I can't easily install new packages without user permission, I'll build a simple
// MutationObserver or Link wrapper logic?
// actually, let's try a simpler approach: 
// We will trigger start whenever the pathname changes? No that's too late.
// We will auto-start on mount? No.
// Let's implement a global click listener for anchors that are local.

export function RouteChangeIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When the component mounts (or pathname changes), we assume loading is done.
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Global click listener to detect navigation attempts
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a');
      if (target && target.href && target.href.startsWith(window.location.origin) && target.target !== '_blank') {
        const targetUrl = new URL(target.href);
        if (targetUrl.pathname !== window.location.pathname || targetUrl.search !== window.location.search) {
            NProgress.start();
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
