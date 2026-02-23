#!/bin/bash
# OctoFit DB Setup Script
# Run from the repo root: bash octofit-tracker/backend/setup_db.sh
set -e

BACKEND="/workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend"
PYTHON="$BACKEND/venv/bin/python"
MANAGE="$BACKEND/manage.py"

echo "=== 1. Checking MongoDB ==="
if ! ps aux | grep mongod | grep -v grep > /dev/null; then
  echo "MongoDB not running — starting..."
  sudo systemctl start mongod || sudo service mongod start || true
  sleep 2
fi
ps aux | grep mongod | grep -v grep && echo "MongoDB is running."

echo ""
echo "=== 2. makemigrations ==="
cd "$BACKEND"
$PYTHON $MANAGE makemigrations

echo ""
echo "=== 3. migrate ==="
$PYTHON $MANAGE migrate

echo ""
echo "=== 4. populate_db ==="
$PYTHON $MANAGE populate_db

echo ""
echo "=== 5. Verifying MongoDB collections ==="
mongosh octofit_db --eval "db.getCollectionNames()"

echo ""
echo "=== Sample: users collection ==="
mongosh octofit_db --eval "db.users.find().pretty()"

echo ""
echo "=== Sample: teams collection ==="
mongosh octofit_db --eval "db.teams.find().pretty()"

echo ""
echo "=== Sample: leaderboard collection ==="
mongosh octofit_db --eval "db.leaderboard.find().pretty()"

echo ""
echo "All done! octofit_db is ready."
