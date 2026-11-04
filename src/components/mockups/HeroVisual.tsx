import { m } from 'framer-motion';
import { LaptopScreen, PhoneScreen } from './HeroScreens';

const float = (distance: number, duration: number) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration, repeat: Infinity, ease: 'easeInOut' as const },
});

export function HeroVisual({ label }: { label: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[42rem] pt-[6%]">
      <div className="hero-arc" aria-hidden="true" />

      <div role="img" aria-label={label} className="relative">
        <m.div {...float(5, 9)} className="relative ml-auto w-[91%]">
          <div className="mx-auto w-[88%] rounded-t-[clamp(8px,1.6vw,16px)] border border-[#34506f] bg-[#081120] p-[1.1%] shadow-[0_30px_80px_-30px_rgba(7,136,255,0.7)]">
            <div className="aspect-[16/10] overflow-hidden rounded-[3px]">
              <LaptopScreen />
            </div>
          </div>
          <div className="relative h-[clamp(9px,1.7vw,17px)] rounded-b-[clamp(8px,1.4vw,14px)] bg-[linear-gradient(180deg,#5a7796_0%,#2a405b_34%,#14233a_100%)]">
            <span className="absolute top-0 left-1/2 h-[42%] w-[15%] -translate-x-1/2 rounded-b-md bg-[#0f1c2e]" />
          </div>
          <div className="mx-auto h-6 w-[82%] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(7,136,255,0.45),transparent)]" />
        </m.div>

        <m.div
          {...float(9, 7)}
          className="absolute bottom-[1%] left-0 w-[25%] min-w-[84px] rounded-[clamp(14px,2.6vw,26px)] border border-[#44617f] bg-[#050d1a] p-[0.7%] shadow-[0_24px_50px_-14px_rgba(0,0,0,0.9),0_0_44px_-12px_rgba(0,183,255,0.5)]"
        >
          <div className="aspect-[9/19] overflow-hidden rounded-[clamp(12px,2.3vw,23px)]">
            <PhoneScreen />
          </div>
        </m.div>
      </div>
    </div>
  );
}
