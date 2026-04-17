import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Plus, Loader2, X } from 'lucide-react';
import apiClient from '@/api/apiClient';
import ProductCard from '../components/shop/ProductCard';
import CreateProductModal from '../components/shop/CreateProductModal';
import ProductDetailModal from '../components/shop/ProductDetailModal';
import { cn } from '@/lib/utils';

const categories = ['Todos', 'Libros', 'Electrónica', 'Ropa', 'Tareas', 'Apuntes', 'Tutorías', 'Otros'];
const types = ['Todos', 'Venta', 'Intercambio', 'Regalo'];

export default function Shop() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState('Todos');

  const loadData = async () => {
    setLoading(true);
    try {
      const pRes = await apiClient.get('/products');
      setProducts(pRes.data);
    } catch (err) { console.error("Error cargando productos:", err); }
    try {
      const meRes = await apiClient.get('/auth/me');
      setUser(meRes.data);
    } catch (e) { setUser(null); }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const filtered = products.filter((p) => {
    const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchType = typeFilter === 'Todos' || p.type === typeFilter.toLowerCase();
    return matchSearch && matchCategory && matchType;
  });

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border px-5 py-4">
        <h1 className="text-lg font-bold mb-3">Shop</h1>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted text-sm focus:outline-none" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={cn("p-2.5 rounded-xl transition-colors", showFilters ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 rounded-2xl bg-muted/50 animate-in slide-in-from-top-2">
            <p className="text-xs font-bold uppercase tracking-widest mb-3">Filtrar por tipo</p>
            <div className="flex gap-2">
              {types.map(t => (
                <button key={t} onClick={() => setTypeFilter(t)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", typeFilter === t ? 'bg-primary text-white' : 'bg-background')}>{t}</button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={cn("px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all", selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted')}>{cat}</button>
          ))}
        </div>
      </header>

      <div className="px-4 pt-4">
        {loading ? <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div> :
         filtered.length === 0 ? <div className="text-center py-20 text-muted-foreground text-sm">No hay productos.</div> :
         <div className="grid grid-cols-2 gap-3">{filtered.map((p) => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}</div>}
      </div>

      <button onClick={() => setShowCreate(true)} className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-primary-foreground rounded-2xl shadow-lg flex items-center justify-center z-40"><Plus className="w-6 h-6" /></button>

      {showCreate && <CreateProductModal user={user} onClose={() => setShowCreate(false)} onCreated={loadData} />}
      {selectedProduct && <ProductDetailModal product={selectedProduct} userEmail={user?.email} onClose={() => setSelectedProduct(null)} onUpdated={loadData} />}
    </div>
  );
}