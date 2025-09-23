import IntensitySegments from './IntensitySegments';
import Helper from './helper';

const segments = new IntensitySegments();

const result = `
const segments = new IntensitySegments();
segments.toString(); // Should be "[]"

>>> result: ${segments.toString()}
`;

Helper.display(result);