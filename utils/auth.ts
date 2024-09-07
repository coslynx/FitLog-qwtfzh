import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/utils/db';
import { User } from '@/utils/models';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const { db } = await connectToDatabase();
      const user = await db.collection('users').findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const session = await NextAuth.session({
        req,
        options: {
          callbacks: {
            jwt: async ({ token, user }) => {
              if (user) {
                token.id = user.id;
              }
              return token;
            },
            session: async ({ session, token }) => {
              session.user = token as any;
              return session;
            },
          },
          providers: [
            CredentialsProvider({
              name: 'Credentials',
              credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
              },
              async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                  return null;
                }

                const { db } = await connectToDatabase();
                const user = await db.collection('users').findOne({ email: credentials.email });

                if (!user) {
                  return null;
                }

                const isValidPassword = await bcrypt.compare(
                  credentials.password,
                  user.password
                );

                if (!isValidPassword) {
                  return null;
                }

                return {
                  id: user.id,
                  name: user.firstName,
                  email: user.email,
                };
              },
            }),
          ],
        },
      });

      if (session?.user) {
        return res.status(200).json({ message: 'Success', data: session });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Failed to login' });
    }
  } else if (req.method === 'GET') {
    if (req.query.action === 'signout') {
      return NextAuth.handle(req, res, { action: 'signout' });
    }
  }
  return res.status(405).end();
}