/* Written by Connor Maloney - connormaloney@cmail.carleton.ca

Find all route_id's based on title of stop 
Example:
    IN: Grand Central
    OUT: 6, 7, 9
*/
const fs = require('fs');
const readline = require('readline');

// Setup terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Grab all stop data from stops.tx and put it into array
const stopsData = fs.readFileSync("GTFS/stops.txt").toString('utf-8').split("\n");

// Grab user input for stop they would like to search for, then write routes for that stop to my_routes.txt
rl.question('What stop would you like to look for? ', (answer) => {
    const myRoutes = grabRoutesForStop(answer);
    console.log(myRoutes);

    fs.writeFile("my_routes.txt", 'route_id\n' + [...myRoutes].join('\n'), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Routes saved to file.");
    }); 
    rl.close();
});

// Grab routes based on stop name
function grabRoutesForStop(stopName) {
        console.log('You have selected: ' + stopName);

        // Find stop id's that have stopName in them
        const routesFound = new Set();
        for (var i in stopsData) {
            if (stopsData[i].toLowerCase().includes(stopName.toLowerCase())) {

                // If route found has a 9, switch to GS as this is the route id for shuttle between Grand Central and Times Square
                if (stopsData[i].charAt(0) == '9') {
                    routesFound.add('GS')
                }

                else {
                    routesFound.add(stopsData[i].charAt(0)) // Only grab first character of stop_id, as this specifies route_id
                }
            }
        }
        return routesFound;
}

