// FIX: Provide all SVG icon components.
import React from 'react';

const createIcon = (svgContent: React.ReactNode) => 
  (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      {svgContent}
    </svg>
);

export const Stethoscope = createIcon(
  <>
    <path d="M4.8 2.3A.3.3 0 1 0 5.4 2l-1-1.7A.3.3 0 1 0 3.8.8l1 1.5m10.4 2.8c-3-2.4-7.3-2.4-10.3 0" />
    <path d="M12 11.5v5M10.5 16.5h3s2 0 2-2v-3M12 11.5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3c0 2 2 2 2 2h1m4-7a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3c0 2-2 2-2 2h-1" />
    <circle cx="12" cy="19" r="2.5" />
  </>
);

export const DollarSign = createIcon(<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>);
export const Bug = createIcon(<><rect width="8" height="14" x="8" y="6" rx="4" /><path d="m19 7-3 2" /><path d="m5 7 3 2" /><path d="M19 19-3-2" /><path d="m5 19 3-2" /><path d="m15 13-2-3" /><path d="m9 13 2-3" /></>);
export const Heart = createIcon(<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />);
export const Baby = createIcon(<><path d="M9 12.5a5 5 0 0 1-5-5" /><path d="M9 12.5a5 5 0 0 0-5-5" /><path d="M14.5 12.5a5 5 0 0 1 5-5" /><path d="M14.5 12.5a5 5 0 0 0 5-5" /><path d="M12 15a2.5 2.5 0 0 0-2.5-2.5c-3 0-5 2.5-5 5" /><path d="M12 15a2.5 2.5 0 0 1 2.5-2.5c3 0 5 2.5 5 5" /><circle cx="12" cy="8" r="4" /></>);
export const Woman = createIcon(<><path d="M12 16.5V12" /><path d="M15 12h-6" /><circle cx="12" cy="6.5" r="3.5" /><path d="M15.5 12.5c0 3.3-1.5 6-3.5 6s-3.5-2.7-3.5-6" /></>);
export const HeartPulse = createIcon(<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.7-1 2.1 4.3 1.4-2.3h4.1" />);
export const TrendingUp = createIcon(<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>);
export const TrendingDown = createIcon(<><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></>);
export const Lightbulb = createIcon(<><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>);
export const Loader = createIcon(<line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />);
export const X = createIcon(<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>);
export const Printer = createIcon(<><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></>);
export const Send = createIcon(<><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></>);
export const ArrowRight = createIcon(<><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>);
export const Target = createIcon(<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>);
export const Filter = createIcon(<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />);
export const FileText = createIcon(<><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></>);
export const BookOpen = createIcon(<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>);
export const Edit = createIcon(<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>);
export const Trash = createIcon(<><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></>);
export const Plus = createIcon(<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>);
export const Hospital = createIcon(<><path d="M12 6v4" /><path d="M14 8h-4" /><path d="M18 12h-5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5" /><path d="M18 22V12" /><path d="M13 22V12" /><path d="M6 12h5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6" /><path d="M6 22V12" /><path d="M11 22V12" /><path d="M10 6H8a2 2 0 0 0-2 2v2" /><path d="M14 6h2a2 2 0 0 1 2 2v2" /></>);
