
-- Create tables for groups and group members
CREATE TABLE public.groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contribution_amount DECIMAL(10,2) NOT NULL,
  payment_frequency TEXT NOT NULL CHECK (payment_frequency IN ('weekly', 'monthly', 'quarterly')),
  payout_schedule TEXT NOT NULL CHECK (payout_schedule IN ('rotating', 'random', 'bidding')),
  max_members INTEGER NOT NULL,
  created_by UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for group members
CREATE TABLE public.group_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paid')),
  invited_by UUID REFERENCES auth.users NOT NULL,
  invited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  joined_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT valid_member CHECK (user_id IS NOT NULL OR email IS NOT NULL)
);

-- Create table for group invitations
CREATE TABLE public.group_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  invited_by UUID REFERENCES auth.users NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  UNIQUE(group_id, email)
);

-- Enable Row Level Security
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for groups
CREATE POLICY "Users can view groups they created or are members of" 
  ON public.groups 
  FOR SELECT 
  USING (
    created_by = auth.uid() OR 
    id IN (SELECT group_id FROM public.group_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create groups" 
  ON public.groups 
  FOR INSERT 
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Group creators can update their groups" 
  ON public.groups 
  FOR UPDATE 
  USING (created_by = auth.uid());

CREATE POLICY "Group creators can delete their groups" 
  ON public.groups 
  FOR DELETE 
  USING (created_by = auth.uid());

-- RLS Policies for group_members
CREATE POLICY "Users can view members of groups they belong to" 
  ON public.group_members 
  FOR SELECT 
  USING (
    group_id IN (
      SELECT id FROM public.groups 
      WHERE created_by = auth.uid() OR 
      id IN (SELECT group_id FROM public.group_members WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Group creators and invitors can insert members" 
  ON public.group_members 
  FOR INSERT 
  WITH CHECK (
    invited_by = auth.uid() AND
    group_id IN (SELECT id FROM public.groups WHERE created_by = auth.uid())
  );

CREATE POLICY "Group creators can update member status" 
  ON public.group_members 
  FOR UPDATE 
  USING (
    group_id IN (SELECT id FROM public.groups WHERE created_by = auth.uid())
  );

-- RLS Policies for group_invitations
CREATE POLICY "Users can view invitations for their groups" 
  ON public.group_invitations 
  FOR SELECT 
  USING (
    group_id IN (SELECT id FROM public.groups WHERE created_by = auth.uid()) OR
    email IN (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Group creators can create invitations" 
  ON public.group_invitations 
  FOR INSERT 
  WITH CHECK (
    invited_by = auth.uid() AND
    group_id IN (SELECT id FROM public.groups WHERE created_by = auth.uid())
  );

CREATE POLICY "Group creators can update invitations" 
  ON public.group_invitations 
  FOR UPDATE 
  USING (
    group_id IN (SELECT id FROM public.groups WHERE created_by = auth.uid())
  );
