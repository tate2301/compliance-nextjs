"use client";
import { useSession } from "next-auth/react";

export function RequireOwner({ children }) {
    const { data, status } = useSession();
    if (status === "loading") return null;
    if (data?.user.role !== "owner") return <p>Only owners can view this.</p>;
    return children;
}