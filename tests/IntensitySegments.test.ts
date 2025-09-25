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
        expect(segments.sortedKeys(segments.segments)).toEqual([]);

        segments.add(10, 30, 1);
        expect(segments.sortedKeys(segments.segments)).toEqual([10, 30]);

        segments.add(20, 40, 1);
        expect(segments.sortedKeys(segments.segments)).toEqual([10, 20, 30, 40]);

        segments.add(10, 40, -2);
        expect(segments.sortedKeys(segments.segments)).toEqual([10, 20, 30, 40]);
    });

    it('should get the left key', () => {
        expect(segments.sortedKeys(segments.segments)).toEqual([]);

        segments.add(10, 30, 1);
        segments.add(20, 40, 1);
        // Should be "[[10,1],[20,2],[30,1],[40,0]]"
        expect(segments.leftKey(40)).toEqual(30);
        expect(segments.leftKey(50)).toEqual(40);

        segments.add(10, 40, -2);
        // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"
        expect(segments.leftKey(20)).toEqual(10);
        expect(segments.leftKey(10)).toEqual(-1);
    });

    it('should check empty segments correctly', () => {
        expect(segments.isEmptySegments()).toBeTruthy();

        segments.add(10, 30, 1);
        expect(segments.isEmptySegments()).toBeFalsy();
    });

    it('should add new segment correctly', () => {
        segments.add(10, 30, 1);
        const expectedResult = '[[10,1],[30,0]]';

        expect(segments.toString()).toEqual(expectedResult);

        segments.add(20, 40, 1);
        const expectedResult2 = '[[10,1],[20,2],[30,1],[40,0]]';
        expect(segments.toString()).toEqual(expectedResult2);

        segments.add(10, 40, -2);
        const expectedResult3= '[[10,-1],[20,0],[30,-1],[40,0]]';
        expect(segments.toString()).toEqual(expectedResult3);
    });

    it('should add new segment correctly second testing', () => {
        segments.add(10, 30, 1);
        const expectedResult = '[[10,1],[30,0]]';

        expect(segments.toString()).toEqual(expectedResult);

        segments.add(20, 40, 1);
        const expectedResult2 = '[[10,1],[20,2],[30,1],[40,0]]';
        expect(segments.toString()).toEqual(expectedResult2);

        segments.add(10, 40, -1);
        const expectedResult3= '[[20,1],[30,0]]';
        expect(segments.toString()).toEqual(expectedResult3);

        segments.add(10, 40, -1);
        const expectedResult4= '[[10,-1],[20,0],[30,-1],[40,0]]';
        expect(segments.toString()).toEqual(expectedResult4);

        segments.add(-10, 10, 1);
        const expectedResult5= '[[-10,1],[10,-1],[20,0],[30,-1],[40,0]]';
        expect(segments.toString()).toEqual(expectedResult5);

        segments.add(-10, 50, 2);
        const expectedResult6= '[[-10,3],[10,1],[20,2],[30,1],[40,2],[50,0]]';
        expect(segments.toString()).toEqual(expectedResult6);
    });

    it('should add new segment correctly verify', () => {
        segments.add(10, 30, 1);
        let expectedResult = '[[10,1],[30,0]]';

        expect(segments.toString()).toEqual(expectedResult);

        segments.add(10, 30, -1);
        expectedResult = '[]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(0, 30, 1);
        expectedResult = '[[0,1],[30,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(0, 30, 1);
        expectedResult = '[[0,2],[30,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(20, 50, -1);
        expectedResult = '[[0,2],[20,1],[30,-1],[50,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(-10, 30, -1);
        expectedResult = '[[-10,-1],[0,1],[20,0],[30,-1],[50,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(-10, 0, 1);
        expectedResult = '[[0,1],[20,0],[30,-1],[50,0]]';
        expect(segments.toString()).toEqual(expectedResult);
    });

    it('should merged right', () => {
        segments.add(10, 30, 1);
        let expectedResult = '[[10,1],[30,0]]';

        expect(segments.toString()).toEqual(expectedResult);

        segments.add(10, 30, -1);
        expectedResult = '[]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(0, 30, 1);
        expectedResult = '[[0,1],[30,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(0, 30, 1);
        expectedResult = '[[0,2],[30,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(20, 50, -1);
        expectedResult = '[[0,2],[20,1],[30,-1],[50,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(-10, 30, -1);
        expectedResult = '[[-10,-1],[0,1],[20,0],[30,-1],[50,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(-10, 0, 1);
        expectedResult = '[[0,1],[20,0],[30,-1],[50,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(40, 60, 1);
        expectedResult = '[[0,1],[20,0],[30,-1],[40,0],[50,1],[60,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(40, 70, 0);
        expectedResult = '[[0,1],[20,0],[30,-1],[40,0],[50,1],[60,0]]';
        expect(segments.toString()).toEqual(expectedResult);
    });

    it('should merged right', () => {
        segments.add(0, 100, 1);
        let expectedResult = '[[0,1],[100,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(20, 100, 1);
        expectedResult = '[[0,1],[20,2],[100,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(20, 100, -1);
        expectedResult = '[[0,1],[100,0]]';
        expect(segments.toString()).toEqual(expectedResult);

        segments.add(-20, 30, -1);
        expectedResult = '[[-20,-1],[0,0],[30,1],[100,0]]';
        expect(segments.toString()).toEqual(expectedResult);
    });
});
