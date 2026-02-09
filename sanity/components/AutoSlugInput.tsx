'use client';

import { useEffect, useRef } from 'react';
import type { SlugInputProps } from 'sanity';
import { set, useFormValue } from 'sanity';

/**
 * Auto-generates slug from multiple source fields.
 */
export function AutoSlugInput(props: SlugInputProps) {
  const { value, onChange, renderDefault, schemaType } = props;

  const sourceOption = schemaType.options?.source;
  let sourceFields: string[];

  if (Array.isArray(sourceOption)) {
    sourceFields = sourceOption.filter((field): field is string => typeof field === 'string');
  } else if (typeof sourceOption === 'string') {
    sourceFields = [sourceOption];
  } else {
    sourceFields = ['name'];
  }

  const fieldValues = sourceFields.map((fieldName): string | undefined => {
    const value = useFormValue([fieldName]);
    return typeof value === 'string' ? value : undefined;
  });

  const previousValuesRef = useRef<(string | undefined)[]>([]);
  const userModifiedRef = useRef(false);

  useEffect(() => {
    const hasValues = fieldValues.some((val) => val);
    if (!hasValues) return;

    const previousValues = previousValuesRef.current;
    const valuesChanged = fieldValues.some((val, idx) => val !== previousValues[idx]);

    if (value?.current && previousValues.length > 0 && valuesChanged) {
      const expectedSlug = previousValues
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (value.current !== expectedSlug) {
        userModifiedRef.current = true;
      }
    }

    if (hasValues && (!value?.current || (!userModifiedRef.current && valuesChanged))) {
      const slug = fieldValues
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      if (slug && slug !== value?.current) {
        onChange(set({ _type: 'slug', current: slug }));
        userModifiedRef.current = false;
      }
    }

    previousValuesRef.current = fieldValues;
  }, [...fieldValues, value, onChange]);

  return renderDefault(props);
}
