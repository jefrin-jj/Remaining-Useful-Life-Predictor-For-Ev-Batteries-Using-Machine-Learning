from django.shortcuts import render,redirect

def home(request):
    return render(request,'index.html',{})

def vehicle(request):
    return render(request,'vehicle-details.html',{})

def vehicles(request):
    return render(request,'vehicles.html',{})

import numpy as np
import joblib
from django.shortcuts import render

# Load the trained model
model = joblib.load('battery_rul_percentage_model.pkl')

def predict_battery_life(request):
    result = None
    if request.method == 'POST':
        try:
            # Get values from POST (no forms, just raw POST data)
            cycle_index = float(request.POST.get('cycle_index'))
            discharge_time = float(request.POST.get('discharge_time'))
            decrement = float(request.POST.get('decrement'))
            max_voltage_dischar = float(request.POST.get('max_voltage_dischar'))
            min_voltage_charg = float(request.POST.get('min_voltage_charg'))
            time_415v = float(request.POST.get('time_415v'))
            time_constant_current = float(request.POST.get('time_constant_current'))
            charging_time = float(request.POST.get('charging_time'))

            # Prepare input
            input_data = np.array([[cycle_index, discharge_time, decrement,
                                    max_voltage_dischar, min_voltage_charg,
                                    time_415v, time_constant_current, charging_time]])

            # Predict
            prediction = model.predict(input_data)
            result = f"Predicted Battery Life: {prediction[0]:.2f}%"
        except Exception as e:
            result = f"Error in prediction: {str(e)}"

    return render(request, 'predict.html', {'result': result})

from .models import Vehicle

from django.shortcuts import render, redirect
from .models import Vehicle

def register(request):
    if request.method == 'POST':
        Vehicle.objects.create(
            owner_name=request.POST.get('ownerName'),
            contact_number=request.POST.get('contactNumber'),
            email=request.POST.get('email'),
            address=request.POST.get('address'),

            vehicle_number=request.POST.get('vehicleNumber'),
            make=request.POST.get('make'),
            model=request.POST.get('model'),
            year=request.POST.get('year'),
            color=request.POST.get('color'),
            vin=request.POST.get('vin'),

            battery_capacity=request.POST.get('batteryCapacity'),
            battery_type=request.POST.get('batteryType'),
            range_km=request.POST.get('range'),

            motor_type=request.POST.get('motorType'),
            motor_power=request.POST.get('motorPower'),
            charging_type=request.POST.get('chargingType'),
            max_charging_rate=request.POST.get('maxChargingRate'),

            odometer=request.POST.get('odometer'),
            battery_health=request.POST.get('batteryHealth'),
            last_service_date=request.POST.get('lastServiceDate') or None,
            software_version=request.POST.get('softwareVersion'),
            purchase_date=request.POST.get('purchaseDate'),

            notes=request.POST.get('notes')
        )
        return redirect('vehicle_list')
    return render(request, 'register.html')

def vehicle_list(request):
    vehicles = Vehicle.objects.all()
    return render(request, 'vehicle_list.html', {'vehicles': vehicles})


# ev_app/views.py
# ev_app/views.py
from django.shortcuts import render
from .thermal_manager import ThermalManagementSystem

def thermal_monitoring_view(request):
    if request.method == 'POST':
        initial_temp = float(request.POST.get('temperature'))
        current_temp = initial_temp
        thermal = ThermalManagementSystem()

        log = []

        for minute in range(10):  # Simulate 10 minutes
            thermal.check_temperature(current_temp)
            status = "Cooling Active" if thermal.cooling_system_active else "Normal"

            log.append({
                'minute': minute,
                'temperature': round(current_temp, 2),
                'status': status
            })

            current_temp = thermal.manage_temperature(current_temp)

        context = {
            'initial': initial_temp,
            'final': current_temp,
            'log': log,
            'chart_data': [entry['temperature'] for entry in log],
            'status_data': [entry['status'] for entry in log]
        }

        return render(request, 'thermal_monitoring.html', context)

    return render(request, 'thermal_monitoring.html')

def map(request):
    return render(request,'map.html',{})