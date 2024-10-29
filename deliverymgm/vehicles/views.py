from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Vehicle
from .serializers import VehicleSerializer
from datetime import datetime,timedelta, date
from django.utils.timezone import now
from django.db.models.functions import TruncDay, TruncMonth, TruncYear

from django.db.models import Sum

@api_view(['POST'])
def create_vehicle(request):
    serializer = VehicleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("Invoice Is Created", status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def revenue_daily(request):
    end_date = now().date()
    start_date = end_date - timedelta(days=6)

    daily_revenue = (
        Vehicle.objects.filter(date__range=(start_date, end_date))
        .annotate(day=TruncDay('date'))
        .values('day')
        .annotate(total_revenue=Sum('final_amount'))
        .order_by('day')
    )

    date_to_revenue = {entry['day']: entry['total_revenue'] for entry in daily_revenue}
    result = [
        {'day': (start_date + timedelta(days=i)), 'total_revenue': date_to_revenue.get(start_date + timedelta(days=i), 0)}
        for i in range(7)
    ]

    return Response(result)


@api_view(['GET'])
def revenue_monthly(request):
    end_date = now().date()
    start_date = end_date - timedelta(days=180)

    monthly_revenue = (
        Vehicle.objects.filter(date__gte=start_date)
        .annotate(month=TruncMonth('date'))
        .values('month')
        .annotate(total_revenue=Sum('final_amount'))
        .order_by('month')
    )

    current_month = end_date.month
    current_year = end_date.year
    months = [(current_year, current_month - i) for i in range(6)]
    month_to_revenue = {entry['month']: entry['total_revenue'] for entry in monthly_revenue}
    result = [
        {
            'month': date(year=year, month=month, day=1),
            'total_revenue': month_to_revenue.get(date(year=year, month=month, day=1), 0)
        }
        for year, month in months
    ]

    return Response(result)


@api_view(['GET'])
def revenue_yearly(request):
    end_date = now().date()
    start_year = end_date.year - 4

    yearly_revenue = (
        Vehicle.objects.filter(date__year__gte=start_year)
        .annotate(year=TruncYear('date'))
        .values('year')
        .annotate(total_revenue=Sum('final_amount'))
        .order_by('year')
    )

    year_to_revenue = {entry['year'].year: entry['total_revenue'] for entry in yearly_revenue}
    result = [
        {'year': year, 'total_revenue': year_to_revenue.get(year, 0)}
        for year in range(start_year, end_date.year + 1)
    ]

    return Response(result)