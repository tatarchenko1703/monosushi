// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'ua-monosushi',
    appId: '1:83927639269:web:09bae8d8df18a021e2a00c',
    storageBucket: 'ua-monosushi.appspot.com',
    apiKey: 'AIzaSyCbkbO5C0BkK38qgiHlmNMEZGgS6spCWm0',
    authDomain: 'ua-monosushi.firebaseapp.com',
    messagingSenderId: '83927639269',
  },
  
  production: false,
  BACKEND_URL: 'http://localhost:3000',
  SHORT_PATH_PROD: 'product',
  IMAGE_PATH: "../../../assets/images/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
