var countdownInterval;
var countdownAudio = document.getElementById('countdown-audio');
var progressElement = document.getElementById('progress');
var countdownDuration;

// Function to customize the countdown timer
function customizeCountdown() {
    // Clear existing interval to prevent multiple countdowns running simultaneously
    clearInterval(countdownInterval);

    // Get the user-inputted countdown date
    var eventDateInput = document.getElementById("event-date");
    var countdownDate = new Date(eventDateInput.value).getTime();

    // Get the user-inputted event name
    var eventNameInput = document.getElementById("event-name");
    var eventName = eventNameInput.value.trim() || "Event";

    // Get the user-inputted end message
    var endMessageInput = document.getElementById("end-message");
    var endMessage = endMessageInput.value.trim() || "HAPPY EVENT!";

    // Display additional information
    displayAdditionalInfo(eventName, countdownDate);
    
    // Update the countdown every second
    countdownDuration = countdownDate - Date.now();

    // Update the countdown every second
    countdownInterval = setInterval(function() {
        var now = new Date().getTime();
        var distance = countdownDate - now;
        var percentage = (1 - distance / countdownDuration) * 100;

        // If the countdown is over, display the custom end message and play sound effect
        if (distance <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = endMessage;
            countdownAudio.play(); // Play sound effect
        } else {
            // Calculate days, hours, minutes, and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the countdown
            var countdownText = '';
            if (days > 0) {
                countdownText += days + "d ";
            }
            countdownText += hours + "h " + minutes + "m " + seconds + "s until " + eventName;
            document.getElementById("countdown").innerHTML = countdownText;
            
            // Update progress bar
            progressElement.style.width = percentage + "%";
        }
    }, 1000);
}

// Function to pause the countdown timer
function pauseCountdown() {
    clearInterval(countdownInterval);
}

// Function to stop the countdown timer
function stopCountdown() {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML = "Countdown Stopped";
    document.getElementById("additional-info").innerHTML = ""; // Clear additional info
}

// Function to display additional information
function displayAdditionalInfo(eventName, countdownDate) {
    var eventDate = new Date(countdownDate);
    var eventDateString = "Event Date: " + eventDate.toDateString();
    var eventTimeString = "Event Time: " + eventDate.toLocaleTimeString();
    var timeZoneString = "Time Zone: " + Intl.DateTimeFormat().resolvedOptions().timeZone;

    var additionalInfo = eventDateString + "<br>" + eventTimeString + "<br>" + timeZoneString;
    document.getElementById("additional-info").innerHTML = additionalInfo;
}