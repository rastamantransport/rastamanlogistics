
-- Fix all RLS policies: drop RESTRICTIVE, recreate as PERMISSIVE
-- Also scope "Anyone can read approved reviews" to anon only so it doesn't AND with admin policy

-- reviews policies
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can read all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can submit a review" ON public.reviews;
DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;

-- Approved reviews readable by anon (PERMISSIVE)
CREATE POLICY "Anyone can read approved reviews"
  ON public.reviews FOR SELECT TO anon
  USING (approved = true);

-- Admins can read ALL reviews (PERMISSIVE, authenticated only)
CREATE POLICY "Admins can read all reviews"
  ON public.reviews FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Authenticated users can also read approved reviews
CREATE POLICY "Authenticated can read approved reviews"
  ON public.reviews FOR SELECT TO authenticated
  USING (approved = true);

-- Anyone can submit a review (PERMISSIVE)
CREATE POLICY "Anyone can submit a review"
  ON public.reviews FOR INSERT TO anon, authenticated
  WITH CHECK (approved = false);

-- Admins can update reviews (PERMISSIVE)
CREATE POLICY "Admins can update reviews"
  ON public.reviews FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete reviews (PERMISSIVE)
CREATE POLICY "Admins can delete reviews"
  ON public.reviews FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- user_roles policies
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;

CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Create rate_limit_log table for persistent rate limiting
CREATE TABLE IF NOT EXISTS public.rate_limit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  endpoint text NOT NULL DEFAULT 'send-notification',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on rate_limit_log (only edge functions with service role access it)
ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_rate_limit_ip_time ON public.rate_limit_log (ip_address, created_at DESC);

-- Cleanup function to remove old entries
CREATE OR REPLACE FUNCTION public.cleanup_rate_limit_log()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
  DELETE FROM public.rate_limit_log WHERE created_at < now() - interval '5 minutes';
$$;
