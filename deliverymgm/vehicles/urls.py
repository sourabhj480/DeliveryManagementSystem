from django.urls import path
from . import views

urlpatterns = [
    path('create', views.create_vehicle, name='create_vehicle'),
    path('revenue/daily', views.revenue_daily, name='daily_revenue'),
    path('revenue/monthly', views.revenue_monthly, name='monthly_revenue'),
    path('revenue/yearly', views.revenue_yearly, name='yearly_revenue'),
]