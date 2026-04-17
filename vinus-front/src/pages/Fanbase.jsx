import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import apiClient from '@/api/apiClient';
import FanbaseProfileModal from "@/components/fanbase/FanbaseProfileModal";
import FanbaseFeed from "@/components/fanbase/FanbaseFeed";
import UnderConstruction from "@/components/shared/UnderConstruction";

const POST_TYPES = ['Todo', 'Convocatoria', 'Evento', 'Beca', 'Noticia', 'Taller', 'Otro'];

export default function Fanbase() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [follows, setFollows] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('Todo');
  const [selectedAccount, setSelectedAccount] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setUser({ email: 'test@vinus.com' });
      setAccounts([]);
      setFollows([]);
      setPosts([]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const isFollowing = (accountId) => follows.some((f) => f.account_id === accountId);

  const handleFollowToggle = async (account) => {
    const existing = follows.find((f) => f.account_id === account.id);
    if (existing) {
      setFollows(follows.filter((f) => f.account_id !== account.id));
      setAccounts(accounts.map((a) => a.id === account.id ? { ...a, followers_count: Math.max(0, (a.followers_count || 0) - 1) } : a));
    } else {
      const newFollow = { account_id: account.id, account_username: account.username };
      setFollows([...follows, newFollow]);
      setAccounts(accounts.map((a) => a.id === account.id ? { ...a, followers_count: (a.followers_count || 0) + 1 } : a));
    }
  };

  const followedIds = follows.map((f) => f.account_id);
  const feedPosts = posts.filter((p) => {
    const inFeed = followedIds.length === 0 || followedIds.includes(p.account_id);
    const matchType = selectedType === 'Todo' || p.type === selectedType;
    const matchSearch = !search || p.content?.toLowerCase().includes(search.toLowerCase()) || p.account_username?.toLowerCase().includes(search.toLowerCase());
    return inFeed && matchType && matchSearch;
  });

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <UnderConstruction />
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border px-4 py-3">
        <h1 className="text-lg font-bold mb-3">Fanbase</h1>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar publicaciones o cuentas..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {POST_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedType === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-6">
          <div>
            <h2 className="text-sm font-semibold mb-2 text-muted-foreground">Cuentas</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {accounts.length > 0 ? (
                accounts.map((acc) => (
                  <AccountAvatar key={acc.id} account={acc} following={isFollowing(acc.id)} onOpen={() => setSelectedAccount(acc.id)} onFollow={() => handleFollowToggle(acc)} />
                ))
              ) : (
                <p className="text-xs text-muted-foreground italic">No hay cuentas para mostrar.</p>
              )}
            </div>
          </div>
          <FanbaseFeed posts={feedPosts} user={user} onAccountClick={(accountId) => setSelectedAccount(accountId)} onPostsChange={loadData} />
        </div>
      )}
    </div>
  );
}

function AccountAvatar({ account, following, onOpen }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[60px]">
      <div className={`w-14 h-14 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${following ? 'border-primary' : 'border-border'}`} onClick={onOpen}>
        {account.avatar_url ? (
          <img src={account.avatar_url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">{account.username?.[0]?.toUpperCase()}</span>
          </div>
        )}
      </div>
      <span className="text-[10px] text-center text-muted-foreground font-medium truncate w-full">@{account.username}</span>
    </div>
  );
}