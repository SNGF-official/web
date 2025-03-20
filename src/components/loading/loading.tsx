import React from 'react';
import styled from 'styled-components';

const Loader: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <svg height={0} width={0} viewBox="0 0 70 70" className="absolute">
          <defs xmlns="http://www.w3.org/2000/svg">
            <linearGradient
              id="b"
              x1={0}
              y1={62}
              x2={0}
              y2={2}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#973BED" />
              <stop stopColor="#007CFF" offset={1} />
            </linearGradient>
            <linearGradient
              id="c"
              x1={0}
              y1={70}
              x2={0}
              y2={0}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFC800" />
              <stop stopColor="#F0F" offset={1} />
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                values="0 32 32;-270 32 32;-540 32 32;-810 32 32;-1080 32 32"
                dur="8s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <linearGradient
              id="d"
              x1={0}
              y1={62}
              x2={0}
              y2={2}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00E0ED" />
              <stop stopColor="#00DA72" offset={1} />
            </linearGradient>
          </defs>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 70 70"
          height={70}
          width={68}
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={8}
            stroke="url(#b)"
            d="M0 33.76L4.47 33.37Q4.79 36.06 5.94 37.78Q7.10 39.50 9.55 40.56Q11.99 41.63 15.04 41.63Q17.75 41.63 19.82 40.82Q21.90 40.01 22.91 38.61Q23.93 37.21 23.93 35.55Q23.93 33.86 22.95 32.60Q21.97 31.35 19.73 30.49Q18.29 29.93 13.35 28.75Q8.42 27.56 6.45 26.51Q3.88 25.17 2.62 23.18Q1.37 21.19 1.37 18.73Q1.37 16.02 2.91 13.66Q4.44 11.30 7.40 10.08Q10.35 8.86 13.96 8.86Q17.94 8.86 20.98 10.14Q24.02 11.43 25.66 13.92Q27.29 16.41 27.42 19.56L22.88 19.90Q22.51 16.50 20.40 14.77Q18.29 13.04 14.16 13.04Q9.86 13.04 7.90 14.61Q5.93 16.19 5.93 18.41Q5.93 20.34 7.32 21.58Q8.69 22.83 14.47 24.13Q20.24 25.44 22.39 26.42Q25.51 27.86 27.00 30.07Q28.49 32.28 28.49 35.16Q28.49 38.01 26.86 40.54Q25.22 43.07 22.16 44.47Q19.09 45.87 15.26 45.87Q10.40 45.87 7.12 44.46Q3.83 43.04 1.97 40.20Q0.10 37.35 0 33.76Z"
            className="dash"
            pathLength={360}
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 68 68"
          height={68}
          width={68}
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={10}
            stroke="url(#c)"
            d="M0 45.26L0 9.47L4.86 9.47L23.66 37.57L23.66 9.47L28.20 9.47L28.20 45.26L23.34 45.26L4.54 17.14L4.54 45.26L0 45.26Z"
            className="dash"
            pathLength={360}
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 68 68"
          height={68}
          width={68}
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={8}
            stroke="url(#d)"
            d="M17.94 31.23L17.94 27.03L33.11 27.00L33.11 40.28Q29.61 43.07 25.90 44.47Q22.19 45.87 18.29 45.87Q13.01 45.87 8.70 43.62Q4.39 41.36 2.20 37.08Q0 32.81 0 27.54Q0 22.31 2.19 17.79Q4.37 13.26 8.47 11.06Q12.57 8.86 17.92 8.86Q21.80 8.86 24.94 10.12Q28.08 11.38 29.86 13.62Q31.68 15.87 32.57 19.48L28.30 20.65Q27.49 17.92 26.29 16.36Q25.10 14.79 22.88 13.85Q20.65 12.92 17.94 12.92Q14.70 12.92 12.33 13.90Q9.96 14.89 8.51 16.50Q7.06 18.12 6.25 20.04Q4.88 23.36 4.88 27.25Q4.88 32.03 6.53 35.25Q8.18 38.48 11.33 40.04Q14.48 41.60 18.02 41.60Q21.09 41.60 24.02 40.42Q26.95 39.23 28.47 37.89L28.47 31.23L17.94 31.23Z"
            className="dash"
            pathLength={360}
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 68 68"
          height={70}
          width={70}
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={8}
            stroke="url(#d)"
            d="M0 45.26L0 9.47L24.15 9.47L24.15 13.70L4.74 13.70L4.74 24.78L21.53 24.78L21.53 29.00L4.74 29.00L4.74 45.26L0 45.26Z"
            className="dash"
            pathLength={360}
          />
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    display: flex;
    position: absolute;
    align-items: center;
    gap: 8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .spacer {
    width: 8px;
  }

  .dash {
    animation:
      dashArray 2s ease-in-out infinite,
      dashOffset 2s linear infinite;
  }

  .spin {
    animation:
      spinDashArray 2s ease-in-out infinite,
      spin 8s ease-in-out infinite,
      dashOffset 2s linear infinite;
    transform-origin: center;
  }

  @keyframes dashArray {
    0% {
      stroke-dasharray: 0 1 359 0;
    }
    50% {
      stroke-dasharray: 0 359 1 0;
    }
    100% {
      stroke-dasharray: 359 1 0 0;
    }
  }

  @keyframes spinDashArray {
    0% {
      stroke-dasharray: 270 90;
    }
    50% {
      stroke-dasharray: 0 360;
    }
    100% {
      stroke-dasharray: 270 90;
    }
  }

  @keyframes dashOffset {
    0% {
      stroke-dashoffset: 365;
    }
    100% {
      stroke-dashoffset: 5;
    }
  }
`;

export { Loader };
