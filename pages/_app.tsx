import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { Toaster } from 'sonner';

import '@/styles/globals.css'
import { useAuthStore } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  const { loadState } = useAuthStore();
  useEffect(() => {

    const storageTheme = localStorage.getItem('__theme__');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const newTheme = storageTheme ?? systemTheme;
    localStorage.setItem('__theme__', newTheme);

    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    loadState();

  }, [loadState])

  return (
    <>
      <Toaster richColors position='top-right' />
      <Component {...pageProps} />
    </>
  )
}
