'use client';

import { Page, useGlobalStore } from '@/store/useGlobalStore';
import { SpeakingDiary } from '@/app/pages/SpeakingDiary';
import { WordNotes } from '@/app/pages/WordNotes';

export default function Home() {
  const globalStore = useGlobalStore();

  switch (globalStore.currentPage) {
    case Page.Notes:
      return <WordNotes />;
    default:
      return <SpeakingDiary />;
  }
}
