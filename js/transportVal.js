document.addEventListener("DOMContentLoaded", () => {
    const stationInput = document.querySelector('input[type="number"]');
    
   
    if (stationInput && stationInput.id !== "serviceType") {
        stationInput.addEventListener("input", function() {
            if (this.value < 0) {
                alert("Number of stations or KMs cannot be a negative number!");
                this.value = 1; 
            }
        });
    }
});