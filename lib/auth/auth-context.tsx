"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import type { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapUser(data: any): User {
  return {
    id: data.id ?? data._id ?? data.legacyId,
    email: data.email,
    first_name: data.firstName,
    last_name: data.lastName,
    middle_names: data.middleNames,
    ni_number: data.niNumber,
    phone: data.phone,
    date_of_birth: data.dateOfBirth,
    profile_image: data.profileImage,
    role: data.role,
  } as User;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const res = await fetch(`/api/user?authUserId=${session.user.id}`);
          if (res.ok) {
            const data = await res.json();
            setUser(mapUser(data));
          }
        } catch (err) {
          console.error("Failed to fetch user", err);
        }
      } else if (status !== "loading") {
        setUser(null);
      }
    }
    fetchUser();
  }, [session, status]);

  const logout = () => signOut({ callbackUrl: "/auth/signin" });

  return (
      <AuthContext.Provider
          value={{
            user,
            logout,
            isAuthenticated: status === "authenticated",
          }}
      >
        {children}
      </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};