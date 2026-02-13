
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admins can read their own roles
CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Update reviews: admins can SELECT all reviews (including unapproved)
CREATE POLICY "Admins can read all reviews"
ON public.reviews FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update reviews (approve/reject)
CREATE POLICY "Admins can update reviews"
ON public.reviews FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete reviews
CREATE POLICY "Admins can delete reviews"
ON public.reviews FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
