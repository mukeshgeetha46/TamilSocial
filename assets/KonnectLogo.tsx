import React from 'react';
import Svg, { Rect, Circle, Line, Text } from 'react-native-svg';

interface KonnectLogoProps {
  width?: number;
  height?: number;
}

export default function KonnectLogo({ width = 320, height = 100 }: KonnectLogoProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 100">
      {/* Rounded square background */}
      <Rect x="4" y="4" width="68" height="68" rx="16" ry="16" fill="#2b8cee" />

      {/* Share icon - center node */}
      <Circle cx="38" cy="38" r="5.5" fill="white" />
      {/* Top right node */}
      <Circle cx="58" cy="20" r="5.5" fill="white" />
      {/* Bottom right node */}
      <Circle cx="58" cy="56" r="5.5" fill="white" />
      {/* Lines */}
      <Line x1="43" y1="35" x2="53" y2="23" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <Line x1="43" y1="41" x2="53" y2="53" stroke="white" strokeWidth="3" strokeLinecap="round" />

      {/* App name */}
      <Text
        x="90"
        y="56"
        fontFamily="Plus Jakarta Sans, Helvetica Neue, Arial, sans-serif"
        fontWeight="700"
        fontSize="38"
        fill="#2b8cee"
        letterSpacing="-0.5"
      >
        Konnect
      </Text>
    </Svg>
  );
}
