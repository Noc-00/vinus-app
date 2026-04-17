import { useState } from 'react';
import QAForums from "./QAForum";
import QAChats from "./QAChats";

export default function QA() {
  const [tab, setTab] = useState('forums');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border px-5 py-4">
        <h1 className="text-lg font-bold mb-3">Q&A</h1>
        <div className="flex gap-1 bg-muted p-1 rounded-xl">
          <button
            onClick={() => setTab('forums')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'forums'
                ? 'bg-card shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Foros
          </button>
          <button
            onClick={() => setTab('chats')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'chats'
                ? 'bg-card shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Chats
          </button>
        </div>
      </header>
      <div className="pt-2 pb-24">
        {tab === 'forums' ? <QAForums /> : <QAChats />}
      </div>
    </div>
  );
}