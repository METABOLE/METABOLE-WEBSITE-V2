import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type { StructureResolver } from 'sanity/structure';
import { TiersIcon, ProjectsIcon } from '@sanity/icons';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        type: 'projects',
        title: 'PROJECT',
        icon: ProjectsIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'expertise',
        title: 'EXPERTISE',
        icon: TiersIcon,
        S,
        context,
      }),
    ]);
