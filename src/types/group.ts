
export interface Group {
  id: string;
  name: string;
  contribution_amount: number;
  payment_frequency: 'weekly' | 'monthly' | 'quarterly';
  payout_schedule: 'rotating' | 'random' | 'bidding';
  max_members: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id?: string;
  email?: string;
  status: 'pending' | 'active' | 'paid';
  invited_by: string;
  invited_at: string;
  joined_at?: string;
}

export interface GroupInvitation {
  id: string;
  group_id: string;
  email: string;
  invited_by: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  expires_at: string;
}
