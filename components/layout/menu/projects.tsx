import Tag from '@/components/ui/tag';
import { ProjectType } from '@/types';
import Link from 'next/link';

const Projects = ({
  projects,
  getInternalPath,
  isFrench,
}: {
  projects: ProjectType[];
  getInternalPath: (path: string) => string;
  isFrench: boolean;
}) => {
  const SLICED_PROJECTS = projects.slice(0, 6);
  return (
    <nav className="col-span-3">
      {SLICED_PROJECTS.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          <li className="overflow-hidden">
            <Link
              className="p3-medium text-blue menu-item-translate inline-block cursor-pointer uppercase"
              href={getInternalPath('/projects')}
              scroll={false}
            >
              /{isFrench ? 'Projets' : 'Projects'}
            </Link>
          </li>
          {SLICED_PROJECTS.map((link, index) => (
            <li key={link.name + index}>
              <Tag className="menu-item-scale cursor-pointer" href={link.name}>
                {link.name}
              </Tag>
            </li>
          ))}
          <li>
            <Tag className="menu-item-scale cursor-pointer" href="/projects">
              {isFrench ? 'Et plus' : 'And more'} ...
            </Tag>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Projects;
