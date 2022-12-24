from django.db import models

class Todo(models.Model): 
    title = models.CharField(max_length=70)
    body = models.TextField(blank=True)

    TODO_TYPES = (
        ('essential', 'essential'),
        ('later', 'later')
    )
    type = models.CharField(max_length=20, choices=TODO_TYPES, default='essential')
    
    def __str__(self):
        return self.title