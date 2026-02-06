const fs = require('fs/promises');

async function healthMetricsCounter(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const healthData = JSON.parse(data);
        console.log('Success! Found your health data!');
        console.log('Total health entries:', healthData.metrics.length);
        } 
    catch(error) {
    	if (error.code === 'ENOENT') 
            { console.log('File not found - check the file path'); } 
        else if (error.name === 'SyntaxError') 
            { console.log('❌ Invalid JSON - check the file format'); } 
        else 
            { console.log('❌ Unknown error:', error.message); } 
        return null;
    }

}

healthMetricsCounter('./data/health-metrics.json');

module.exports = { healthMetricsCounter }