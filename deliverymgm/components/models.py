from django.db import models

class BaseMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
  
    class Meta:
        abstract = True


class Component(BaseMixin):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    repair_price = models.FloatField(null=False, default=0.0)
    new_component_price =  models.FloatField(null=False, default=0.0)

    def __str__(self):
        return self.name
    
