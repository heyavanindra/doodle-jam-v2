'use client';

import { useParams } from 'next/navigation';

export default function RoomPage() {
  const { roomslug } = useParams();
  return <div className="h-screen"></div>;
}
