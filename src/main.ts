import IntensitySegments from './IntensitySegments';
import Helper from './helper';

const segments = new IntensitySegments();

let result = `
const segments = new IntensitySegments();
segments.toString(); // Should be "[]"
>> result: ${segments.toString()}
_________________________________
`


result += `
segments.add(10, 30, 1);
segments.toString(); // Should be: "[[10,1],[30,0]]"
`;
segments.add(10, 30, 1);
result += `
>> result: ${segments.toString()}
_________________________________
`

result += `
segments.add(20, 40, 1);
segments.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
`;
segments.add(20, 40, 1);
result += `
>> result: ${segments.toString()}
_________________________________
`

Helper.display(result);