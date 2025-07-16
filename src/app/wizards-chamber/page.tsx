// src/app/wizards-chamber/page.tsx
'use client';

import { useTheme } from 'next-themes';
import { AppHeader } from '@/components/layout/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { WizardsChamberIcon, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WizardsChamberPage() {
  const { theme, setTheme, systemTheme } = useTheme();
  // We need to wait for the component to mount to know the current theme.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Return a placeholder or skeleton while waiting for mount
    return null;
  }
  
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <AppHeader />
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-headline text-accent flex items-center justify-center gap-4">
            <WizardsChamberIcon className="w-12 h-12" />
            Wizards' Chamber
          </h1>
          <p className="text-lg text-foreground/80 mt-2">
            Configure the mystical arts and settings of your realm.
          </p>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Appearance</CardTitle>
            <CardDescription>
              Change the look and feel of your learning adventure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label className="text-lg">Theme</Label>
              <RadioGroup defaultValue={currentTheme} onValueChange={setTheme} className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="light" id="light" className="peer sr-only" />
                  <Label
                    htmlFor="light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Sun className="mb-3 h-6 w-6" />
                    Light
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                  <Label
                    htmlFor="dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Moon className="mb-3 h-6 w-6" />
                    Dark
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
