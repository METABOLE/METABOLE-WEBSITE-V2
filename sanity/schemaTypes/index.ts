import { type SchemaTypeDefinition } from 'sanity';
import projects from './projects';
import expertise from './expertise';
import bilingualString from './bilingualString';
import service from './service';
import compatibility from './compatibility';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects, expertise, bilingualString, service, compatibility],
};
