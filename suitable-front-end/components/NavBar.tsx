import Link from "next/link";
import { Home, User, MessageCircle } from 'lucide-react';

export default function BottomNavBar() {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 py-2 flex justify-around">
            <Link href="/match" className="flex flex-col items-center">
                <Home className="text-gray-600" />
                <span className="text-xs text-gray-600">Home</span>
            </Link>
            <Link href="/all-chats" className="flex flex-col items-center">
                <MessageCircle className="text-gray-600" />
                <span className="text-xs text-gray-600">Chat</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center">
                <User className="text-gray-600" />
                <span className="text-xs text-gray-600">Profile</span>
            </Link>
        </nav>
    );
}
