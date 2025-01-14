'use client';

import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { createClient } from '@/lib/supabase/client';
import { useAppInfo } from '@/store/appInfo';
import { useAuthStore } from '@/store/auth';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * [Wrapper to load user's day data]
 *
 * Retriggers whenever the user changes.
 * shows a loader until the day data is loaded.
 *
 */
export default function AppInfoProvider({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabaseClient = createClient();

    const { user } = useAuthStore();
    const { setDayInt, setHasFilledDayForm, setDayMetadata, setTotalFilledDays } = useAppInfo();

    const [isLoaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const today = new Date(new Date().getTime() - 12 * 60 * 60 * 1000);
        const dayInt = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

        setDayInt(dayInt);
        if (user) {
            supabaseClient
                .from('day_data')
                .select('metadata')
                .eq('user_id', user.id)
                .eq('day_int', dayInt)
                .then(({ data }) => {
                    if (data && data.length > 0) {
                        setHasFilledDayForm(true);
                        setDayMetadata(data[0].metadata);
                    } else {
                        setHasFilledDayForm(false);
                        setDayMetadata({});
                    }
                    setLoaded(true);
                });

            supabaseClient
                .from('day_data')
                .select('', { count: 'exact', head: true })
                .eq('user_id', user.id)
                .then(({ count }) => {
                    if (count !== null) {
                        setTotalFilledDays(count);
                    }
                });
        }
    }, [user]);

    if (!isLoaded && !pathname.startsWith('/p/login')) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <LoadingSpinner size={48} />
            </div>
        );
    }

    return <>{children}</>;
}
