# Generated by Django 3.0.8 on 2020-08-22 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notetag',
            name='tag_description',
            field=models.TextField(max_length=100, null=True, verbose_name='description'),
        ),
        migrations.AlterField(
            model_name='notetag',
            name='tag_color',
            field=models.TextField(max_length=10, null=True, verbose_name='color'),
        ),
        migrations.AlterField(
            model_name='notetag',
            name='tag_name',
            field=models.TextField(max_length=20, primary_key=True, serialize=False, verbose_name='name'),
        ),
    ]
