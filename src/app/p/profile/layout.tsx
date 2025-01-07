import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { GearSix } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className='hidden sm:flex items-center justify-center w-full mt-16'>
				<div className='flex justify-center items-start w-[90%] lg:w-[50%]'>
					<div className='text-right flex flex-col justify-start gap-2 py-4 px-8 w-[30%]'>
						<Link href='/p/profile'>
							<Badge variant='outline' className='text-lg cursor-pointer hover:text-primary'>
								Profile
							</Badge>
						</Link>
						<Link href='/p/profile/reminders'>
							<Badge variant='outline' className='text-lg cursor-pointer hover:text-primary'>
								Reminders
							</Badge>
						</Link>
					</div>
					<div className=''>
						<Card className=''>{children}</Card>
					</div>
				</div>
			</div>
			<div className='flex flex-col sm:hidden items-start gap-2 justify-start w-full p-16 mt-16'>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className='flex items-center justify-start gap-2'>
							<GearSix size={32} className='text-primary animate-spin' /> Settings
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
						{/* <DropdownMenuSeparator /> */}
						<Link href='/p/profile'>
							<DropdownMenuItem>Profile</DropdownMenuItem>
						</Link>
						<Link href='/p/profile/reminders'>
							<DropdownMenuItem>Reminders</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
				<Card className='w-full'>{children}</Card>
			</div>
		</>
	);
}
