export interface ISingUphUser {
  email: string;
  password: string;
  confirmPassword: string;
}

export type User = Omit<ISingUphUser, 'confirmPassword'>;
