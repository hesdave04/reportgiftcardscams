'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Stream() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    setItems([]); setPage(0); setEnd(false);
    loadPage(0, true);
  }, [q]);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !end) loadPage(page + 1);
    }, { rootMargin: '200px' });
    if (loaderRef.current) obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [page, loading, end]);

  async function loadPage(nextPage, replace = false) {
    try {
      setLoading(true);
      const res = await axios.get('/api/search', { params: { page: nextPage, pageSize: 20, q } });
      const rows = res.data?.results || [];
      if (replace) setItems(rows); else setItems((prev) => [...prev, ...rows]);
      setPage(nextPage);
      if (rows.length < 20) setEnd(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
      <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by retailer, last4, or notes…"
          style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </div>

      {items.map((it) => (
        <div key={it.id} style={{ borderTop: '1px solid #f0f0f0', padding: '12px 4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700 }}>{it.retailer}</div>
              <div style={{ fontSize: 13, color: '#666' }}>
                Last4: ****{it.card_last4} • {it.amount != null ? `$${Number(it.amount).toFixed(2)}` : '—'}
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>{new Date(it.created_at).toLocaleString()}</div>
          </div>
          {it.notes && <div style={{ marginTop: 6, fontSize: 14 }}>{it.notes}</div>}
          <div style={{ fontSize: 12, color: '#999', marginTop: 6 }}>Status: {it.status}</div>
        </div>
      ))}

      <div ref={loaderRef} style={{ textAlign: 'center', padding: 16, color: '#666' }}>
        {end ? 'End of results' : (loading ? 'Loading…' : 'Scroll to load more')}
      </div>
    </div>
  );
}
