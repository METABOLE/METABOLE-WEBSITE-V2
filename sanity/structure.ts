import {
  DatabaseIcon,
  DiamondIcon,
  DocumentIcon,
  FeedbackIcon,
  ProjectsIcon,
  StarIcon,
  SyncIcon,
  TiersIcon,
  UserIcon,
  WrenchIcon,
} from '@sanity/icons';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
const SITE_DATA_ID = 'site-data';

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('WEBSITE')
    .items([
      S.divider().title('GENERAL'),
      S.listItem()
        .title('DONNÉES DU SITE')
        .icon(DatabaseIcon)
        .child(S.document().schemaType('data').documentId(SITE_DATA_ID).title('Données du site')),
      orderableDocumentListDeskItem({
        type: 'projects',
        title: 'PROJECT',
        icon: ProjectsIcon,
        S,
        context,
      }),
      S.divider().title('HOME'),
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
      S.divider().title('ABOUT'),
      orderableDocumentListDeskItem({
        type: 'values',
        title: 'VALUES',
        icon: StarIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'team',
        title: 'TEAM',
        icon: UserIcon,
        S,
        context,
      }),
      S.divider().title('SEO'),
      S.listItem()
        .title('PAGE SEO')
        .icon(DocumentIcon)
        .child(S.documentTypeList('seoPage').title('Pages SEO')),
      S.listItem()
        .title('ARTICLE DE BLOG')
        .icon(DocumentIcon)
        .child(S.documentTypeList('blogPost').title('Articles de blog')),
    ]);
