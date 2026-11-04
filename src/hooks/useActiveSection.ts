import { useEffect, useState } from 'react';
import { navSections, type SectionId } from '../config/site';

/** Tracks the section crossing the upper part of the viewport, for the navbar indicator. */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('inicio');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActive(current.target.id as SectionId);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    navSections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}
