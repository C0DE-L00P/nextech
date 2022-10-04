import SanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = SanityClient({
    projectId: 'kfqkqbpu',
    dataset: 'production',
    apiVersion: "2022-10-04",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_SAFE_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)