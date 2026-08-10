import { UserProfile } from "../types";

export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDayDifference(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 0;
  
  const [y1, m1, d1] = dateStr1.split('-').map(Number);
  const [y2, m2, d2] = dateStr2.split('-').map(Number);
  
  const d1Obj = new Date(y1, m1 - 1, d1);
  const d2Obj = new Date(y2, m2 - 1, d2);
  
  const diffMs = d1Obj.getTime() - d2Obj.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function syncStreak(profile: UserProfile): UserProfile {
  if (!profile) return profile;
  
  const completed = profile.completedWorksheets || [];
  if (completed.length === 0) {
    return {
      ...profile,
      streak: 0,
      highestStreak: profile.highestStreak || 0,
      lastPracticeDate: "",
      totalPracticeDays: 0,
    };
  }

  // Find all unique local practice dates from completed worksheets
  const uniqueDatesSet = new Set<string>();
  
  completed.forEach((w) => {
    // If the standard date field is present, use it
    if (w.date && /^\d{4}-\d{2}-\d{2}$/.test(w.date)) {
      uniqueDatesSet.add(w.date);
      return;
    }
    
    // Fallback: parse timestamp
    const ts = w.timestamp || "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(ts)) {
      uniqueDatesSet.add(ts);
      return;
    }
    
    try {
      const d = new Date(ts);
      if (!isNaN(d.getTime())) {
        uniqueDatesSet.add(getLocalDateString(d));
      }
    } catch (e) {}
  });

  const uniqueDates = Array.from(uniqueDatesSet).sort(); // Sort chronologically ascending

  if (uniqueDates.length === 0) {
    return {
      ...profile,
      streak: 0,
      highestStreak: profile.highestStreak || 0,
      lastPracticeDate: "",
      totalPracticeDays: 0,
    };
  }

  // Recalculate streak chronologically
  let currentStreak = 0;
  let highestStreak = profile.highestStreak || 0;
  let lastPracticeDate = "";
  
  for (let i = 0; i < uniqueDates.length; i++) {
    const currentDate = uniqueDates[i];
    if (i === 0) {
      currentStreak = 1;
    } else {
      const prevDate = uniqueDates[i - 1];
      const diff = getDayDifference(currentDate, prevDate);
      if (diff === 1) {
        currentStreak += 1;
      } else if (diff > 1) {
        currentStreak = 1; // broken and reset to 1
      }
      // If diff is 0, it is a duplicate date (should not happen since we use uniqueDatesSet)
    }
    if (currentStreak > highestStreak) {
      highestStreak = currentStreak;
    }
    lastPracticeDate = currentDate;
  }

  // Determine if the streak has expired relative to *today*
  const todayStr = getLocalDateString();
  const diffFromToday = getDayDifference(todayStr, lastPracticeDate);

  let activeStreak = currentStreak;
  if (diffFromToday > 1) {
    // Streak expired (missed consecutive day)
    activeStreak = 0;
  }

  return {
    ...profile,
    streak: activeStreak,
    highestStreak: highestStreak,
    lastPracticeDate: lastPracticeDate,
    totalPracticeDays: uniqueDates.length,
  };
}
