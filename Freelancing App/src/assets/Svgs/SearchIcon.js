import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Se({color,height,width}) {
  return (
    <Svg
      width={height}
      height={width}
      viewBox="0 0 683 683"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_238_25)">
        <Path
          d="M257.333 1.467c-65.866 6.8-126.8 35.866-174.133 83.066-32.8 32.8-54.933 68.534-69.067 111.467-18.8 57.067-18.8 116.267 0 173.333 14.134 43.067 36.4 78.934 69.334 111.6 65.066 64.667 153.733 94 245.2 81.067 47.066-6.667 94.266-26 131.333-53.867 4-3.066 7.6-5.333 8.133-5.2.534.267 40.934 39.734 89.734 87.734 55.6 54.666 90.666 88.133 93.866 89.6 13.067 6.133 27.734-1.6 30.4-16 2.134-11.2 9.6-3.2-136.533-147.467L500 471.733l7.733-9.066c33.334-38.534 55.334-87.334 63.734-140.667 3.2-20.8 3.2-58.933 0-80C562 180.8 535.2 128.267 490.533 83.867c-61.333-60.934-146.8-91.2-233.2-82.4zM321.2 46.133C375.067 54 422.4 77.467 459.867 114.8c45.866 46 69.733 103.2 69.733 167.867 0 23.866-2.133 40.266-7.733 60.933C493.6 448.667 397.733 521.333 287.333 521.333c-65.733 0-126.8-24.933-172.4-70.533-30.933-30.933-51.6-66.667-62.8-108.133-9.866-36.934-9.866-83.067 0-120 22.4-83.467 88.667-149.2 172.267-170.8C254.8 44 292 41.733 321.2 46.133z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_238_25">
          <Path fill="#fff" d="M0 0H682.667V682.667H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Se