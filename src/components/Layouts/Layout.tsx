import TopNav from './TopNav';
import BottomNav from './BottomNav';
import MobileBottomNav from './MobileBottomNav';
import { LayoutProps } from '@/app/types';
import { ScrollProgress, ScrollToTop } from '@/components'


export default function Layout(props: LayoutProps) {
  return (
    <main className='w-full'>
      <TopNav />
      <div className='flex flex-col gap-10 min-h-screen'>
        <ScrollProgress className='progressbar' />
        {props.children}
      </div>
      <BottomNav />
      <MobileBottomNav />
      <ScrollToTop />
    </main>
  );
}
