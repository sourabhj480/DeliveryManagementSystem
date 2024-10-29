from rest_framework import serializers
from .models import Vehicle, ServiceDetail

class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceDetail
        fields = ['component', 'component_type', 'amount']

class VehicleSerializer(serializers.ModelSerializer):
    service_details = ServiceDetailSerializer(many=True)

    class Meta:
        model = Vehicle
        fields = ['customer_name', 'vehicle_number', 'issues', 'date', 'final_amount', 'service_details']

    def create(self, validated_data):
        service_details_data = validated_data.pop('service_details')
        vehicle = Vehicle.objects.create(**validated_data)
        for service_detail_data in service_details_data:
            ServiceDetail.objects.create(vehicle=vehicle, **service_detail_data)
        return vehicle