import React from 'react';
import { skillCategories } from '@/app/utils';

const Skills = () => {
  return (
    <div className="my-8 max-w-5xl mx-auto md:my-12 px-4">
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-cta">Technical Arsenal</span>
        <h3 className="text-2xl md:text-4xl font-extrabold text-[var(--textColor)] tracking-tight mt-1">
          Skills & Technologies
        </h3>
        <p className="text-softText text-sm md:text-base max-w-xl mx-auto mt-2">
          Evidence-based competencies grouped by domain, separating professional production stacks from active postgraduate study.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-softBg/30 border border-softBg/60 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-softBg/60">
                <h4 className="text-lg font-bold text-[var(--textColor)] tracking-tight">
                  {category.name}
                </h4>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cta/10 text-cta">
                  {category.skills.length} competencies
                </span>
              </div>

              <div className="space-y-3.5">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="group">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{skill.icon}</span>
                      <span className="text-sm font-semibold text-[var(--textColor)]">
                        {skill.name}
                      </span>
                    </div>
                    <p className="text-xs text-softText leading-relaxed pl-6">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
