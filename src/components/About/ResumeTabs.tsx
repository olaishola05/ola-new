import React, { useState } from 'react';
import { resumeTabs } from '@/app/utils';
import Education from './Education';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import Certification from './Certification';
import TabPanel from '../Tabs/Tab';

const ResumeTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const switchTab = (value: string) => {
    switch (value) {
      case 'education':
        return <Education />;
      case 'experience':
        return <WorkExperience />;
      case 'skills':
        return <Skills />;
      case 'certifications':
        return <Certification />;
      default:
        return null;
    }
  };

  return (
    <div data-aos="fade-up">
      <div className="w-90 m-auto p-4 bg-transparent">
        <div className="w-full flex justify-center">
          <ul className="w-90 flex flex-col items-center md:flex-row justify-center gap-5 mx-auto mt-5 md:mb-7 lg:mb-0">
            {resumeTabs.map((tab, index) => (
              <li key={tab.label} className='list-none'>
                <button
                  onClick={(e) => handleChange(e, index)}
                  className={`px-4 py-2 border border-[var(--cta)] hover:bg-[var(--cta)] hover:text-[var(--ctaText)] rounded-full ${activeTab === index ? 'bg-[var(--btnMode)] text-white' : 'text-primary'}`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {resumeTabs.map((tab, index) => (
        <TabPanel key={tab.label} value={activeTab} index={index}>
          {switchTab(tab.value)}
        </TabPanel>
      ))}
    </div>
  );
};

export default ResumeTabs;