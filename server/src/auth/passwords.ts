import bcrypt from 'bcrypt';

export const generateHash = (plainTextPassword: string): Promise<string> => {
  const hash = bcrypt
    .hash(plainTextPassword, 10)
    .catch(() => {
      throw new Error('Password hashing failed');
      }
    );
    return hash;
}

export const validatePassword = (plainTextPassword: string, hash: string): Promise<boolean> => {
  const check = bcrypt
    .compare(plainTextPassword, hash)
    .catch(() => {
      throw new Error('Password validation failed');
      }
    );
    return check;
}

