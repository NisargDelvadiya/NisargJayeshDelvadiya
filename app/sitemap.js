export const dynamic = 'force-static';

export default function sitemap() {
  return [
    {
      url: 'https://www.nisargjayeshdelvadiya.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.nisargjayeshdelvadiya.com/my-todo',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.nisargjayeshdelvadiya.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.nisargjayeshdelvadiya.com/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
