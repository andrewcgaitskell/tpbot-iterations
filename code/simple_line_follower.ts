function trackThinLine () {
    if (TPBot.trackLine(TPBot.TrackingState.L_R_unline)) {
        TPBot.setTravelTime(TPBot.DriveDirection.Backward, 40, 0.2)
        TPBot.setTravelTime(TPBot.DriveDirection.Right, 20, 0.2)
    } else if (TPBot.trackLine(TPBot.TrackingState.L_R_line)) {
        TPBot.setTravelTime(TPBot.DriveDirection.Forward, 15, 0.1)
    } else if (TPBot.trackLine(TPBot.TrackingState.L_unline_R_line)) {
        TPBot.setTravelTime(TPBot.DriveDirection.Right, 15, 0.1)
    } else if (TPBot.trackLine(TPBot.TrackingState.L_line_R_unline)) {
        TPBot.setTravelTime(TPBot.DriveDirection.Left, 15, 0.1)
    } else {
        TPBot.setTravelTime(TPBot.DriveDirection.Backward, 40, 0.2)
    }
}

basic.forever(function () {
    trackThinLine()
})
