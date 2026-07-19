export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
  ticketUrl?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  membershipType: "regular" | "premium" | "lifetime" | "honorary";
  memberSince: string;
  memberNumber: string;
  status: "active" | "expired" | "pending";
  phone?: string;
  address?: string;
  avatarUrl?: string;      // Profile photo URL (Supabase Storage)
  bio?: string;            // Short description about the member
  family?: string;         // Description of family
}

export interface Purchase {
  id: string;
  memberId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: "completed" | "pending" | "refunded";
  receiptUrl?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  tier: "platinum" | "gold" | "silver" | "community";
  adImageUrl?: string;
  adLink?: string;
  tagline?: string;
}
