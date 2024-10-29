from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from components.models import Component
from components.serializers import ComponentSerializer
from rest_framework.parsers import JSONParser

@csrf_exempt
def get_components(request):
    if request.method == 'GET':
        components_data = Component.objects.all()
        component_serializer = ComponentSerializer(components_data, many=True)
        return JsonResponse(component_serializer.data, safe=False, status=200)

@csrf_exempt
def create_component(request):
    if request.method == 'POST':
        component_data = JSONParser().parse(request)
        serializer = ComponentSerializer(data=component_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Component added successfully'}, status=201)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def update_component(request, component_id):
    if request.method == 'PUT':
        try:
            component = Component.objects.get(id=component_id)
        except Component.DoesNotExist:
            return JsonResponse({'error': 'Component not found'}, status=404)
        
        component_data = JSONParser().parse(request)
        serializer = ComponentSerializer(component, data=component_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Component updated successfully'}, status=200)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def delete_component(request, component_id):
    if request.method == 'DELETE':
        try:
            component = Component.objects.get(id=component_id)
            component.delete()
            return JsonResponse({'message': 'Component deleted successfully'}, status=200)
        except Component.DoesNotExist:
            return JsonResponse({'error': 'Component not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)