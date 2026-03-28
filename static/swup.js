import Swup from 'https://cdn.jsdelivr.net/npm/swup@3.0/+esm'
import Swupscroll from 'https://cdn.jsdelivr.net/npm/@swup/scroll-plugin@2.0/+esm'
import Swuppreload from 'https://cdn.jsdelivr.net/npm/@swup/preload-plugin@2.0/+esm'
import hljs from 'https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/+esm'

const swup = new Swup({
	containers: [ "main" ],
	plugins: [
		new Swupscroll(),
		new Swuppreload(),
	],
})

// Highlight code blocks on initial load and after navigation.
hljs.highlightAll()
swup.on("contentReplaced", () => hljs.highlightAll())

// Preload all our articles.
const blog = document.getElementById('blog')
if (blog) {
	const links = blog.querySelectorAll('article > a.title')
	for (const link of links) {
		swup.preloadPage(link.href)
	}
}
