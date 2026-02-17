import { BanknoteArrowUp, CircleFadingPlus } from 'lucide-react';
import Link from 'next/link';

export function FloatingActionButton() {
    return (
        <div className="fab">
            <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-info">
                <CircleFadingPlus size={24} />
            </div>

            <div>
                New Transaction{' '}
                <Link href={'/dashboard/transactions/new'}>
                    <button className="btn btn-lg btn-circle">
                        <BanknoteArrowUp />
                    </button>
                </Link>
            </div>
        </div>
    );
}
