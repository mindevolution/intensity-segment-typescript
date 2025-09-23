import IntensitySegments from '../src/IntensitySegments';

describe('Intensity segments test', () => {
    it('should initilized correctly', () => {
        const setments = new IntensitySegments();
        expect(setments.toString()).toEqual('[]');
    });

    it('should add correctly', () => {
        const intensity = new IntensitySegments();
        const result = intensity.add(10, 30, 1);
    });
});
