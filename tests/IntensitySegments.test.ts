import { IntensitySegments } from '../src/IntensitySegments';

describe('greet function', () => {
  it('should return a greeting with the given name', () => {
    const intensity = new IntensitySegments();
    const result = intensity.add(3, 5);
    expect(result).toEqual(8);
  });
});
