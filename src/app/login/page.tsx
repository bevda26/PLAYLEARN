// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagicalButton } from '@/components/ui/magical-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signInWithGoogle, signUpWithEmailAndPassword, signInWithEmailAndPassword } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Crown } from 'lucide-react';
import Link from 'next/link';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" {...props}>
        <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.686H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
        <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.524 1.48c21.636 42.87 61.352 71.448 110.42 71.448" />
        <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.615.035C5.077 89.644 0 109.517 0 130.55s5.077 40.907 13.645 58.778l42.636-33.04z" />
        <path fill="#EB4335" d="M130.55 50.479c19.205 0 36.345 6.677 49.605 19.453l36.844-35.974C195.245 12.91 165.798 0 130.55 0 81.476 0 41.76 28.575 20.125 71.347l41.644 33.033c10.51-31.477 39.808-54.032 74.332-53.901z" />
    </svg>
);


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            toast({ title: "Successfully signed in with Google!" });
            router.push('/the-sixth-trial');
        } catch (error: any) {
            toast({ title: "Google Sign-In Failed", description: error.message, variant: "destructive" });
        }
    };

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({ title: "Passwords do not match", variant: "destructive" });
            return;
        }
        try {
            await signUpWithEmailAndPassword(email, password);
            toast({ title: "Account created successfully!" });
            router.push('/the-sixth-trial');
        } catch (error: any) {
            toast({ title: "Sign Up Failed", description: error.message, variant: "destructive" });
        }
    };

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(email, password);
            toast({ title: "Successfully signed in!" });
            router.push('/the-sixth-trial');
        } catch (error: any) {
            toast({ title: "Sign In Failed", description: error.message, variant: "destructive" });
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-b from-[#110E1B] to-[#0D0C14] text-white p-4 flex justify-center items-center">
            <Image
                src="https://placehold.co/1920x1080/000000/FFFFFF.png?text=+"
                alt="Fantasy background"
                fill
                className="object-cover absolute inset-0 z-0 opacity-10"
                data-ai-hint="fantasy library scrolls"
            />
            <Card className="w-full max-w-md z-10 bg-card/60 backdrop-blur-lg border-primary/20 shadow-2xl shadow-primary/10">
                <CardHeader className="text-center">
                    <Link href="/" className="mx-auto mb-2">
                        <Crown className="w-12 h-12 text-accent" />
                    </Link>
                    <CardTitle className="font-headline text-3xl text-accent">Welcome to PlayLearn</CardTitle>
                    <CardDescription>Your epic learning adventure awaits.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <form onSubmit={handleEmailSignIn}>
                                <div className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-login">Email</Label>
                                        <Input id="email-login" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-login">Password</Label>
                                        <Input id="password-login" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                                    </div>
                                    <MagicalButton type="submit" variant="primary">Login</MagicalButton>
                                </div>
                            </form>
                        </TabsContent>
                        <TabsContent value="signup">
                            <form onSubmit={handleEmailSignUp}>
                                <div className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-signup">Email</Label>
                                        <Input id="email-signup" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password-signup">Password</Label>
                                        <Input id="password-signup" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password-signup">Confirm Password</Label>
                                        <Input id="confirm-password-signup" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                                    </div>
                                    <MagicalButton type="submit" variant="primary">Create Account</MagicalButton>
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <MagicalButton variant="outline" onClick={handleGoogleSignIn}>
                        <>
                            <GoogleIcon className="mr-2 h-4 w-4" />
                            Google
                        </>
                    </MagicalButton>
                </CardContent>
            </Card>
        </div>
    );
}
