const request = window.indexedDB.open("MyTestDatabase", 3);
let db;

let res, rej

const promise = new Promise((_res, _rej) => { res = _res, rej = _rej })


request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
    // Do something with request.errorCode!
};
request.onsuccess = (event) => {
    console.log('connect indexDB success')
    db = event.target.result;
    res(db)
    // Do something with request.result!
};

const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];


request.onupgradeneeded = (event) => {
    // Save the IDBDatabase interface
    const db = event.target.result;

    // Create an objectStore for this database
    // const objectStore = db.createObjectStore("name", { keyPath: "myKey" });


    // Create an objectStore to hold information about our customers. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("name", "name", { unique: false });

    // Create an index to search customers by email. We want to ensure that
    // no two customers have the same email, so use a unique index.
    objectStore.createIndex("email", "email", { unique: true });

    console.log('Init DB')
    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = (event) => {
        // Store values in the newly created objectStore.

    };
};

export const indexDBStorage = {
    async createTable(tableName, keyName, structor) {
        await promise
        const objectStore = db.createObjectStore(tableName, { keyPath: keyName });
        console.log(db)

        for (let i in structor) {
            if (structor[i].unique) {
                objectStore.createIndex(i, i, { unique: true })
            }
        }

    },
    async setItem(name, data) {
        await promise

        return new Promise((res, rej) => {
            const customerObjectStore = db.transaction(name, "readwrite").objectStore(name);
            customerData.forEach((customer) => {
                customerObjectStore.add(customer);
            });


            var request = db.transaction([name], "readwrite")
                .objectStore(name)
                .add(data);

            request.onsuccess = function (event) {
                res({ success: true })
            };

            request.onerror = function (event) {
                rej({ error: true })
            }
        })
    },
    async getItem(name, query) {
        await promise
        return new Promise((res, rej) => {
            var transaction = db.transaction([name]);
            var objectStore = transaction.objectStore(name);
            var request = objectStore.get(query);

            request.onerror = function (event) {
                rej({ error: true })
            };

            request.onsuccess = function (event) {
                // Do something with the request.result!
                if (request.result) {
                    res({ data: request.result })
                } else {
                    res({ data: null })
                }
            };
        })
    }
}

indexDBStorage.createTable('product', 'id', {})