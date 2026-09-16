# today-discovery.com setup

## Canonical URLs
- Production: https://today-discovery.com
- WWW: https://www.today-discovery.com
- Supabase Auth redirect: https://today-discovery.com/

## Supabase Auth
In Supabase Dashboard → Authentication → URL Configuration:
- Site URL: https://today-discovery.com
- Redirect URLs:
  - https://today-discovery.com/**
  - https://www.today-discovery.com/**

## DNS / hosting
Point the domain to the hosting provider used for this repository and enable HTTPS. Configure the provider so both apex and www resolve to the production site; choose one canonical host and redirect the other to it.

## Email authentication
For production email confirmation links, the Supabase Site URL / Redirect URLs above must be configured. If using a custom SMTP provider, configure it separately in Supabase Authentication → SMTP Settings.
