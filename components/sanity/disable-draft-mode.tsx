import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function DisableDraftMode() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShow(window.top === window);
  }, []);

  const handleDisableDraft = async () => {
    await window.fetch('/api/disable-draft');
    router.reload();
  };

  if (!show) return null;

  return (
    <div className="fixed right-4 bottom-4 z-999">
      <button
        className="flex cursor-pointer items-center gap-2 rounded-full border border-[#1b17ee]/30 bg-[#1b17ee]/20 px-3 py-1.5 text-sm font-medium shadow-lg backdrop-blur-xl transition-all hover:scale-105"
        onClick={handleDisableDraft}
      >
        <div className="flex h-2 w-2 items-center gap-2 rounded-full bg-[#1b17ee]" />
        <div className="text-xs text-[#1b17ee] opacity-90">Draft mode activé</div>
      </button>
    </div>
  );
}
