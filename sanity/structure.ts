import {
  DatabaseIcon,
  DiamondIcon,
  FeedbackIcon,
  ProjectsIcon,
  StarIcon,
  SyncIcon,
  TiersIcon,
  WrenchIcon,
} from '@sanity/icons';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
const SITE_DATA_ID = 'site-data';

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Données du site')
        .icon(DatabaseIcon)
        .child(
          S.document()
            .schemaType('data')
            .documentId(SITE_DATA_ID)
            .title('Données du site')
        ),
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
      orderableDocumentListDeskItem({
        type: 'service',
        title: 'SERVICE',
        icon: WrenchIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'compatibility',
        title: 'COMPATIBILITY',
        icon: SyncIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'testimonial',
        title: 'TESTIMONIAL',
        icon: FeedbackIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'awards',
        title: 'AWARDS',
        icon: DiamondIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'values',
        title: 'VALUES',
        icon: StarIcon,
        S,
        context,
      }),
    ]);
