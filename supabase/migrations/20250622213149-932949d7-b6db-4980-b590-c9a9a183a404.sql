
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view members of groups they belong to" ON public.group_members;

-- Create a security definer function to check group membership
CREATE OR REPLACE FUNCTION public.is_group_member_or_creator(group_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user is the group creator
  IF EXISTS (
    SELECT 1 FROM public.groups 
    WHERE id = group_uuid AND created_by = auth.uid()
  ) THEN
    RETURN TRUE;
  END IF;
  
  -- Check if user is a group member (using email or user_id)
  IF EXISTS (
    SELECT 1 FROM public.group_members 
    WHERE group_id = group_uuid 
    AND (user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  ) THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create new policy using the security definer function
CREATE POLICY "Users can view members of groups they belong to" 
  ON public.group_members 
  FOR SELECT 
  USING (public.is_group_member_or_creator(group_id));
