import { type SchemaTypeDefinition } from 'sanity';
import projects from './projects';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects],
};
