
import React from 'react';
import { OpeningHour } from '../types';

interface HoursProps {
  hours: OpeningHour[];
}

const Hours: React.FC<HoursProps> = ({ hours }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
      <ul className="space-y-4">
        {hours.map((hour) => (
          <li key={hour.day} className="flex justify-between items-center text-lg">
            <span className="font-semibold text-slate-700">{hour.day}</span>
            <span className="text-blue-700 font-medium">{hour.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hours;
