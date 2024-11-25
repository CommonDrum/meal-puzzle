// utils/auth.ts
export const handleAuthResponse = async (response: Response): Promise<AuthResponse> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Authentication failed");
  }
  return response.json();
};
