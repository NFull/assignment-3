const path = require('path');
const fs = require('fs');
const { workoutCalculator } = require('../workoutReader.js');

describe('workoutCalculator', () => {
    test('reads workouts CSV file', async () => {
        const file = path.join(__dirname, '..', 'data', 'workouts.csv');
        const result = await workoutCalculator(file);
        expect(result).not.toBeNull();
        expect(result.totalWorkouts).toBe(10);
        expect(result.totalMinutes).toBe(330);
    });

    test('returns null when file is not found', async () => {
        const missing = path.join(__dirname, '..', 'data', 'missing.csv');
        const result = await workoutCalculator(missing);
        expect(result).toBeNull();
    });
});