export interface Profile {
  _id: string;
  age: number;
  gender: string;
  ign: string;
  profilePic: {
    secure_url: string;
    public_id: string;
  };
  updatedAt: Date;
  createdAt: string;
}
export interface User {
  _id: string;
  username: string;
  updatedAt: Date;
  createdAt: string;
}
export interface UserDetails<P = any, U = any> {
  bestScore: number;
  _id: string;
  profileId: P;
  userId: U;
  rank: number;
}
