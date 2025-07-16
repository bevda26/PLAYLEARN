
'use client';

import dynamic from 'next/dynamic';

const CastleScene = dynamic(
  () => import('./castle-scene').then((mod) => mod.CastleScene),
  {
    ssr: false, // This is the key: it will only render on the client side.
  }
);

export function CastleLoader() {
  return <CastleScene />;
}
