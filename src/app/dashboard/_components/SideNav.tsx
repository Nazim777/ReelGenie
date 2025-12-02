



'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useColorMode } from '@/app/_context/ColorModeContext';
import { FileVideo, PanelsTopLeft } from 'lucide-react';

export const MenuOptions = [
  { id: 1, name: 'Dashboard', path: '/dashboard', icon: PanelsTopLeft },
  { id: 2, name: 'Generate New', path: '/dashboard/create-new', icon: FileVideo },
  { id: 3, name: 'Billing & Credits', path: '/dashboard/buy-credits', icon: '/credit.png' }
];

const modeColors: Record<string, { bg: string; active: string; text: string }> = {
  default: { bg: 'bg-gray-100', active: 'bg-blue-600', text: 'text-gray-800' },
  dark: { bg: 'bg-gray-900', active: 'bg-blue-500', text: 'text-gray-200' },
  green: { bg: 'bg-green-500', active: 'bg-green-700', text: 'text-white' },
  orange: { bg: 'bg-orange-500', active: 'bg-orange-700', text: 'text-white' },
};

const SideNav = () => {
  const path = usePathname();
  const { mode } = useColorMode();

  const colors = modeColors[mode];

  return (
    <div className={`w-64 h-screen shadow-md p-5 ${colors.bg}`}>
      <div className="grid gap-4">
        {MenuOptions.map(item => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer 
              ${path === item.path ? colors.active + ' text-white' : colors.text + ' hover:' + colors.active + ' hover:text-gray-400'}`}
          >
            <span>
              {typeof item.icon === 'string' ? (
                <Image src={item.icon} alt={item.name} width={20} height={20} className="w-6 h-6" />
              ) : (
                <item.icon className="w-6 h-6" />
              )}
            </span>
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
