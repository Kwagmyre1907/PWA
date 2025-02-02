// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  REST_NASA_BASE: 'https://api.nasa.gov/planetary/',
  REST_NASA_APOD: 'apod',
  serverUrl: 'http://localhost:1998',
  VAPID_PUBLIC_KEY: 'BA6Sof7HkXQGxKGYKgQfuIHlN8fwwS6s3T0Dit2lT-7JnJK9T-HA0Lki67cXt61PjmYo5tuqD4wLu8ef8pMRBcI',
  VAPID_PRIVATE_KEY: 'mng46ESjF8V2JK-pm6UAJYwcWI9hWXaeBCVeXKi2W6Q'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
