// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Form Submission
    const vehicleRegistrationForm = document.getElementById('vehicleRegistrationForm');
    if (vehicleRegistrationForm) {
        vehicleRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                ownerName: document.getElementById('ownerName').value,
                contactNumber: document.getElementById('contactNumber').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                vehicleNumber: document.getElementById('vehicleNumber').value,
                make: document.getElementById('make').value,
                model: document.getElementById('model').value,
                year: document.getElementById('year').value,
                color: document.getElementById('color').value,
                vin: document.getElementById('vin').value,
                batteryCapacity: document.getElementById('batteryCapacity').value,
                batteryType: document.getElementById('batteryType').value,
                range: document.getElementById('range').value,
                motorType: document.getElementById('motorType').value,
                motorPower: document.getElementById('motorPower').value,
                chargingType: document.getElementById('chargingType').value,
                maxChargingRate: document.getElementById('maxChargingRate').value,
                odometer: document.getElementById('odometer').value,
                batteryHealth: document.getElementById('batteryHealth').value,
                lastServiceDate: document.getElementById('lastServiceDate').value,
                softwareVersion: document.getElementById('softwareVersion').value,
                purchaseDate: document.getElementById('purchaseDate').value,
                notes: document.getElementById('notes').value
            };
            
            // Convert to JSON
            const jsonData = JSON.stringify(formData, null, 2);
            console.log('Form Data (JSON):', jsonData);
            
            // In a real application, you would send this data to the server
            // For demo purposes, we'll show an alert and redirect
            alert('Vehicle registered successfully!');
            
            // Redirect to vehicles page
            window.location.href = 'vehicles.html';
        });
    }
    
    // Vehicle Search Functionality
    const searchVehicle = document.getElementById('searchVehicle');
    if (searchVehicle) {
        searchVehicle.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const vehicleCards = document.querySelectorAll('.vehicle-card');
            
            vehicleCards.forEach(card => {
                const vehicleName = card.querySelector('.card-title').textContent.toLowerCase();
                const vehicleNumber = card.querySelector('.card-subtitle').textContent.toLowerCase();
                const ownerName = card.querySelector('.vehicle-info p:first-child').textContent.toLowerCase();
                
                if (vehicleName.includes(searchTerm) || 
                    vehicleNumber.includes(searchTerm) || 
                    ownerName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Battery Prediction Functionality
    const predictBatteryBtn = document.getElementById('predictBatteryBtn');
    const predictBatteryBtnInTab = document.getElementById('predictBatteryBtnInTab');
    const batteryPredictionModal = document.getElementById('batteryPredictionModal');
    
    if (predictBatteryBtn) {
        predictBatteryBtn.addEventListener('click', function() {
            // Show the modal
            const bsModal = new bootstrap.Modal(batteryPredictionModal);
            bsModal.show();
            
            // Simulate prediction process
            simulateBatteryPrediction();
        });
    }
    
    if (predictBatteryBtnInTab) {
        predictBatteryBtnInTab.addEventListener('click', function() {
            // Hide the prompt and show the results
            document.getElementById('batteryPredictionPrompt').classList.add('d-none');
            document.getElementById('batteryPredictionResult').classList.remove('d-none');
            
            // Initialize the chart
            initBatteryPredictionChart();
        });
    }
    
    // Function to simulate battery prediction process
    function simulateBatteryPrediction() {
        const predictionSpinner = document.getElementById('predictionSpinner');
        const predictionStatus = document.getElementById('predictionStatus');
        const predictionResults = document.getElementById('predictionResults');
        const downloadReportBtn = document.getElementById('downloadReportBtn');
        
        // Simulate loading
        setTimeout(() => {
            predictionStatus.textContent = 'Analyzing historical data...';
        }, 1000);
        
        setTimeout(() => {
            predictionStatus.textContent = 'Calculating degradation patterns...';
        }, 2000);
        
        setTimeout(() => {
            predictionStatus.textContent = 'Generating prediction model...';
        }, 3000);
        
        // Show results after 4 seconds
        setTimeout(() => {
            predictionSpinner.classList.add('d-none');
            predictionStatus.classList.add('d-none');
            predictionResults.classList.remove('d-none');
            downloadReportBtn.disabled = false;
            
            // Initialize the degradation chart
            initDegradationChart();
        }, 4000);
    }
    
    // Function to initialize the battery prediction chart
    function initBatteryPredictionChart() {
        const ctx = document.getElementById('batteryPredictionChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Now', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years'],
                    datasets: [{
                        label: 'Projected Battery Capacity (%)',
                        data: [90, 87, 84, 81, 78, 75, 72, 69, 66],
                        borderColor: '#0d6efd',
                        backgroundColor: 'rgba(13, 110, 253, 0.1)',
                        borderWidth: 2,
                        tension: 0.1,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Capacity: ${context.raw}%`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            min: 50,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Battery Capacity (%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Function to initialize the degradation chart in the modal
    function initDegradationChart() {
        const ctx = document.getElementById('degradationChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Now', '1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years'],
                    datasets: [{
                        label: 'Projected Battery Capacity (%)',
                        data: [90, 87, 84, 81, 78, 75, 72, 69, 66],
                        borderColor: '#0d6efd',
                        backgroundColor: 'rgba(13, 110, 253, 0.1)',
                        borderWidth: 2,
                        tension: 0.1,
                        fill: true
                    },
                    {
                        label: 'Optimal Usage Scenario (%)',
                        data: [90, 88, 86, 84, 82, 80, 78, 76, 74],
                        borderColor: '#198754',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.1,
                        fill: false
                    },
                    {
                        label: 'Heavy Usage Scenario (%)',
                        data: [90, 85, 80, 75, 70, 65, 60, 55, 50],
                        borderColor: '#dc3545',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.1,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Capacity: ${context.raw}%`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            min: 40,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Battery Capacity (%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time'
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Download Report Button
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', function() {
            alert('Report download functionality would be implemented here.');
            // In a real application, this would generate a PDF report
        });
    }
    
    // Get URL parameters for vehicle details page
    function getVehicleIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
    
    // Load vehicle details if on the vehicle details page
    const vehicleDetailsPage = document.getElementById('vehicleDetailsTabsContent');
    if (vehicleDetailsPage) {
        const vehicleId = getVehicleIdFromUrl();
        if (vehicleId) {
            console.log(`Loading details for vehicle ID: ${vehicleId}`);
            // In a real application, you would fetch the vehicle data from the server
            // For demo purposes, we're using the static HTML content
        }
    }

    // Initialize Bootstrap's Modal component
    const bootstrap = window.bootstrap;
});