const path = require('path');
const fs = require('fs');
const { healthMetricsCounter } = require('../healthReader.js');

describe('healthMetricsCounter', () => {
    test('reads health-metrics JSON file', async () => {
        const file = path.join(__dirname, '..', 'data', 'health-metrics.json');
        const data = await healthMetricsCounter(file);
        expect(data).not.toBeNull();
        expect(data.totalEntries).toBe(8);
    });

    test('returns null when file is not found', async () => {
        const missing = path.join(__dirname, '..', 'data', 'missing.json');
        const data = await healthMetricsCounter(missing);
        expect(data).toBeNull();
    });
});