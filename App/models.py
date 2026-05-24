from django.db import models

# Create your models here.

from django.db import models

class Vehicle(models.Model):
    # Owner Info
    owner_name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField(blank=True)
    address = models.TextField()

    # Vehicle Info
    vehicle_number = models.CharField(max_length=20)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    color = models.CharField(max_length=30, blank=True)
    vin = models.CharField(max_length=50)

    # Battery & Technical
    battery_capacity = models.FloatField()
    battery_type = models.CharField(max_length=100)
    range_km = models.FloatField()
    motor_type = models.CharField(max_length=50)
    motor_power = models.FloatField()
    charging_type = models.CharField(max_length=30)
    max_charging_rate = models.FloatField(blank=True, null=True)
    odometer = models.FloatField()
    battery_health = models.FloatField(blank=True, null=True)
    last_service_date = models.DateField(blank=True, null=True)
    software_version = models.CharField(max_length=100, blank=True)
    purchase_date = models.DateField()

    # Notes
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.vehicle_number} - {self.owner_name}"
