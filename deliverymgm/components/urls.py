from django.urls import path, re_path
from . import views

urlpatterns = [
    path('get', views.get_components),
    path('create', views.create_component, name='create_component'),
    path('update/<int:component_id>', views.update_component, name='update_component'),
    path('delete/<int:component_id>', views.delete_component, name='delete_component'),

]