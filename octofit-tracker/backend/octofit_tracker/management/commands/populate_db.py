from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()

        # --- Users (superheroes) ---
        self.stdout.write('Creating users...')
        users_data = [
            {'name': 'Tony Stark',      'email': 'ironman@marvel.com',    'password': 'ironman123'},
            {'name': 'Steve Rogers',    'email': 'captain@marvel.com',    'password': 'shield123'},
            {'name': 'Thor Odinson',    'email': 'thor@marvel.com',       'password': 'mjolnir123'},
            {'name': 'Natasha Romanoff','email': 'blackwidow@marvel.com', 'password': 'widow123'},
            {'name': 'Bruce Wayne',     'email': 'batman@dc.com',         'password': 'gotham123'},
            {'name': 'Diana Prince',    'email': 'wonderwoman@dc.com',    'password': 'themyscira123'},
            {'name': 'Clark Kent',      'email': 'superman@dc.com',       'password': 'krypton123'},
            {'name': 'Barry Allen',     'email': 'flash@dc.com',          'password': 'speedforce123'},
        ]
        users = {}
        for data in users_data:
            user = User.objects.create(**data)
            users[data['name']] = user
            self.stdout.write(f"  Created user: {data['name']}")

        # --- Teams ---
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            members=['Tony Stark', 'Steve Rogers', 'Thor Odinson', 'Natasha Romanoff'],
        )
        team_dc = Team.objects.create(
            name='Team DC',
            members=['Bruce Wayne', 'Diana Prince', 'Clark Kent', 'Barry Allen'],
        )
        self.stdout.write('  Created Team Marvel and Team DC')

        # --- Activities ---
        self.stdout.write('Creating activities...')
        activities_data = [
            {'user': 'Tony Stark',       'activity_type': 'Running',   'duration': 30.0, 'date': date(2024, 1, 10)},
            {'user': 'Steve Rogers',     'activity_type': 'Cycling',   'duration': 45.0, 'date': date(2024, 1, 11)},
            {'user': 'Thor Odinson',     'activity_type': 'Weightlifting', 'duration': 60.0, 'date': date(2024, 1, 12)},
            {'user': 'Natasha Romanoff', 'activity_type': 'Yoga',      'duration': 40.0, 'date': date(2024, 1, 13)},
            {'user': 'Bruce Wayne',      'activity_type': 'Martial Arts', 'duration': 90.0, 'date': date(2024, 1, 14)},
            {'user': 'Diana Prince',     'activity_type': 'Running',   'duration': 50.0, 'date': date(2024, 1, 15)},
            {'user': 'Clark Kent',       'activity_type': 'Swimming',  'duration': 35.0, 'date': date(2024, 1, 16)},
            {'user': 'Barry Allen',      'activity_type': 'Running',   'duration': 20.0, 'date': date(2024, 1, 17)},
        ]
        for data in activities_data:
            Activity.objects.create(**data)
            self.stdout.write(f"  Created activity: {data['user']} - {data['activity_type']}")

        # --- Leaderboard ---
        self.stdout.write('Creating leaderboard entries...')
        leaderboard_data = [
            {'user': 'Tony Stark',       'score': 920},
            {'user': 'Steve Rogers',     'score': 875},
            {'user': 'Thor Odinson',     'score': 860},
            {'user': 'Natasha Romanoff', 'score': 810},
            {'user': 'Bruce Wayne',      'score': 950},
            {'user': 'Diana Prince',     'score': 890},
            {'user': 'Clark Kent',       'score': 940},
            {'user': 'Barry Allen',      'score': 830},
        ]
        for data in leaderboard_data:
            Leaderboard.objects.create(**data)
            self.stdout.write(f"  Created leaderboard entry: {data['user']} ({data['score']})")

        # --- Workouts ---
        self.stdout.write('Creating workouts...')
        workouts_data = [
            {'name': 'Iron Man Circuit',    'description': 'High-intensity full-body circuit inspired by Tony Stark.', 'duration': 45.0},
            {'name': 'Super Soldier Drill', 'description': 'Endurance and strength training like Captain America.', 'duration': 60.0},
            {'name': 'Thunder God Power',   'description': 'Heavy compound lifts inspired by Thor.', 'duration': 75.0},
            {'name': 'Black Widow HIIT',    'description': 'Agility and HIIT workout for flexibility and speed.', 'duration': 40.0},
            {'name': 'Dark Knight Endurance', 'description': 'Martial arts and endurance session like Batman.', 'duration': 90.0},
            {'name': 'Amazonian Warrior',   'description': 'Strength and combat training inspired by Wonder Woman.', 'duration': 60.0},
            {'name': 'Man of Steel Core',   'description': 'Core strength and swimming workout inspired by Superman.', 'duration': 50.0},
            {'name': 'Speed Force Sprint',  'description': 'Sprint intervals and cardio inspired by The Flash.', 'duration': 30.0},
        ]
        for data in workouts_data:
            Workout.objects.create(**data)
            self.stdout.write(f"  Created workout: {data['name']}")

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
