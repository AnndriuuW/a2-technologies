import type { MockupId } from '../../data/projects';
import { useLanguage } from '../../i18n/useLanguage';
import { BomberoMockup } from './BomberoMockup';
import { OdontoCareMockup } from './OdontoCareMockup';
import { SigmaMockup } from './SigmaMockup';

const mockups = {
  sigma: SigmaMockup,
  odontocare: OdontoCareMockup,
  bombero: BomberoMockup,
};

export default function ProjectMockup({ id }: { id: MockupId }) {
  const { locale } = useLanguage();
  const Mockup = mockups[id];

  return <Mockup locale={locale} />;
}
