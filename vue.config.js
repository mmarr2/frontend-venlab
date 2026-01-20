module.exports = {
    pwa: {
        name: 'V-Datatable – INSY',
        themeColor: '#1976D2',
        msTileColor: '#121212',
        workboxOptions: {
            runtimeCaching: [
                {

                    urlPattern: /^https:\/\/miristschwindelig-pnu4i\.ondigitalocean\.app\/.*$/,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-cache',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 24 * 60 * 60,
                        },
                        networkTimeoutSeconds: 10,
                    },
                },
            ],
        },
    },

    pluginOptions: {
      vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
    }
}
