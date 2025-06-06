"use client";

import React from "react";
import { OptionButtonGroup } from "@/components/ui/settings/OptionButtonGroup";
import { useSettings } from "@/lib/contexts/SettingsContext";
import { scrollSpeedOptions } from "@/lib/settings-config";

export function ScrollSpeedSetting() {
  const { textSettings, updateTextSettings } = useSettings();

  return {
    title: "滚动速度",
    component: (
      <OptionButtonGroup<{ name: string; value: string }>
        options={scrollSpeedOptions}
        selectedValue={textSettings.scrollSpeed.toString()}
        onChange={(value) =>
          updateTextSettings({ scrollSpeed: parseInt(value, 10) })
        }
      />
    ),
  };
} 