import { useEffect, useRef } from 'react';

export default function MagneticCard({ children, className = '' }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    card.style.transition = 'none';
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const reset = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transition = 'transform 0.3s ease-out';
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  useEffect(() => {
    const handleReset = () => reset();
    window.addEventListener('focus', handleReset);
    window.addEventListener('visibilitychange', handleReset);
    return () => {
      window.removeEventListener('focus', handleReset);
      window.removeEventListener('visibilitychange', handleReset);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`magnetic-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onPointerLeave={reset}
      onClick={reset}
      onBlur={reset}
    >
      {children}
    </div>
  );
}
