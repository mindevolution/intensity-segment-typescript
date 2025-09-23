import IntensitySegments from './IntensitySegments';
import Helper from './helper';

const segments = new IntensitySegments();

let result = `
const segments = new IntensitySegments();
segments.toString(); // Should be "[]"
>> result: ${segments.toString()}
`

segments.add(10, 30, 1);

result += `
segments.add(10, 30, 1);
segments.toString(); // Should be: "[[10,1],[30,0]]"
>> result: ${segments.toString()}
`;

Helper.display(result);