# Generated by Django 3.0.8 on 2020-09-06 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20200822_1201'),
    ]

    operations = [
        migrations.CreateModel(
            name='AttributeTable',
            fields=[
                ('key', models.TextField(max_length=20, primary_key=True, serialize=False, verbose_name='key')),
                ('value', models.TextField(max_length=250, null=True, verbose_name='value')),
            ],
        ),
    ]
