'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ProgressiveBlur } from './noisyButterflyBackground/progressiveBlur';

interface EdgeBlurEffectProps {
  enabled: boolean;
  intensity?: number;
  className?: string;
}

export function EdgeBlurEffect({
  enabled = false,
  intensity = 8,
  className,
}: EdgeBlurEffectProps) {
  if (!enabled) return null;
  
  // Calculate blur layers based on intensity
  const blurLayers = Math.max(2, Math.min(12, Math.floor(intensity / 1.5)));
  const blurIntensity = intensity * 0.1;
  
  return (
    <div className={cn('pointer-events-none fixed inset-0 z-10', className)}>
      {/* Left edge blur - progressive blur from left to right */}
      <div className="absolute left-0 top-0 bottom-0 w-[35%]">
        <ProgressiveBlur
          direction="left"
          blurLayers={blurLayers}
          blurIntensity={blurIntensity}
          className="w-full h-full"
        />
      </div>
      
      {/* Right edge blur - progressive blur from right to left */}
      <div className="absolute right-0 top-0 bottom-0 w-[35%]">
        <ProgressiveBlur
          direction="right"
          blurLayers={blurLayers}
          blurIntensity={blurIntensity}
          className="w-full h-full"
        />
      </div>
    </div>
  );
} 