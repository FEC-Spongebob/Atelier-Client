import React from 'react';

export function Stars({ review }) {
  const ratingAvg = review;
  const fillPercentage = (ratingAvg / 5) * 100;

  return (
    <div className="flex items-center">
      <div className="relative flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="1 1 22 22"
            className={`w-5 h-5 ${index < Math.floor(ratingAvg)
                ? "text-yellow-400"
                : "text-gray-300"}`}
          >
            <defs>
              {index + 1 === Math.ceil(ratingAvg) && (
                <linearGradient id={`starGrad${index}`}>
                  <stop offset={`${fillPercentage}%`} stopColor="black" />
                  <stop offset={`${fillPercentage}%`} stopColor="transparent" />
                </linearGradient>
              )}
            </defs>
            <path
              fill={index + 1 <= Math.floor(ratingAvg)
                ? "black"
                : index + 1 === Math.ceil(ratingAvg)
                  ? `url(#starGrad${index})`
                  : "none"}
              stroke={index + 1 > Math.floor(ratingAvg) ? "black" : "none"}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        ))}
      </div>
    </div>
  );
}
