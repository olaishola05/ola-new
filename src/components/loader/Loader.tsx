import React, { CSSProperties, useContext, useState } from 'react'
import GridLoader from 'react-spinners/GridLoader'
import { ThemeContext } from '@/app/config/ThemeContext';

export default function Loader({ loading }: { loading: any }) {
  const { theme } = useContext(ThemeContext);

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  return (
    <div className="absolute top-[50%] left-[50%]">
      <GridLoader
        color={theme === "dark" ? '#fff' : "#087ea4"}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={override}
      />
    </div>
  )
}
