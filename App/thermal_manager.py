class ThermalManagementSystem:
    def __init__(self, max_temp=45.0, cooling_rate=0.7, heating_rate=0.4):
        self.max_temp = max_temp
        self.cooling_rate = cooling_rate
        self.heating_rate = heating_rate
        self.cooling_system_active = False

    def check_temperature(self, temp):
        self.cooling_system_active = temp >= self.max_temp

    def manage_temperature(self, temp):
        self.check_temperature(temp)
        if self.cooling_system_active:
            temp -= self.cooling_rate  # Cool down
        else:
            temp += self.heating_rate  # Warm up
        return round(temp, 2)


