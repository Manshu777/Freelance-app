import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BellIcon(color, height, width) {
  return (
    <svg
      width="550"
      height="550"
      viewBox="0 0 550 550"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M375 25H175C147.386 25 125 47.3858 125 75V475C125 502.614 147.386 525 175 525H375C402.614 525 425 502.614 425 475V75C425 47.3858 402.614 25 375 25Z"
        stroke="#E1353C"
        stroke-width="40"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M273.749 425H276.249"
        stroke="#E1353C"
        stroke-width="40"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default BellIcon;
