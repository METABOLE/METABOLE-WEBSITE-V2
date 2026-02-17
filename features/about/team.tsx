import HorizontalSmoothScroll from '@/components/shared/horizontal-smooth-scroll';
import Title from '@/components/shared/title';
import Button from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { Team as TeamType } from '@/types';
import CardTeam from './team/card-team';

const Team = ({ team }: { team: TeamType[] }) => {
  return (
    <section className="py-y-double-default px-x-default grid grid-cols-12 gap-5 overflow-hidden">
      <div className="col-span-5 flex flex-col justify-between">
        <Title color="blue">L’ÉQUIPE</Title>
        <div>
          <Typography className="p3-regular max-w-sm pb-6" variant="p">
            Travailler avec Metabole, c’est surtout savoir que l’on va faire du bon travail ensemble
            avec des clients qui nous ressemblent. Ambitieux et bienveillants. Leur satisfaction est
            notre premier objectif.
          </Typography>
          <Button color="secondary">CONTACTEZ-NOUS</Button>
        </div>
      </div>
      <HorizontalSmoothScroll className="col-span-7 w-[calc(100%+var(--x-default))]">
        <div className="pr-x-default flex gap-5">
          {team.map((member) => (
            <CardTeam
              key={member.slug.current}
              label={member.label}
              name={member.name}
              photo={member.photo}
              role={member.role}
            />
          ))}
        </div>
      </HorizontalSmoothScroll>
    </section>
  );
};

export default Team;
