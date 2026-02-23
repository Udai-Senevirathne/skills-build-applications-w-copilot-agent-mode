from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class UserAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            name='Tony Stark',
            email='ironman@marvel.com',
            password='ironman123'
        )

    def tearDown(self):
        User.objects.all().delete()

    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {'name': 'Steve Rogers', 'email': 'captain@marvel.com', 'password': 'shield123'}
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Steve Rogers')

    def test_get_user_detail(self):
        response = self.client.get(f'/api/users/{self.user.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'ironman@marvel.com')

    def test_update_user(self):
        data = {'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'password': 'newpass'}
        response = self.client.put(f'/api/users/{self.user.pk}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        response = self.client.delete(f'/api/users/{self.user.pk}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TeamAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(
            name='Team Marvel',
            members=['Tony Stark', 'Steve Rogers']
        )

    def tearDown(self):
        Team.objects.all().delete()

    def test_get_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_team(self):
        data = {'name': 'Team DC', 'members': ['Bruce Wayne', 'Clark Kent']}
        response = self.client.post('/api/teams/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Team DC')

    def test_get_team_detail(self):
        response = self.client.get(f'/api/teams/{self.team.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Team Marvel')

    def test_delete_team(self):
        response = self.client.delete(f'/api/teams/{self.team.pk}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ActivityAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.activity = Activity.objects.create(
            user='Tony Stark',
            activity_type='Running',
            duration=30.0,
            date=date(2024, 1, 10)
        )

    def tearDown(self):
        Activity.objects.all().delete()

    def test_get_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity(self):
        data = {'user': 'Steve Rogers', 'activity_type': 'Cycling', 'duration': 45.0, 'date': '2024-01-11'}
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user'], 'Steve Rogers')

    def test_get_activity_detail(self):
        response = self.client.get(f'/api/activities/{self.activity.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['activity_type'], 'Running')

    def test_delete_activity(self):
        response = self.client.delete(f'/api/activities/{self.activity.pk}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class LeaderboardAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.entry = Leaderboard.objects.create(user='Tony Stark', score=920)

    def tearDown(self):
        Leaderboard.objects.all().delete()

    def test_get_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_leaderboard_entry(self):
        data = {'user': 'Bruce Wayne', 'score': 950}
        response = self.client.post('/api/leaderboard/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['score'], 950)

    def test_get_leaderboard_detail(self):
        response = self.client.get(f'/api/leaderboard/{self.entry.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user'], 'Tony Stark')

    def test_delete_leaderboard_entry(self):
        response = self.client.delete(f'/api/leaderboard/{self.entry.pk}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class WorkoutAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.workout = Workout.objects.create(
            name='Iron Man Circuit',
            description='High-intensity full-body circuit inspired by Tony Stark.',
            duration=45.0
        )

    def tearDown(self):
        Workout.objects.all().delete()

    def test_get_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_workout(self):
        data = {
            'name': 'Speed Force Sprint',
            'description': 'Sprint intervals inspired by The Flash.',
            'duration': 30.0
        }
        response = self.client.post('/api/workouts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Speed Force Sprint')

    def test_get_workout_detail(self):
        response = self.client.get(f'/api/workouts/{self.workout.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Iron Man Circuit')

    def test_delete_workout(self):
        response = self.client.delete(f'/api/workouts/{self.workout.pk}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class APIRootTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_root_redirects_to_api(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
