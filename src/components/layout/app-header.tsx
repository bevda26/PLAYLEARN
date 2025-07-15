
'use client';

import Link from 'next/link';
import { Crown, BookOpen, ToyBrick, User, Shield, Award, Backpack, LogOut, Grid, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WizardsChamberIcon } from '@/components/icons/wizards-chamber';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { signOutUser } from '@/lib/auth';
import { getAchievementById } from '@/lib/achievements';
import { getItemById, type Item } from '@/lib/items';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUserProgressStore } from '@/stores/user-progress-store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const InventoryDisplay = ({ inventory }: { inventory: { [itemId: string]: number } }) => {
  const inventoryItems = Object.entries(inventory)
    .map(([id, quantity]) => {
      const item = getItemById(id);
      return item ? { ...item, quantity } : null;
    })
    .filter(Boolean) as (Item & { quantity: number })[];

  if (inventoryItems.length === 0) {
    return <p className="text-muted-foreground">Your backpack is empty. Complete quests to find items!</p>
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {inventoryItems.map((item) => (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="relative flex flex-col items-center justify-center p-4 aspect-square bg-primary/10 hover:bg-primary/20 border-primary/20 transition-colors cursor-pointer">
                <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl">{item.icon}</span>
                  <p className="text-sm text-center text-foreground truncate">{item.name}</p>
                </CardContent>
                {item.quantity > 1 && (
                  <Badge variant="secondary" className="absolute -top-2 -right-2 rounded-full h-6 w-6 flex items-center justify-center">
                    {item.quantity}
                  </Badge>
                )}
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

export const AppHeader = () => {
  const { user, userProfile, loading } = useAuth();
  const { inventory } = useUserProgressStore();

  const unlockedAchievementIds = userProfile?.unlockedAchievements ? Object.keys(userProfile.unlockedAchievements) : [];
  const inventoryCount = Object.values(inventory).reduce((sum, q) => sum + q, 0);

  return (
    <header className="relative z-20 w-full p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/20 backdrop-blur-md p-2 rounded-lg border border-primary/20">
        <Link href="/" className="flex items-center gap-2">
          <Crown className="w-8 h-8 text-accent" />
          <div className="flex flex-col items-start">
            <span className="font-headline text-xl font-bold text-white">PLAYLEARN</span>
            <span className="text-xs text-slate-400 -mt-1 tracking-widest">RPG LEARNING PLATFORM</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
                <TrendingUp className="w-4 h-4 mr-2"/>
                Dashboard
            </Button>
          </Link>
          <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
            <BookOpen className="w-4 h-4 mr-2"/>
            Library Tower
          </Button>
          <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
            <ToyBrick className="w-4 h-4 mr-2"/>
            Training Grounds
          </Button>
           <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
            <User className="w-4 h-4 mr-2"/>
            Guild Hall
          </Button>
          <Link href="/wizards-chamber">
            <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
              <WizardsChamberIcon className="w-4 h-4 mr-2"/>
              Wizards' Chamber
            </Button>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-10 h-10 bg-gray-600 rounded-full animate-pulse" />
          ) : user && userProfile ? (
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback>{userProfile.displayName?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>{userProfile.displayName}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-sm font-normal text-muted-foreground -mt-2">Title: {userProfile.title}</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Backpack className="mr-2 h-4 w-4" />
                      <span>Backpack</span>
                      <span className="ml-auto text-xs text-muted-foreground">{inventoryCount} items</span>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-muted-foreground">Achievements</DropdownMenuLabel>
                    <TooltipProvider>
                      {unlockedAchievementIds.length > 0 ? (
                        unlockedAchievementIds.map(id => {
                          const achievement = getAchievementById(id);
                          if (!achievement) return null;
                          return (
                            <Tooltip key={id}>
                              <TooltipTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Award className="mr-2 h-4 w-4 text-accent" />
                                  <span>{achievement.name}</span>
                                </DropdownMenuItem>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <p>{achievement.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })
                      ) : (
                        <DropdownMenuItem disabled>No achievements yet</DropdownMenuItem>
                      )}
                    </TooltipProvider>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOutUser}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><Backpack /> Your Backpack</DialogTitle>
                  <DialogDescription>
                    All the items you have collected on your adventures.
                  </DialogDescription>
                </DialogHeader>
                <InventoryDisplay inventory={inventory} />
              </DialogContent>
            </Dialog>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
