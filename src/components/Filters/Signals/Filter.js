import { signal } from '@preact/signals-react';
import { ConstructionTypes } from './../Constants/Construction';
import { min } from 'date-fns';

export const CONSTRUCTION_TYPE_FILTER = 'constructionType';
export const PERMIT_DATE_FILTER = 'permitDate';
export const END_DATE_FILTER = 'endDate';
export const BUILD_VALUE_FILTER = 'buildValue';
export const BUILDER_ONLY_FILTER = 'builderOnly';


export const Filters = {
    [CONSTRUCTION_TYPE_FILTER]: signal(ConstructionTypes),
    [PERMIT_DATE_FILTER]: signal(null),
    [END_DATE_FILTER]: signal(null),
    [BUILD_VALUE_FILTER]: { min: signal(0), max: signal(0) },
    [BUILDER_ONLY_FILTER]: signal(false)
};