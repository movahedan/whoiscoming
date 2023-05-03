import type { CSSProperties, FC } from 'react';

export type LoadingProps = {
  width: string;
  height: string;
  style?: CSSProperties;
  className?: string;
};

export const Loading: FC<LoadingProps> = ({
  width,
  height,
  style,
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMidYMid'
    style={style}
    className={className}
  >
    <defs>
      <mask id='ldio-klyuoznm1db-mask'>
        <circle cx='50' cy='50' r='45' fill='#fff'></circle>
      </mask>
    </defs>
    <circle cx='50' cy='50' r='45' fill='#fefefe'></circle>
    <path
      d='M 37.27207793864214 40.72792206135786 L 62.72792206135786 15.272077938642143 L 162.72792206135784 115.27207793864214 L 137.27207793864216 140.72792206135784 Z'
      fill='#b2b2b2'
      mask='url(#ldio-klyuoznm1db-mask)'
    >
      <animate
        attributeName='d'
        dur='1s'
        repeatCount='indefinite'
        calcMode='spline'
        keyTimes='0;0.5;1'
        values='M 37.27207793864214 40.72792206135786 L 62.72792206135786 15.272077938642143 L 162.72792206135784 115.27207793864214 L 137.27207793864216 140.72792206135784 Z;M 37.27207793864214 84.72792206135786 L 62.72792206135786 59.27207793864214 L 162.72792206135784 159.27207793864216 L 137.27207793864216 184.72792206135784 Z;M 37.27207793864214 40.72792206135786 L 62.72792206135786 15.272077938642143 L 162.72792206135784 115.27207793864214 L 137.27207793864216 140.72792206135784 Z'
        keySplines='0.45 0 0.9 0.55;0 0.45 0.55 0.9'
      ></animate>
    </path>
    <circle cx='50' cy='28' r='18' fill='#262323'>
      <animate
        attributeName='cy'
        dur='1s'
        repeatCount='indefinite'
        calcMode='spline'
        keyTimes='0;0.5;1'
        values='28;72;28'
        keySplines='0.45 0 0.9 0.55;0 0.45 0.55 0.9'
      ></animate>
    </circle>
  </svg>
);
