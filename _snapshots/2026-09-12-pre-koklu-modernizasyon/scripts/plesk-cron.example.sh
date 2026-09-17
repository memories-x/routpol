#!/bin/sh
# Plesk → Scheduled Tasks → Daily
# Replace DOMAIN and CRON_SECRET. Do not commit real secret.
set -eu
curl -fsS -X POST "https://DOMAIN/api/cron/cleanup" \
  -H "x-cron-secret: CRON_SECRET"
