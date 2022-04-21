# Generated by Django 4.0.2 on 2022-04-18 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_amountspend_amounts_alter_amountspend_spend_on'),
    ]

    operations = [
        migrations.AddField(
            model_name='amountspend',
            name='list_spend',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name='amountspend',
            name='amounts',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name='amountspend',
            name='spend_on',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]