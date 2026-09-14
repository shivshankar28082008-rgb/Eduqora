import { UserProfile } from '../types';
import { storageService } from './storageService';

export const authService = {
  getCurrentUser(): UserProfile {
    return storageService.getUser();
  },

  isLoggedIn(): boolean {
    const user = storageService.getUser();
    return !!user && user.email !== '';
  },

  login(email: string, _password?: string): { success: boolean; user: UserProfile } {
    const user = storageService.getUser();
    const updated: UserProfile = {
      ...user,
      email: email || 'student@eduqora.dev',
      name: email.split('@')[0] || 'Learner',
    };
    storageService.saveUser(updated);
    storageService.addActivity({
      type: 'streak_maintained',
      title: 'Logged in to Eduqora',
      detail: `Welcome back, ${updated.name}! Ready to code.`,
      xpGained: 5,
    });
    return { success: true, user: updated };
  },

  signup(name: string, email: string): { success: boolean; user: UserProfile } {
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name || 'New Learner',
      email: email || 'student@eduqora.dev',
      level: 1,
      xp: 50,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      joinedDate: new Date().toISOString().split('T')[0],
      settings: {
        theme: 'dark',
        editorFontSize: 14,
        editorTheme: 'dark',
        autoRun: true,
      },
    };
    storageService.saveUser(newUser);
    storageService.addActivity({
      type: 'streak_maintained',
      title: 'Welcome to Eduqora!',
      detail: 'Account created. You earned +50 Welcome XP.',
      xpGained: 50,
    });
    return { success: true, user: newUser };
  },

  logout(): void {
    const guestUser: UserProfile = {
      id: 'usr_guest',
      name: 'Guest Learner',
      email: '',
      level: 1,
      xp: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
      joinedDate: new Date().toISOString().split('T')[0],
      settings: {
        theme: storageService.getTheme(),
        editorFontSize: 14,
        editorTheme: 'dark',
        autoRun: true,
      },
    };
    storageService.saveUser(guestUser);
  },

  addXP(amount: number, reason: string): { newXp: number; newLevel: number; leveledUp: boolean } {
    const user = storageService.getUser();
    const prevLevel = user.level;
    const newXp = user.xp + amount;
    // Each 100 XP is a level
    const newLevel = Math.max(1, Math.floor(newXp / 100) + 1);
    const leveledUp = newLevel > prevLevel;

    const updated: UserProfile = {
      ...user,
      xp: newXp,
      level: newLevel,
    };
    storageService.saveUser(updated);

    return { newXp, newLevel, leveledUp };
  },

  checkStreak(): number {
    const user = storageService.getUser();
    const today = new Date().toISOString().split('T')[0];
    if (user.lastActiveDate === today) {
      return user.streak;
    }
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newStreak = user.streak;
    if (user.lastActiveDate === yesterday) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
    const updated: UserProfile = {
      ...user,
      streak: newStreak,
      lastActiveDate: today,
    };
    storageService.saveUser(updated);
    return newStreak;
  },

  updateSettings(settings: Partial<UserProfile['settings']>): UserProfile {
    const user = storageService.getUser();
    const updated: UserProfile = {
      ...user,
      settings: {
        ...user.settings,
        ...settings,
      },
    };
    storageService.saveUser(updated);
    if (settings.theme) {
      storageService.saveTheme(settings.theme);
    }
    return updated;
  }
};
