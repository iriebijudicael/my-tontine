
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInviteMember, useGroupMembers } from '@/hooks/useGroups';
import { Group } from '@/types/group';
import { ArrowLeft, UserPlus } from 'lucide-react';

interface InviteMemberFormProps {
  group: Group;
  onBack: () => void;
}

const InviteMemberForm = ({ group, onBack }: InviteMemberFormProps) => {
  const [email, setEmail] = useState('');
  const inviteMember = useInviteMember();
  const { data: members = [], isLoading: membersLoading } = useGroupMembers(group.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;

    // Check if email is already invited
    const isAlreadyMember = members.some(member => 
      member.email?.toLowerCase() === email.toLowerCase()
    );

    if (isAlreadyMember) {
      console.log('Email already invited to this group');
      return;
    }

    try {
      await inviteMember.mutateAsync({
        groupId: group.id,
        email: email.trim(),
      });
      setEmail('');
    } catch (error) {
      console.error('Error inviting member:', error);
    }
  };

  const isGroupFull = members.length >= group.max_members;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-white">Invite Members</h1>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{group.name}</CardTitle>
          <p className="text-gray-400">
            {members.length} / {group.max_members} members
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-300">Email Address</Label>
              <Input 
                type="email" 
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
                disabled={isGroupFull}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={inviteMember.isPending || isGroupFull || !email.trim()}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {inviteMember.isPending ? 'Sending Invite...' : 
               isGroupFull ? 'Group is Full' : 'Send Invitation'}
            </Button>
          </form>

          {isGroupFull && (
            <p className="text-yellow-400 text-sm mt-2 text-center">
              This group has reached its maximum capacity
            </p>
          )}
        </CardContent>
      </Card>

      {/* Current Members */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Current Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {membersLoading ? (
            <p className="text-gray-400 text-center py-4">Loading members...</p>
          ) : members.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No members yet</p>
          ) : (
            members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
                <div>
                  <p className="font-medium text-white">{member.email}</p>
                  <p className="text-sm text-gray-400 capitalize">{member.status}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  member.status === 'active' ? 'bg-green-500' : 
                  member.status === 'paid' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteMemberForm;
