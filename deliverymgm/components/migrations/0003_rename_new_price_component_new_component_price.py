# Generated by Django 5.1.2 on 2024-10-28 17:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0002_alter_component_options'),
    ]

    operations = [
        migrations.RenameField(
            model_name='component',
            old_name='new_price',
            new_name='new_component_price',
        ),
    ]
