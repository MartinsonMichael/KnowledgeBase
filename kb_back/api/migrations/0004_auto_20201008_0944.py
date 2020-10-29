# Generated by Django 3.0.8 on 2020-10-08 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_attributetable'),
    ]

    operations = [
        migrations.AddField(
            model_name='notedb',
            name='back_links',
            field=models.ManyToManyField(related_name='back_links', to='api.NoteLink'),
        ),
        migrations.AlterField(
            model_name='notedb',
            name='links',
            field=models.ManyToManyField(related_name='forward_links', to='api.NoteLink'),
        ),
    ]