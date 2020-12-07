import isEqual from 'lodash.isequal';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import StyleGuide from '~/utils/StyleGuide';

export const ActiveHome = React.memo(() => {
  return (
    <Svg height="20pt" width="20pt" viewBox="0 0 512 512">
      <Path
        fill={StyleGuide.palette.primary}
        d="M498.195 222.695l-.035-.035L289.305 13.813C280.402 4.905 268.566 0 255.977 0c-12.59 0-24.426 4.902-33.332 13.809L13.898 222.55c-.07.07-.14.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.445 13.238 31.277 13.746.48.047.965.07 1.453.07h8.324v153.7C54.832 487.254 79.578 512 110 512h81.71c8.282 0 15-6.715 15-15V376.5c0-13.879 11.29-25.168 25.169-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.285 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.16v-153.7h7.719c12.586 0 24.422-4.902 33.332-13.808 18.36-18.371 18.367-48.254.023-66.637zm0 0"
      />
    </Svg>
  );
}, isEqual);

export const InactiveHome = React.memo(() => {
  return (
    <Svg height="20" viewBox="0 0 512 512" width="20">
      <Path
        fill={StyleGuide.palette.secondary}
        d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 01-12.117 5.024H442.62c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 00-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 01256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0"
      />
    </Svg>
  );
}, isEqual);
