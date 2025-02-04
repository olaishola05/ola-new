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
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-auto">
      <GridLoader
        color={theme === "dark" ? '#fff' : "#392467"}
        loading={loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={override}
      />
    </div>
  )
}
