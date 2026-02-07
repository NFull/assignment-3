require('dotenv').config();

const { workoutCalculator } = require('./workoutReader');
const { healthMetricsCounter } = require('./healthReader');

async function processFiles() {
	const userName = process.env.USER_NAME;
	const weeklyGoal = parseInt(process.env.WEEKLY_GOAL);

	try{
		console.log('Processing data for:', userName);
		
		console.log('Reading workout data...');
		const workoutMetrics = await workoutCalculator('./data/workouts.csv');

		console.log('Reading health data...');
		const healthMetrics = await healthMetricsCounter('./data/health-metrics.json');

		console.log('\n === SUMMARY ===');
		console.log('Workouts found:', workoutMetrics.totalWorkouts);
		console.log('Total workout minutes:', workoutMetrics.totalMinutes);
		console.log('Health entries found:', healthMetrics.totalEntries);
		console.log('Weekly goal:', weeklyGoal, 'minutes');
		
		if (workoutMetrics.totalMinutes > weeklyGoal) {
			console.log(`Congratulations ${userName}! You have exceeded your weekly goal! `);
		} else if (workoutMetrics.totalMinutes === weeklyGoal) {
			console.log(`Congratulations ${userName}! You met your weekly goal! `);
		} else {
			console.log(`Keep going! You are ${weeklyGoal - workoutMetrics.totalMinutes} minutes away from meeting your weekly goal!`);
		}
	} catch(error) {
    	if (error.code === 'ENOENT') 
            { console.log('File not found - check the file path'); } 
        else if (error.name === 'SyntaxError') 
            { console.log('❌ Invalid JSON - check the file format'); } 
        else 
            { console.log('❌ Unknown error:', error.message); } 
        return null;
    }
}

processFiles();

module.exports = { processFiles }