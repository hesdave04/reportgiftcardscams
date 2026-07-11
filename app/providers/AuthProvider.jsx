'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext({
  user: null,
  reporter: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  refreshReporter: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [reporter, setReporter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch reporter profile from our reporters table
  const fetchReporter = useCallback(async (userId) => {
    if (!supabase || !userId) {
      setReporter(null);
      return null;
    }
    try {
      const { data, error } = await supabase
        .from('reporters')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error && error.code !== 'PGRST116') {
        console.error('Reporter fetch error:', error);
      }
      setReporter(data || null);
      return data || null;
    } catch (e) {
      console.error('Reporter fetch error:', e);
      setReporter(null);
      return null;
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        fetchReporter(u.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Subscribe to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          fetchReporter(u.id);
        } else {
          setReporter(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchReporter]);

  const signUp = useCallback(async ({ email, password, displayName }) => {
    if (!supabase) throw new Error('Auth not configured');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
      },
    });
    if (error) throw error;

    // Create reporter profile (via API to use service role)
    if (data.user) {
      try {
        await fetch('/api/auth/create-reporter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: data.user.id,
            email: data.user.email,
            displayName,
          }),
        });
      } catch (e) {
        console.error('Reporter creation error:', e);
      }
    }

    return data;
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    if (!supabase) throw new Error('Auth not configured');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setReporter(null);
  }, []);

  const refreshReporter = useCallback(async () => {
    if (user) return fetchReporter(user.id);
    return null;
  }, [user, fetchReporter]);

  return (
    <AuthContext.Provider
      value={{ user, reporter, loading, signUp, signIn, signOut, refreshReporter }}
    >
      {children}
    </AuthContext.Provider>
  );
}
