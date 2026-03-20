const BASE_URL = "https://guava-3a7j.onrender.com";

export async function startWorkout() {


  try {
    const result = await fetch(`${BASE_URL}/api/workouts`,  // wait for network response
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "started_at": (new Date().toISOString())
        })
      });



    if (!result.ok) {
      throw new Error("Request failed")
    }
    console.log("Raw response:", result);

    const data = await result.json();// converts stream → text → parse JSON → object

    console.log("Parsed JSON:", data); //wait for body parsing

    return data;
  }
  catch (error) {
    console.error("API error", error);
    return null;

  }
}


// startWorkout();

// Creates an HTTP request
//  Sends it to the server
// Returns a Promise with the response

export async function stopWorkout(workout_id) {

  try {
    console.log(`stopping for ${workout_id}`)
    console.log("date", new Date())

    const result = await fetch(`${BASE_URL}/api/workouts/${workout_id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "status": "stop",
        modified_at: (new Date().toISOString())
      })
    })
    console.log("result", result);
    console.log("HTTP status", result.status);

    const text = await result.text();
    console.log("response", text);
    return text;

  } catch (error) {
    console.log("api error", error)
    return null;
  }
}




// stopWorkout()

