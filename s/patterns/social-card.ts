
import {html} from "../html/html.js"

/** open graph protocol social card, of type "website", see https://ogp.me/ */
export type SocialCard = {

	/** not actually part of the open graph protocol, might be a discord-specific thing */
	themeColor: string

	/** brand name or domain this content belongs to */
	siteName: string

	/** primary title */
	title: string

	/** a one or two sentence description */
	description: string

	/** url to the poster image */
	image: string

	/** canonical perma-url to this content */
	url: string
}

/** open graph protocol social card, of type "website", see https://ogp.me/ */
export function asSocialCard(card: SocialCard) {
	return card
}

/** open graph protocol social card, of type "website", see https://ogp.me/ */
export function renderSocialCard(card: SocialCard) {
	return html`
		<meta name="theme-color" content="${card.themeColor}">

		<meta property="og:type" content="website">
		<meta property="og:site_name" content="${card.siteName}">
		<meta property="og:title" content="${card.title}">
		<meta property="og:description" content="${card.description}">
		<meta property="og:image" content="${card.image}">
		<meta property="og:url" content="${card.url}">
	`
}

