import { useEffect } from "react";

type UserId = string | null;

export default function useUserId(): UserId {
  let userId: UserId = null;

  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      userId = localStorage.getItem("userId");
    }
  }, []);

  return userId;
}
