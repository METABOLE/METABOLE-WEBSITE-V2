import { type SchemaTypeDefinition } from 'sanity';
import projects from './projects';
import expertise from './expertise';
import bilingualString from './bilingualString';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects, expertise, bilingualString],
};
