interface UserProfile {
  name: string;
}

interface UserPreferences {
  // Define the properties for the UserPreferences type
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  profile: UserProfile;
  preferences?: UserPreferences;
  authenticationTokens?: string[];
  confirmed?: boolean;
  role?: "user" | "admin";
}

export interface ImageType {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  fileName: string;
  metadata: {
    size: string;
    resolution: string;
    format: string;
    _id: string;
  };
  uploader: string;
  downloadStatistics: {
    downloadCount: number;
    likes: number;
    _id: string;
  };
}

export interface UserType {
  _id?: string; // Optional because not all users sign in with Google
  googleId?: string; // Optional because not all users sign in with Google
  facebookId?: string;
  email: string;
  profile: {
    name: string;
    photo: string;
  };
  username: string;
  emailConfirmed?: boolean;
  role?: "user" | "admin";
}
export interface SubscriptionType {
  description: string;
  user: { name: string; email: string };
  name: string;
  planName: string;
  createdAt: string;
  status: string;
  _id: string;
  period: number;
  features: string[];
}

export interface PlanType {
  description: string;
  name: string;
  price: number;
  _id: string;
  period: number;
  features: string[];
}
