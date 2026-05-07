export type FormState = {
  success: boolean;
  errors?: Record<string, string[]> | any;
  message: string;
};