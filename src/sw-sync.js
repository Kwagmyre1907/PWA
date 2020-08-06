// (function () {
//   'use strict';

  // const webPush = require('web-push');
  // console.log(webPush.generateVAPIDKeys());

  const publicKey = 'BA6Sof7HkXQGxKGYKgQfuIHlN8fwwS6s3T0Dit2lT-7JnJK9T-HA0Lki67cXt61PjmYo5tuqD4wLu8ef8pMRBcI';
  const privateKey = 'mng46ESjF8V2JK-pm6UAJYwcWI9hWXaeBCVeXKi2W6Q';
  const sub = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/cessJlWZK0U:APA91bG8oaIBlBh4fDUoNFDR74Yi03go-tL_3ZYWIcFNDT3b1PxO-2gGXBS6PdziyKnMC981QCGoCDPUWHyDW5YAYWT_3wdpBNcWXohds50MzwB95_guy9be4OzALvBBvh5ah7jY8LfG',
    expirationTime: null,
    keys: {
      p256dh: 'BHK_58RyncCE6YePsXw9jUnjxScWovzd0DEELPz5gYiPmADX8E0bn5hZq_GiAUokLsQZNUjslIzZRzyh05vOyL0',
      auth: 'UVG63e3WfwkBgcHCQgRWng'
    }
  };
  const payload = {
    notification: {
      title: 'Angular News',
      body: 'Newsletter Available!',
      icon: './favicon.ico',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [{
        action: 'explore',
        title: 'Go to the site'
      }]
    }
  };
  // webPush.setVapidDetails('', publicKey,privateKey);

  self.addEventListener('sync', function (event) {
    if (event.tag === 'back-sync') {
      event.waitUntil(dataSend());
    }
  });

  function dataSend() {
    let db;
    const request = indexedDB.open('my-db');
    request.onerror = (event) => {
      console.log('Error with IndexDB', event);
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      getData(db);
    };
  }

  function getData(db) {
    const transaction = db.transaction(['post-store']);
    const objectStore = transaction.objectStore('post-store');
    const request = objectStore.getAllKeys();
    request.onerror = (event) => {
      // Hadel Error
      console.log('request.onerror ', event);
    };
    request.onsuccess = async (event) => {
      let i;
      console.log('request.onsuccess (keys) ', event);
      for (i = 0; i < event.target.result.length; i++) {
        let url = event.target.result[i];
        console.log('endpoint @ key ', event.target.result[i]);
        let valuesAtKey = objectStore.getAll(url);
        valuesAtKey.onsuccess = async (event) => {
          let j;
          console.log('valuesAtKey.onsuccess (values @ keys) ', event);
          for (j = 0; j < event.target.result.length; j++) {
            await fetch(url, {
              method: 'POST',
              // body: JSON.stringify(event.target.result),
              body: event.target.result[j],
              headers: {
                'Content-Type': 'application/json'
              }
            })
            console.log('body in post ', event.target.result[j]);
          }
        };
        valuesAtKey.onerror = (event) => {
          // Hadel Error
          console.log('valuesAtKey.onerror ', event);
        };
      }
    };
  }

  async function notifyClients() {
    const clients = await self.clients.matchAll({includeUncontrolled: true});
    for (const client of clients) {
      client.postMessage('sync_finished');
    }
  }

// });
