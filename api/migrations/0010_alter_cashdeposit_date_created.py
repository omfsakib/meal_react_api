# Generated by Django 4.0.3 on 2022-05-26 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_cashdeposit_date_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cashdeposit',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
