import { m } from 'framer-motion';
import { reveal, useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SectionHeadingProps {
  id: string;
  title: string;
  description: string;
}

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  const animation = useScrollAnimation(0.6);

  return (
    <m.header {...animation} variants={reveal.fadeIn} className="max-w-2xl">
      <h2 id={id} className="heading-2">
        {title}
      </h2>
      <p className="lead mt-4">{description}</p>
    </m.header>
  );
}
