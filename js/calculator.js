document.addEventListener("DOMContentLoaded", () => {
    const transportType = document.getElementById("transportType");
    const stationInput = document.getElementById("stations"); 
    const fareOutput = document.getElementById("fareResult"); 

    
    if (transportType && stationInput && fareOutput) {
        const calculateFare = () => {
            
        
            if (stationInput.value < 0) {
                alert("Number of stations or KMs cannot be less than 0!");
                stationInput.value = 0; 
            }

            const type = transportType.value;
            let units = parseInt(stationInput.value) || 0;
            let fare = 0;

            
            if (type === "metro") {
                if (units === 0) fare = 0;
                else if (units <= 9) fare = 8;
                else if (units <= 16) fare = 10;
                else fare = 15;
            } else if (type === "microbus") {
                fare = units * 3.5; 
            } else if (type === "bus") {
               
                if (units > 0) fare = 7; 
                else fare = 0;
            }

            
            fareOutput.textContent = fare.toFixed(2);
        };

    
        transportType.addEventListener("change", calculateFare);
        stationInput.addEventListener("input", calculateFare);
    }
});