import IntensitySegments from '../src/IntensitySegments';

describe('Intensity segments test', () => {
    let segments: IntensitySegments;

    beforeEach(() => {
        segments = new IntensitySegments();
    });

    it('should initilized correctly', () => {
        expect(segments.toString()).toEqual('[]');
    });

    it('should get the sorted keys', () => {
        expect(segments.keys()).toEqual([]);

        segments.add(10, 30, 1);
        expect(segments.keys()).toEqual([10, 30]);

        segments.add(20, 40, 1);
        expect(segments.keys()).toEqual([10, 20, 30, 40]);

        segments.add(10, 40, -2);
        expect(segments.keys()).toEqual([10, 20, 30, 40]);
    });

    it('should add new segment correctly', () => {
        segments.add(10, 30, 1);
        const expectedResult = '[[10,1],[30,0]]';

        expect(segments.toString()).toEqual(expectedResult);

        segments.add(20, 40, 1);
        const expectedResult2 = '[[10,1],[20,2],[30,1],[40,0]]';
        // expect(segments.toString()).toEqual(expectedResult2);
    });
});
