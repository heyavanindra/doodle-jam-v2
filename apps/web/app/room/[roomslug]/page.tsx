'use client';

import Canvas from '@/features/canvas/components/canvas';
import { useParams } from 'next/navigation';

export default function RoomPage() {
  const { roomslug } = useParams();
  return <Canvas />;
}
