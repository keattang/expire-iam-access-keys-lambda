# expire-iam-access-keys-lambda

This is a simple, dependency free, lambda function intended to be run once a day that loops through your IAM users, lists their access keys and deletes any that have reached a certain age. Email warnings are sent, using AWS SES, 2 weeks, 1 week and 1 day before deletion and a final notification is sent upon deletion. This is the perfect tool for ensuring compliance and ensuring that access keys are regularly rotated.

## Environment Variables

-   `AWS_SES_REGION`: The region of the SES service to use to send emails (Default: `us-east-1`)
-   `DEFAULT_TO_EMAIL`: If a IAM user's username is an email address, the notification emails are sent to that address, otherwise they are sent to this address. This email or its domain must be verified in SES.
-   `DRY_RUN`: When this is `true`, emails are not sent and access keys are not deleted (Default: false)
-   `EMAIL_SIGNOFF`: The email signature to use in notifcations. Can be used to add custom text tot he end of notifcation emails. (Default: `""`)
-   `FROM_EMAIL`: The email from which to send notifications. This email or its domain must be verified in SES.
-   `KEY_MAX_AGE_SECS`: The max age in seconds that an access key can reach before it's considered expired and therefore deleted. (Default: `15552000` (6 months))
-   `REMOVE_ALREADY_EXPIRED`: When this is `false` access keys are only deleted if they expired less than one day before the function is run. When this is `true`, access keys that expired more than one day before the function is run are also deleted. (Default: `false`)
-   `USERNAME_REGEX`: When this is defined, users are filtered by applying this regex to their username. This string is passed to the `RegExp` function to generate the expression and so does not require the leading and trailing `/`.

## Setup

-   Configure AWS SES so that you can send emails to and from your users. This will require you to verify their email domains or addresses.

Adjust `serverless.yml` to your needs (mainly the environment variables for the lambda function).

Run

```
npm run deploy
```
