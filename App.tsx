import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PrayerTimesView from './components/PrayerTimesView';
import AIToolsView from './components/AIToolsView';
import Navigation from './components/Navigation';
import { getMonthluPrayerTimes } from './services/prayerTimesService';
import { DailyPrayerTimes } from './types';

type MainView = 'prayer' | 'ai';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<MainView>('prayer');
  const [prayerTimes, setPrayerTimes] = useState<DailyPrayerTimes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        const times = await getMonthlyPrayerTimes();
        setPrayerTimes(times);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Не удалось загрузить время молитв.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [] );

  const handleScheduleUpdate = (newSchedule: DailyPrayerTimes[]) => {
    setPrayerTimes(newSchedule);
    setActiveView('prayer');
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans pb-20">
    <Header />
    <main className="containet mx-auto p-4 max-w-lg">
      {activeView === 'prayer' ? (
       <PrayerTimesView
         prayerTimes={prayer}
    </main>   
    </div>
