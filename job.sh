#!/bin/bash
# run this file through `shellcheck` and/or `shfmt` when editing to ensure there are no warnings/issues.

set -eux # exit as soon as any line in the script fails

if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  npm run test
  RESULT=$?

  exit $RESULT
else
  OUTPUT="$(npm run start --silent)"
  RESULT=$?

  echo "$RESULT"
  echo "$OUTPUT"

  if [ $RESULT -eq 2 ]; then
    curl -X POST -H 'Content-type: application/json' --data '{"blocks":[{"type":"section","text":{"type":"mrkdwn","text":"Job run successfully!\n*<'"$TRAVIS_BUILD_WEB_URL"'| #'"$TRAVIS_BUILD_NUMBER"'>*"}},{"type":"section","text":{"type":"mrkdwn","text":"*'"$OUTPUT"' 🔺*"}}]}' "$WEBHOOK_URL"
  elif [ $RESULT -eq 0 ]; then
    curl -X POST -H 'Content-type: application/json' --data '{"blocks":[{"type":"section","text":{"type":"mrkdwn","text":"Job run successfully!\n*<'"$TRAVIS_BUILD_WEB_URL"'| #'"$TRAVIS_BUILD_NUMBER"'>*"}},{"type":"section","text":{"type":"mrkdwn","text":"You are on the best plan! ⚡️"}}]}' "$WEBHOOK_URL"
  else
    curl -X POST -H 'Content-type: application/json' --data '{"blocks":[{"type":"section","text":{"type":"mrkdwn","text":"Job run successfully!\n*<'"$TRAVIS_BUILD_WEB_URL"'| #'"$TRAVIS_BUILD_NUMBER"'>*"}},{"type":"section","text":{"type":"mrkdwn","text":"Build failed! 😦"}}]}' "$WEBHOOK_URL"
    exit $RESULT
  fi
fi;
