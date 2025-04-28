from django.core.management.base import BaseCommand
from mfis.models import MFI
from users.models import User

class Command(BaseCommand):
    help = 'Creates a new tenant (MFI) with an admin user'
    
    def add_arguments(self, parser):
        parser.add_argument('--name', required=True, help='Name of the MFI')
        parser.add_argument('--subdomain', required=True, help='Subdomain for the MFI')
        parser.add_argument('--email', required=True, help='Contact email for the MFI')
        parser.add_argument('--phone', required=True, help='Phone number for the MFI')
        parser.add_argument('--location', help='Location of the MFI')
        parser.add_argument('--admin-email', required=True, help='Email for the admin user')
        parser.add_argument('--admin-password', required=True, help='Password for the admin user')
        parser.add_argument('--admin-phone', required=True, help='Phone number for the admin user')
        parser.add_argument('--admin-national-id', required=True, help='National ID for the admin user')
        parser.add_argument('--admin-first-name', required=True, help='First name for the admin user')
        parser.add_argument('--admin-last-name', required=True, help='Last name for the admin user')
    
    def handle(self, *args, **options):
        # Create the MFI
        mfi = MFI.objects.create(
            name=options['name'],
            subdomain=options['subdomain'],
            contact_email=options['email'],
            phone_number=options['phone'],
            location=options.get('location', '')
        )
        
        # Create an admin user for this MFI
        admin = User.objects.create_user(
            email=options['admin_email'],
            phone_number=options['admin_phone'],
            password=options['admin_password'],
            first_name=options['admin_first_name'],
            last_name=options['admin_last_name'],
            national_id=options['admin_national_id'],
            role='admin',
            mfi=mfi
        )
        
        self.stdout.write(self.style.SUCCESS(
            f'Successfully created MFI "{mfi.name}" with subdomain "{mfi.subdomain}" '
            f'and admin user "{admin.email}"'
        ))