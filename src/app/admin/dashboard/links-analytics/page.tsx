import React from "react";
import prisma from "@/app/lib/prisma";
import { BarChart, MousePointerClick, TrendingUp, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LinksAnalyticsPage() {
  const totalViews = await prisma.linkPageView.count();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const viewsLast7Days = await prisma.linkPageView.count({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
  });

  const allClicks = await prisma.linkClick.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const totalClicks = allClicks.length;

  const overallCTR = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

  const clickCountsByTitle = allClicks.reduce((acc: Record<string, number>, click) => {
    acc[click.linkTitle] = (acc[click.linkTitle] || 0) + 1;
    return acc;
  }, {});

  const sortedLinks = Object.entries(clickCountsByTitle).sort((a, b) => b[1] - a[1]);

  return (
    <div className="w-full h-full flex flex-col p-6 lg:p-10 animate-fade-in relative">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <BarChart className="w-8 h-8 text-[#392467]" />
          Bio Link Analytics
        </h1>
        <p className="text-white/40 mt-3 font-medium max-w-2xl text-lg">
          Track visitors and see which links perform best on your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-[#1E2A40]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col shadow-xl hover:border-white/20 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Total Page Views</span>
            <TrendingUp className="w-5 h-5 text-green-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-5xl font-black text-white mt-4 tracking-tighter">{totalViews}</span>
          <div className="flex items-center gap-2 mt-4">
            <span className="px-2 py-0.5 rounded bg-green-500/10 text-[10px] font-bold text-green-400">+{viewsLast7Days}</span>
            <span className="text-xs text-white/30">in the last 7 days</span>
          </div>
        </div>

        <div className="bg-[#1E2A40]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col shadow-xl hover:border-white/20 transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Total Link Clicks</span>
            <MousePointerClick className="w-5 h-5 text-[#392467] opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-5xl font-black text-white mt-4 tracking-tighter">{totalClicks}</span>
          <span className="text-xs text-white/30 mt-4 font-medium">Accumulated data all-time</span>
        </div>

        <div className="bg-[#392467] rounded-2xl p-8 flex flex-col shadow-2xl shadow-[#392467]/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-32 h-32 text-white" />
          </div>
          <div className="relative z-10">
            <span className="text-xs font-bold text-white/60 uppercase tracking-[0.2em]">Engagement (CTR)</span>
            <span className="text-5xl font-black text-white mt-4 block tracking-tighter">{overallCTR}%</span>
            <p className="text-xs text-white/60 mt-4 leading-relaxed max-w-[200px]">
              Percentage of visitors who took action on your links
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-[#1E2A40]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight">Top Performing Links</h2>
          <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Performance Ranking</span>
        </div>

        {sortedLinks.length > 0 ? (
          <div className="divide-y divide-white/5">
            {sortedLinks.map(([title, clicks], index) => {
              const percentage = totalClicks > 0 ? ((clicks / totalClicks) * 100).toFixed(1) : 0;
              return (
                <div key={title} className="flex items-center justify-between p-6 px-8 hover:bg-white/10 transition-all group cursor-default">
                  <div className="flex items-center gap-6">
                    <span className="text-3xl font-black text-white/20 w-8 group-hover:text-[#392467]/60 transition-colors italic">{index + 1}</span>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg group-hover:text-white/100 transition-colors">{title}</span>
                      <span className="text-sm text-white/50 mt-0.5 font-medium">{clicks} clicks recorded</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="w-40 h-2 bg-black/40 rounded-full overflow-hidden hidden md:block">
                      <div
                        className="h-full bg-gradient-to-r from-[#392467] to-[#A78BFA] rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xl font-black text-white tracking-tighter">{percentage}%</span>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Relative CTR</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/70 text-xl font-bold tracking-tight">No data available yet</p>
            <p className="text-white/40 text-sm mt-2 max-w-sm">Share your bio link with your audience to start tracking performance metrics!</p>
          </div>
        )}
      </div>

    </div>
  );
}

