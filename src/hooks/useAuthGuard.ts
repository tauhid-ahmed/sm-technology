import { useAppSelector } from "@/store/hooks";

export default function useAuthGuard() {
  const user = useAppSelector((state) => state.app.user);
  const isAuthenticated = !!user;
  const requireAuth = (onAuthSuccess: () => void, onAuthFail?: () => void) => {
    if (!user) {
      if (onAuthFail) onAuthFail();
      return;
    }
    onAuthSuccess();
  };
  return { user, isAuthenticated, requireAuth };
}
