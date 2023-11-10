// ==========================================================================================================
// Note
// ==========================================================================================================

// - Callback Hell / Pyramid of Doom: Several nested callbacks

// ==========================================================================================================
// Link
// ==========================================================================================================

// - https://www.freecodecamp.org/news/guide-to-javascript-promises/
// - https://javascript.info/async
// - Promise States:
//      - Pending
//      - Fullfilled
//      - Rejected
// These two are not same (http://disq.us/p/216gne4):
// promise.then(fn1).catch(fn2)
// promise.then(fn1, fn2)
//
// ----------------------------------------------------
// Promise Production (Definition)
// ----------------------------------------------------

// Fetch data from server
const send_request = () => {
    // Promise Definition
    return new Promise((resolve, reject) => {
        // Server response after N seconds
        setTimeout(() => {
            const num = Math.random();
            // Server response successful
            // Promise state: Fullfilled
            if (num > 0.5) {
                resolve(num);
                reject(num); // Ignored. Promise has only one result
            }
            // Server response error
            // Promise state: Rejected
            else {
                reject(num);
            }
            // Server takes 2.5s to respond
        }, 2500);
    });
};

// ----------------------------------------------------
// Promise Consumption (Handling)
// ----------------------------------------------------

// Handle data fetched from server
const handle_response = () => {
    // Promise
    const promise = send_request();
    // Promise Handling Functions
    const resolve_function = (value) => { console.log("Success. Value: ", value); }
    const reject_function = (value) => { console.log("Error. Value: ", value); }
    const final_function = () => { console.log("Cleanup"); }
    // Promise Handling
    promise.then(resolve_function).catch(reject_function).finally(final_function);
    // Ignored: Promise can be consumed only one
    promise.then(resolve_function); // Only handle success
    promise.catch(reject_function); // Only handle error
};

// ----------------------------------------------------
// Other Tasks
// ----------------------------------------------------

const task = (a, t, n) => {
    let counter = 0;
    const id = setInterval(() => {                  // Set Repeater
        counter += 1; console.log(a);
        if (counter >= n) { clearInterval(id); }    // Reset Repeater
    }, t);
};

// ----------------------------------------------------
// Main Task
// ----------------------------------------------------

const main = () => {
    // Fetch data from server asynchronously and react to its promise
    handle_response();
    // Perform other tasks
    task("Task", 200, 24);
};

main();

