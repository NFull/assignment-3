const fs = require('fs');
const csv = require('csv-parser');

async function readWorkoutData(filepath) {
    return new Promise((resolve, reject) => {
        const results = [];
        let stream;
        try {
            stream = fs.createReadStream(filepath);
        } catch (err) {
            return reject(err);
        }

        stream
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function workoutCalculator(filepath) {
    try {
        if (!fs.existsSync(filepath)) {
            throw Object.assign(new Error('File not found'), { code: 'ENOENT' });
        }
        const workoutData = await readWorkoutData(filepath); 
        let totalWorkouts = workoutData.length; 
        let totalMinutes = 0; 
        for (let i = 0; i < workoutData.length; i++) 
        { 
        const workout = workoutData[i]; 
        totalMinutes += 
        parseFloat(workout.duration); 
        }

        console.log('Total workouts:', totalWorkouts);
        console.log('Total minutes:', totalMinutes);
        return { totalWorkouts, totalMinutes };
    } catch(error) {
    	if (error.code === 'ENOENT') 
            { console.log('❌ CSV file not found check the file path'); } 
        else 
            { console.log('❌ Error processing CSV file:', error.message); } 
        return null;
    }

}

module.exports = { workoutCalculator }