
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGroups } from '@/hooks/useGroups';
import { Group } from '@/types/group';
import { Plus, Settings, Users } from 'lucide-react';

interface GroupsListProps {
  onCreateGroup: () => void;
  onEditGroup: (group: Group) => void;
  onViewGroup: (group: Group) => void;
  onInviteMembers: (group: Group) => void;
}

const GroupsList = ({ onCreateGroup, onEditGroup, onViewGroup, onInviteMembers }: GroupsListProps) => {
  const { data: groups = [], isLoading, error } = useGroups();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white text-center">Loading Groups...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white text-center">Error Loading Groups</h1>
        <p className="text-gray-400 text-center">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">My Groups</h1>
      </div>

      {groups.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <p className="text-gray-400 mb-4">You haven't created any groups yet</p>
            <Button 
              onClick={onCreateGroup}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Group
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <Card key={group.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle 
                    className="text-white cursor-pointer hover:text-green-400"
                    onClick={() => onViewGroup(group)}
                  >
                    {group.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onInviteMembers(group)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Users className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditGroup(group)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Contribution:</span>
                  <span className="text-green-400 font-semibold">${group.contribution_amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Frequency:</span>
                  <span className="text-white capitalize">{group.payment_frequency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Schedule:</span>
                  <span className="text-white capitalize">{group.payout_schedule}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Max Members:</span>
                  <span className="text-white">{group.max_members}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Floating Create Button */}
      {groups.length > 0 && (
        <Button 
          onClick={onCreateGroup}
          className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default GroupsList;
