
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateGroup } from '@/hooks/useGroups';
import { Group } from '@/types/group';
import { ArrowLeft } from 'lucide-react';

interface EditGroupFormProps {
  group: Group;
  onBack: () => void;
  onSuccess: () => void;
}

const EditGroupForm = ({ group, onBack, onSuccess }: EditGroupFormProps) => {
  const [formData, setFormData] = useState({
    name: group.name,
    contribution_amount: group.contribution_amount.toString(),
    payment_frequency: group.payment_frequency,
    payout_schedule: group.payout_schedule,
    max_members: group.max_members.toString(),
  });

  const updateGroup = useUpdateGroup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateGroup.mutateAsync({
        id: group.id,
        name: formData.name,
        contribution_amount: parseFloat(formData.contribution_amount),
        payment_frequency: formData.payment_frequency as 'weekly' | 'monthly' | 'quarterly',
        payout_schedule: formData.payout_schedule as 'rotating' | 'random' | 'bidding',
        max_members: parseInt(formData.max_members),
      });
      onSuccess();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
        <h1 className="text-2xl font-bold text-white">Edit Group</h1>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Group Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-300">Group Name</Label>
              <Input 
                type="text" 
                placeholder="Enter group name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
            
            <div>
              <Label className="text-gray-300">Contribution Amount ($)</Label>
              <Input 
                type="number" 
                placeholder="500"
                value={formData.contribution_amount}
                onChange={(e) => handleInputChange('contribution_amount', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <Label className="text-gray-300">Payment Frequency</Label>
              <Select value={formData.payment_frequency} onValueChange={(value) => handleInputChange('payment_frequency', value)} required>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300">Payout Schedule</Label>
              <Select value={formData.payout_schedule} onValueChange={(value) => handleInputChange('payout_schedule', value)} required>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rotating">Rotating</SelectItem>
                  <SelectItem value="random">Random</SelectItem>
                  <SelectItem value="bidding">Bidding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300">Maximum Members</Label>
              <Input 
                type="number" 
                placeholder="8"
                value={formData.max_members}
                onChange={(e) => handleInputChange('max_members', e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
                min="2"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold mt-6"
              disabled={updateGroup.isPending}
            >
              {updateGroup.isPending ? 'Updating...' : 'Update Group'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditGroupForm;
