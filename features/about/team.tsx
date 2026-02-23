import HorizontalSmoothScroll from '@/components/shared/horizontal-smooth-scroll';
import Title from '@/components/shared/title';
import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { Team as TeamType } from '@/types';
import CardTeam from './team/card-team';
import { useLanguage } from '@/providers/language.provider';

const Team = ({ team }: { team: TeamType[] }) => {
  const { isFrench } = useLanguage();
  return (
    <section className="py-y-double-default px-x-default grid grid-cols-12 gap-5 overflow-hidden">
      <div className="pb-y-half-default col-span-12 flex flex-col justify-between sm:flex-row lg:col-span-5 lg:flex-col">
        <Title color="blue">{isFrench ? 'L’ÉQUIPE' : 'THE TEAM'}</Title>
        <div className="pt-y-half-default sm:pt-0">
          <Typography className="p3-regular max-w-sm pb-6" variant="p">
            {isFrench
              ? 'Travailler avec Metabole, c’est surtout savoir que l’on va faire du bon travail ensemble avec des clients qui nous ressemblent. Ambitieux et bienveillants. Leur satisfaction est notre premier objectif.'
              : 'Working with Metabole means knowing we will do great work together, with clients who share our values. Ambitious and kind. Their satisfaction is our top priority.'}
          </Typography>
          <Button color="secondary" href="/contact">
            {isFrench ? 'CONTACTEZ-NOUS' : 'CONTACT US'}
          </Button>
        </div>
      </div>
      <HorizontalSmoothScroll className="pr-x-default team-container col-span-12 flex w-[calc(100%+var(--x-default))] shrink-0 lg:col-span-7">
        {team.map((member) => (
          <CardTeam
            key={member.slug.current}
            label={member.label}
            name={member.name}
            photo={member.photo}
            role={member.role}
          />
        ))}
      </HorizontalSmoothScroll>
    </section>
  );
};

export default Team;
