import Title from '@/components/shared/title';
import Button from '@/components/ui/button';

const Team = () => {
  return (
    <section className="px-x-default py-y-double-default grid grid-cols-12 gap-5">
      <div className="col-span-5">
        <Title color="blue">L’ÉQUIPE</Title>
        <p>
          Travailler avec Metabole, c’est surtout savoir que l’on va faire du bon travail ensemble
          avec des clients qui nous ressemblent. Ambitieux et bienveillants. Leur satisfaction est
          notre premier objectif.
        </p>
        <Button color="secondary">CONTACTEZ-NOUS</Button>
      </div>
    </section>
  );
};

export default Team;
