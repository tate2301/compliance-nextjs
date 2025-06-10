import argon2 from "argon2";

/** Hash a plaintext password */
export async function hashPassword(plain: string): Promise<string> {
    return argon2.hash(plain, { type: argon2.argon2id });
}

/** Verify that `plain` matches `digest` */
export async function verifyHash(
    plain: string,
    digest: string
): Promise<boolean> {
    return argon2.verify(digest, plain);
}