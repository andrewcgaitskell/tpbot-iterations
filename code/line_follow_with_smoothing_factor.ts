let Kp = 0.2 // Proportional constant for adjustment
let smoothingFactor = 0.7 // Smoothing factor for error (between 0 and 1)
let smoothError = 0 // Variable to store the smoothed error
let error = 0 // Variable to store the current error

// Background task to read sensor values and update error
control.inBackground(function () {
    while (true) {
        // Check sensor states and calculate the error
        if (TPBot.trackLine(TPBot.TrackingState.L_unline_R_line)) {
            error = 1 // Slight deviation to the left
        } else if (TPBot.trackLine(TPBot.TrackingState.L_line_R_unline)) {
            error = -1 // Slight deviation to the right
        } else if (TPBot.trackLine(TPBot.TrackingState.L_R_unline)) {
            error = 2 // Major deviation (off the line completely)
        } else if (TPBot.trackLine(TPBot.TrackingState.L_R_line)) {
            error = 0 // On track
        }

        // Smooth the error by blending it with the previous smoothed value
        smoothError = (smoothingFactor * smoothError) + ((1 - smoothingFactor) * error)

        basic.pause(10) // Pause to avoid excessive polling
    }
})

// Main loop to apply proportional control based on the smoothed error
basic.forever(function () {
    // Calculate the correction using the smoothed error
    let correction = Kp * smoothError

    // Apply the correction
    if (smoothError == 0) {
        // Move straight if on track
        TPBot.setTravelSpeed(TPBot.DriveDirection.Forward, 30)
    } else {
        // Adjust turning if off track
        if (smoothError > 0) {
            // Turn right
            TPBot.setTravelSpeed(TPBot.DriveDirection.Right, 30 + correction)
        } else {
            // Turn left
            TPBot.setTravelSpeed(TPBot.DriveDirection.Left, 30 - correction)
        }
    }

    basic.pause(20) // Main loop pause for smoother operation
})
