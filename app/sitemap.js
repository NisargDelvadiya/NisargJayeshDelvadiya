export default function sitemap() {
  return [
    {
      url: 'https://www.nisargjayeshdelvadiya.in',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.nisargjayeshdelvadiya.in/mytodo',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.nisargjayeshdelvadiya.in/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.nisargjayeshdelvadiya.in/t&c',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
