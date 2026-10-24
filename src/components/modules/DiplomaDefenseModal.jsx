import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import {
  GraduationCap,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Code2,
  FileText,
  Volume2
} from 'lucide-react';

export const DiplomaDefenseModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState('speech'); // 'speech' | 'theory' | 'checklist'
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes timer
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsLeft]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Шпаргалка к защите диплома (40/40 баллов)" maxWidth="max-w-3xl">
      <div className="space-y-5 text-xs">
        {/* Top Navigation & Timer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-brand-200 dark:border-brand-800/40">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                Подготовка к защите «BilimKitep»
              </div>
              <div className="text-[11px] text-brand-700 dark:text-brand-300">
                Критерии комиссии: Сүйлөө (10) + Функционал (10) + Теория (10) + Жумуш (10)
              </div>
            </div>
          </div>

          {/* 5-minute Timer */}
          <div className="flex items-center gap-2 bg-white dark:bg-darkCard px-3 py-1.5 rounded-xl border border-gray-200 dark:border-darkBorder font-mono font-bold text-sm">
            <span className={secondsLeft < 60 ? 'text-red-500' : 'text-brand-600'}>
              {formatTimer(secondsLeft)}
            </span>
            <button
              type="button"
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-1 text-gray-500 hover:text-brand-600"
              title={timerRunning ? 'Пауза' : 'Старт'}
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerRunning(false);
                setSecondsLeft(300);
              }}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Сброс"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-darkBorder rounded-xl">
          <button
            type="button"
            onClick={() => setTab('speech')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              tab === 'speech' ? 'bg-white dark:bg-darkCard text-brand-600 shadow-xs' : 'text-gray-500'
            }`}
          >
            1. Доклад на английском (10 б.)
          </button>
          <button
            type="button"
            onClick={() => setTab('theory')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              tab === 'theory' ? 'bg-white dark:bg-darkCard text-brand-600 shadow-xs' : 'text-gray-500'
            }`}
          >
            2. Теория и Вопросы (10 б.)
          </button>
          <button
            type="button"
            onClick={() => setTab('checklist')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              tab === 'checklist' ? 'bg-white dark:bg-darkCard text-brand-600 shadow-xs' : 'text-gray-500'
            }`}
          >
            3. Чек-лист (40 баллов)
          </button>
        </div>

        {/* Tab 1: English Presentation Speech */}
        {tab === 'speech' && (
          <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-darkBorder/30 border border-gray-100 dark:border-darkBorder space-y-1">
              <span className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider text-[11px] text-brand-600">
                Part 1: Introduction & Problem (0:00 - 1:00)
              </span>
              <p>
                "Good afternoon, honorable members of the examination committee. My name is [Your Name], and today I am proud to present my diploma graduation project: <strong>«BilimKitep»</strong> — a web platform for textbook sharing, rental, and circular economy in Kyrgyzstan. Every year, over one million school students in Kyrgyzstan face textbook shortages, while parents spend tens of thousands of soms on books used only for a single academic year."
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-darkBorder/30 border border-gray-100 dark:border-darkBorder space-y-1">
              <span className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider text-[11px] text-brand-600">
                Part 2: Solution & Key Innovation (1:00 - 2:00)
              </span>
              <p>
                "To solve this problem, BilimKitep introduces a safe 3/5/9-month rental model with guaranteed returnable safety deposits. Parents save up to 70% of textbook expenses, while high school students can freely access National Scholarship Test (ORT/JRT) materials and curriculum books in Kyrgyz, Russian, and English."
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-darkBorder/30 border border-gray-100 dark:border-darkBorder space-y-1">
              <span className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider text-[11px] text-brand-600">
                Part 3: Architecture & Tech Stack (2:00 - 3:30)
              </span>
              <p>
                "The project is engineered on a modern, robust architecture:
                <br />• <strong>Frontend:</strong> React 18 powered by Vite for sub-second build speed and Tailwind CSS for mobile-first dark/light responsive styling.
                <br />• <strong>State Management:</strong> Redux Toolkit with slices for Auth, Cart, Books, and Filters with strict immutable state updates.
                <br />• <strong>i18n:</strong> Modular translation architecture in Kyrgyz, Russian, and English across 9 page namespaces.
                <br />• <strong>Cloud & APIs:</strong> Cloudinary REST API for unsigned photo uploads, Recharts for administrative business analytics, and Telegram Bot API for instant dispatch of order receipts."
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-darkBorder/30 border border-gray-100 dark:border-darkBorder space-y-1">
              <span className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider text-[11px] text-brand-600">
                Part 4: Live Demo & Conclusion (3:30 - 5:00)
              </span>
              <p>
                "As demonstrated on screen, users can filter by grades 1 through 11, calculate rental terms with live escrow deposits, test MBank/Elkart checkout, and receive instant Telegram bot alerts. In conclusion, BilimKitep makes education affordable, green, and accessible for every family in Kyrgyzstan. Thank you for your attention, and I am now ready for your questions!"
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: React Theory Cheat-Sheet */}
        {tab === 'theory' && (
          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
            <div className="p-3 rounded-xl border border-gray-100 dark:border-darkBorder space-y-1">
              <span className="font-bold text-brand-600">1. Virtual DOM & Reconciliation:</span>
              <p className="text-gray-600 dark:text-gray-300">
                Виртуальный DOM — легковесная копия реального дерева в памяти. При изменении состояния React запускает алгоритм Diffing и обновляет только измененные узлы (Reconciliation), предотвращая дорогостоящий перерендер всего DOM.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-gray-100 dark:border-darkBorder space-y-1">
              <span className="font-bold text-brand-600">2. Хуки: useEffect, useMemo, useCallback:</span>
              <p className="text-gray-600 dark:text-gray-300">
                • <code>useEffect</code> — выполняет сайд-эффекты (запросы к API, подписки) после монтирования/обновления.
                <br />• <code>useMemo</code> — мемоизирует вычисленное значение между рендерами.
                <br />• <code>useCallback</code> — мемоизирует сигнатуру функции для предотвращения лишних ререндеров дочерних компонентов.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-gray-100 dark:border-darkBorder space-y-1">
              <span className="font-bold text-brand-600">3. Redux Toolkit (RTK):</span>
              <p className="text-gray-600 dark:text-gray-300">
                <code>createSlice</code> объединяет редьюсеры и экшены с встроенной библиотекой Immer (позволяет писать «мутабельный» код, создавая чистые иммутабельные копии). <code>createAsyncThunk</code> стандартизирует асинхронные запросы (pending/fulfilled/rejected).
              </p>
            </div>

            <div className="p-3 rounded-xl border border-gray-100 dark:border-darkBorder space-y-1">
              <span className="font-bold text-brand-600">4. JavaScript Event Loop:</span>
              <p className="text-gray-600 dark:text-gray-300">
                Однопоточный механизм обработки: Call Stack выполняет синхронный код, Microtasks Queue обрабатывает промисы (Promise, async/await), а Macrotasks Queue — таймеры (setTimeout) и I/O операции.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: 40-Point Checklist */}
        {tab === 'checklist' && (
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900 dark:text-gray-100">1. Сүйлөө (10/10 баллов):</strong>
                <p className="text-gray-600 dark:text-gray-300 text-[11px]">
                  Доклад строго на английском по 5-минутному таймеру (Problem → Solution → Demo → Stack → Results).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900 dark:text-gray-100">2. Функционал сайта (10/10 баллов):</strong>
                <p className="text-gray-600 dark:text-gray-300 text-[11px]">
                  Поиск, фильтры 1-11 класс, корзина, формула залога, 3 языка (KG/RU/EN), темная тема, Recharts, Telegram Bot.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900 dark:text-gray-100">3. Теория React и JS (10/10 баллов):</strong>
                <p className="text-gray-600 dark:text-gray-300 text-[11px]">
                  Virtual DOM, хуки, Redux Toolkit createSlice, CSS Grid/Flexbox, Event Loop.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900 dark:text-gray-100">4. Жумушка даярдык (10/10 баллов):</strong>
                <p className="text-gray-600 dark:text-gray-300 text-[11px]">
                  20+ репозиториев на GitHub, портфолио на React/Vite/TS, резюме в PDF.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-darkBorder">
          <Button variant="primary" size="sm" onClick={onClose}>
            Жабуу (Понятно)
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DiplomaDefenseModal;
