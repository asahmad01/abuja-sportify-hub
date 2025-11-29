import { forwardRef } from 'react';

interface PhoneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  screenshot: string;
  title: string;
  description: string;
  customClass?: string;
}

export const PhoneCard = forwardRef<HTMLDivElement, PhoneCardProps>(
  ({ screenshot, title, description, customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-3xl border-4 border-gray-800 bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    >
      {/* Phone Screen */}
      <div className="relative bg-gray-900 rounded-[1.75rem] p-2">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-2xl z-10"></div>

        {/* Screenshot */}
        <div className="relative bg-white rounded-[1.5rem] overflow-hidden">
          <img
            src={screenshot}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-700 rounded-full"></div>
      </div>

      {/* Info Below Phone */}
      <div className="absolute -bottom-20 left-0 right-0 text-center px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
);

PhoneCard.displayName = 'PhoneCard';
