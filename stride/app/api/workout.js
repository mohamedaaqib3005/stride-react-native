const BASE_URL = "https://guava-3a7j.onrender.com";

export async function startWorkout() {

  try {
    const result = await fetch(`${BASE_URL}/api/workouts`, {  // wait for network response
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "created_at": "2026-03-10T11:32:02.920Z"
      })
    });




    if (!result.ok) {
      throw new Error("Request failed")
    }
    console.log("Raw response:", result);

    const data = await result.json();

    console.log("Parsed JSON:", data); //wait for body parsing

    return data;
  }
  catch (error) {
    console.error("API error", error)
  }
}

// startWorkout();

// Creates an HTTP request
//  Sends it to the server
// Returns a Promise with the response



export async function stopWorkout() {
  try {
    const result = await fetch(`${BASE_URL}/api/workouts/{workout_id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })

    if (!result.ok) {
      throw new Error("Request failed")
    }

    console.log("Raw response", result)

    const data = await result.json()
    console.log("parsedData", data)

  }
  catch (error) {
    console.error("API error", error)
  }



}


// stopWorkout()

