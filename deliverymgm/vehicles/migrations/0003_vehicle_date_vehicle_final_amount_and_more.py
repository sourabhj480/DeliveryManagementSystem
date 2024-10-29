# Generated by Django 5.1.2 on 2024-10-28 17:14

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0003_rename_new_price_component_new_component_price'),
        ('vehicles', '0002_rename_vehicles_vehicle'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicle',
            name='date',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vehicle',
            name='final_amount',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='vehicle',
            name='payment_recieved',
            field=models.BooleanField(default=True),
        ),
        migrations.CreateModel(
            name='ServiceDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('component_type', models.CharField(max_length=10)),
                ('amount', models.FloatField(default=0.0)),
                ('component', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service_detail_component', to='components.component')),
                ('vehicle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service_detail_vehicle', to='vehicles.vehicle')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
