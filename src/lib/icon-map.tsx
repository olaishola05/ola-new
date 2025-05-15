import React from 'react'
import { Server, Briefcase, Code, GraduationCap, School, Monitor, Award, Book, Clock } from 'lucide-react';

const iconMap: Record<string, JSX.Element> = {
  server: <Server className="w-5 h-5 text-emerald-600" />,
  briefcase: <Briefcase className="w-5 h-5 text-blue-600" />,
  code: <Code className="w-5 h-5 text-purple-600" />,
  graduation: <GraduationCap className="w-5 h-5 text-orange-600" />,
  school: <School className="w-5 h-5 text-indigo-600" />,
  monitor: <Monitor className="w-5 h-5 text-gray-600" />,
  award: <Award className="w-5 h-5 text-red-600" />,
  book: <Book className="w-5 h-5 text-green-600" />,
  clock: <Clock className="w-5 h-5 text-yellow-600" />,
};

export default iconMap;

