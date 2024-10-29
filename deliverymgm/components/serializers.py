from rest_framework import serializers

from components.models import Component

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'name','description','repair_price', 'new_component_price']