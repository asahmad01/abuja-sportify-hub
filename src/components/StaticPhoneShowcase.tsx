import React from 'react';

interface PhoneScreenProps {
  screenshot: string;
  title: string;
  description: string;
  position: 'left' | 'center' | 'right';
}

const StaticPhoneScreen: React.FC<PhoneScreenProps> = ({ screenshot, title, description, position }) => {
  const positionStyles = {
    left: {
      transform: 'perspective(1200px) rotateY(15deg) scale(0.85)',
      zIndex: 10,
      marginRight: '-70px',
    },
    center: {
      transform: 'perspective(1200px) rotateY(0deg) scale(1)',
      zIndex: 20,
    },
    right: {
      transform: 'perspective(1200px) rotateY(-15deg) scale(0.85)',
      zIndex: 10,
      marginLeft: '-70px',
    }
  };

  return (
    <div
      className="transition-all duration-300 hover:scale-105 hover:z-30 flex-shrink-0"
      style={positionStyles[position]}
    >
      <div className="relative w-[200px] md:w-[240px] lg:w-[280px] rounded-2xl overflow-hidden bg-transparent">
        <img
          src={screenshot}
          alt={title}
          className="w-full h-auto object-cover block"
        />
      </div>
    </div>
  );
};

interface StaticPhoneShowcaseProps {
  screens: Array<{
    title: string;
    description: string;
    screenshot: string;
  }>;
}

const StaticPhoneShowcase: React.FC<StaticPhoneShowcaseProps> = ({ screens }) => {
  return (
    <div className="flex items-center justify-center py-8 md:py-12">
      <div className="flex items-center justify-center" style={{ perspective: '1500px' }}>
        {screens.map((screen, index) => (
          <StaticPhoneScreen
            key={index}
            screenshot={screen.screenshot}
            title={screen.title}
            description={screen.description}
            position={index === 0 ? 'left' : index === 1 ? 'center' : 'right'}
          />
        ))}
      </div>
    </div>
  );
};

export default StaticPhoneShowcase;
