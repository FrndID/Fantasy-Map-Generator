export default {
    root: './src',
    base: process.env.VITE_BASE || '/Fantasy-Map-Generator/',
    build: {
        outDir: '../dist',
        assetsDir: './',
        rollupOptions: {
            input: 'src/index.html'
        }
    },
    publicDir: '../public',
    server: {
        middlewareMode: true,
    }
}
