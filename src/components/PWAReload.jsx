import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect } from 'react';

export default function PWAReload() {
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      // Her 60 saniyede SW güncelleme kontrolü
      r && setInterval(() => r.update(), 60000);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      // Yeni sürüm var → hemen yükle
      updateServiceWorker(true);
    }
  }, [needRefresh, updateServiceWorker]);

  return null;
}
