# Generated by Django 5.1.2 on 2024-10-28 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Vehicles',
            new_name='Vehicle',
        ),
    ]
