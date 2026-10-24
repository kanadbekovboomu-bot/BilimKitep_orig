import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const RevenueChart = ({ data = [] }) => (
  <div className="h-80 w-full p-5 bg-white dark:bg-darkCard rounded-2xl border border-gray-100 dark:border-darkBorder">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100">
        Динамика выручки и аренды (сом)
      </h3>
      <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
        +24.5% в этом месяце
      </span>
    </div>
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} />
        <YAxis stroke="#888888" fontSize={11} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            border: 'none',
            color: '#fff',
            fontSize: '12px'
          }}
          formatter={(value) => [`${value} сом`, 'Выручка']}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={2.5}
          fillOpacity={1}
          fill="url(#colorRev)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default RevenueChart;
