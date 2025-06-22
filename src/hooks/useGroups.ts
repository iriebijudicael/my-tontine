
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Group, GroupMember, GroupInvitation } from '@/types/group';
import { useToast } from '@/hooks/use-toast';

export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Group[];
    },
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (groupData: Omit<Group, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('groups')
        .insert({
          ...groupData,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Group;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast({
        title: "Success",
        description: "Group created successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create group: " + error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...groupData }: Partial<Group> & { id: string }) => {
      const { data, error } = await supabase
        .from('groups')
        .update(groupData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Group;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      toast({
        title: "Success",
        description: "Group updated successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update group: " + error.message,
        variant: "destructive",
      });
    },
  });
};

export const useGroupMembers = (groupId: string) => {
  return useQuery({
    queryKey: ['group-members', groupId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId);
      
      if (error) throw error;
      return data as GroupMember[];
    },
    enabled: !!groupId,
  });
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ groupId, email }: { groupId: string; email: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // First add to group_members
      const { data: memberData, error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: groupId,
          email: email,
          status: 'pending',
          invited_by: user.id,
        })
        .select()
        .single();

      if (memberError) throw memberError;

      // Then add to group_invitations
      const { data: inviteData, error: inviteError } = await supabase
        .from('group_invitations')
        .insert({
          group_id: groupId,
          email: email,
          invited_by: user.id,
        })
        .select()
        .single();

      if (inviteError) throw inviteError;

      return { member: memberData, invitation: inviteData };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['group-members', variables.groupId] });
      toast({
        title: "Success",
        description: "Member invited successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to invite member: " + error.message,
        variant: "destructive",
      });
    },
  });
};
