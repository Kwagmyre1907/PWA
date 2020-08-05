(function () {
  'use strict';

  // importScripts('dexie.min.js');
  //
  // const db = new Dexie("Todo");
  //
  // db.version(1).stores({
  //   todos: "id,ts"
  // });
  // db.open();


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
    //   let i;
    //   let reqKeys = objectStore.getAllKeys();
    //   reqKeys.onsuccess = (res) => {
    //     console.log('reqKeys ', res);
    //     let postsAtKey =
    //   };
    //   for (i = 0; i < event.target.result.length; i++) {
    //     await fetch('http://localhost:3000/apitest', {
    //       method: 'POST',
    //       // body: JSON.stringify(event.target.result),
    //       body: event.target.result[i],
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     })
      // }
    //
    //   console.log('request.onsuccess ', event);
    // };
  }

  // async function sendData() {
  //   const syncResponse = await fetch('http://localhost:3000/apitest', {
  //     method: 'POST',
  //     body: JSON.stringify(),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   console.log('Sync Response', syncResponse.json())
  // }


  // async function serverSync() {
  //   const syncViewResponse = await fetch('http://localhost:3000/test');
  //   const syncView = await syncViewResponse.json();
  //
  //   const serverMap = new Map();
  //   Object.entries(syncView).forEach(kv => serverMap.set(kv[0], kv[1]));
  //
  //   const syncRequest = {
  //     update: [],
  //     remove: [],
  //     get: []
  //   };
  //
  //   const deleteLocal = [];
  //
  //   await db.todos.toCollection().each(todo => {
  //     const serverTimestamp = serverMap.get(todo.id);
  //     if (serverTimestamp) {
  //       if (todo.ts === -1) {
  //         syncRequest.remove.push(todo.id);
  //       } else if (todo.ts > serverTimestamp) {
  //         syncRequest.update.push(todo);
  //       } else if (todo.ts < serverTimestamp) {
  //         syncRequest.get.push(todo.id);
  //       }
  //       serverMap.delete(todo.id);
  //     } else {
  //       //not on the server, either insert or delete locally
  //       if (todo.ts === 0) {
  //         syncRequest.update.push(todo);
  //       } else {
  //         deleteLocal.push(todo.id);
  //       }
  //     }
  //   });
  //
  //   // all these ids are not in our local database, fetch them
  //   serverMap.forEach((value, key) => syncRequest.get.push(key));
  //
  //   // delete local todos
  //   let deleted = false;
  //   for (const id of deleteLocal) {
  //     await db.todos.delete(id);
  //     deleted = true;
  //   }
  //
  //   // if no changes end sync
  //   if (syncRequest.update.length === 0
  //     && syncRequest.remove.length === 0
  //     && syncRequest.get.length === 0) {
  //     if (deleted) {
  //       return notifyClients();
  //     } else {
  //       return Promise.resolve();
  //     }
  //   }
  //
  //   // send sync request to the server
  //   const syncResponse = await fetch('http://localhost:3000/apitest', {
  //     method: 'POST',
  //     body: JSON.stringify(syncRequest),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //
  //   if (syncResponse.status === 200) {
  //     const sync = await syncResponse.json();
  //
  //     await db.transaction('rw', db.todos, async () => {
  //       if (sync.get && sync.get.length > 0) {
  //         await db.todos.bulkPut(sync.get);
  //       }
  //
  //       if (sync.updated) {
  //         Object.entries(sync.updated).forEach(async (kv) => await db.todos.update(kv[0], {ts: kv[1]}));
  //       }
  //       if (sync.removed) {
  //         sync.removed.forEach(async (id) => await db.todos.delete(id));
  //       }
  //     });
  //
  //     return notifyClients();
  //   }
  //
  //   return Promise.reject('sync failed: ' + response.status);
  // }

  async function notifyClients() {
    const clients = await self.clients.matchAll({includeUncontrolled: true});
    for (const client of clients) {
      client.postMessage('sync_finished');
    }
  }

}());
