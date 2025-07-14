import { useEffect, useState } from 'react';

export function usePWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone === true; // for iOS

    setIsStandalone(checkStandalone);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    // @ts-ignore
    deferredPrompt.prompt();
    // @ts-ignore
    const choiceResult = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return choiceResult;
  };

  return { deferredPrompt, promptInstall, isStandalone };
}
