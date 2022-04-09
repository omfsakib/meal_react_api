# Generated by Django 4.0.3 on 2022-04-09 13:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_meals'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bills',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bill_on', models.CharField(blank=True, max_length=250, null=True)),
                ('amount', models.IntegerField(blank=True, default=0, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('mess', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.mess')),
            ],
        ),
    ]