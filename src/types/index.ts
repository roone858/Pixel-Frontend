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
