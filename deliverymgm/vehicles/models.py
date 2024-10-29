from django.db import models

from django.db import models

from components.models import BaseMixin, Component

class Vehicle(BaseMixin):
    customer_name = models.CharField(max_length=200)
    vehicle_number = models.CharField(max_length=50)
    issues = models.CharField(max_length=500)
    date = models.DateField(null=False, auto_now_add=True)
    final_amount = models.FloatField(default=0.0, null=False)
    payment_recieved = models.BooleanField(default=True, null=False)

    def __str__(self):
        return self.customer_name

    
class ServiceDetail(BaseMixin):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null=False, blank=False, related_name='service_detail_vehicle')
    component = models.ForeignKey(Component, on_delete=models.CASCADE, null=False, blank=False, related_name='service_detail_component')
    component_type = models.CharField(max_length=20,null=False)
    amount = models.FloatField(default=0.0, null=False)

    def __str__(self):
        return self.component.name