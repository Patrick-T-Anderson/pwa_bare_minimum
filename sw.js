self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./",
                "./src/master.css",
                "./images/logo192.png"
            ])
        })
    )
})


self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(response => {
                return response || fetch(e.request)
            })
            .catch(error => {
                console.log(`There was an error intercepting the fetch response.`)
                console.log(error)
            })
    )
})