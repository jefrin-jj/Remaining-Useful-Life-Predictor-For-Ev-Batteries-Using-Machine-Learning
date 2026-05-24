from django.urls import path
from .views import *

urlpatterns =[
    path('',home,name='home'),
    path('vehicle-detail',vehicle,name='vehicle-detail'),
    path('vehicles',vehicles,name='vehicles'),
    path('predict',predict_battery_life, name='predict_battery_life'),
    path('register',register,name='register'),
    path('vehicle_list', vehicle_list, name='vehicle_list'),
    path('thermal-monitoring/',thermal_monitoring_view, name='thermal_monitoring'),
    path('map/',map,name='map'),
]