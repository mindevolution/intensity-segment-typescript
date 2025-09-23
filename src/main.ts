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

const segments2 = new IntensitySegments();
result +=`
// Another example sequence:
const segments2 = new IntensitySegments();
segments2.toString(); // Should be "[]"
`;
result += `
>> result: ${segments2.toString()}
_________________________________
`;

segments2.add(10, 30, 1);
result +=`
segments2.add(10, 30, 1);
segments2.toString(); // Should be "[[10,1],[30,0]]"
`;
result += `
>> result: ${segments2.toString()}
_________________________________
`


segments2.add(20, 40, 1);
result +=`
segments2.add(20, 40, 1);
segments2.toString(); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
`;
result += `
>> result: ${segments2.toString()}
_________________________________
`

segments2.add(10, 40, -1);
result +=`
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[20,1],[30,0]]"
`;
result += `
>> result: ${segments2.toString()}
_________________________________
`

segments2.add(10, 40, -1);
result +=`
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"
`
result += `
>> result: ${segments2.toString()}
_________________________________
`

Helper.display(result);