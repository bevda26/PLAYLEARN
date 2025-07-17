import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from '@/components/theme-provider';
import { Cinzel, Crimson_Text } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  weight: ['700', '900'],
});

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson-text',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'PlayLearn - Epic RPG Learning Platform',
  description: 'A revolutionary educational RPG platform where learning is an adventure.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cinzel.variable} ${crimsonText.variable}`}>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
