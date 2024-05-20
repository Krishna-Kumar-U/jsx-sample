import { signal } from '@preact/signals-react';
import { ConstructionTypes } from './../Constants/Construction';

export const Filters = signal({
    constructionType: ConstructionTypes,
    permitDate: null,
    endDate: null,
    builderOnly: false
});