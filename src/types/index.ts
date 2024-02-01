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
