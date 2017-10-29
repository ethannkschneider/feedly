# Note: I referenced this sitepoint article:
# https://www.sitepoint.com/building-an-rss-reader-in-rails-is-easy/
task fetch_articles: :environment do
  Feed.all.each do |feed|
    # Make use of 'entries' and 'image_url' methods in the feed model:
    feed.entries.each do |article|
      # Use 'first_or_initialize' in case article already exists in db but has been updated by site
      new_article = feed.articles.where(headline: article.title).first_or_initialize
      new_article_image_url = article.image || feed.image_url
      new_article.update_attributes(
        headline: article.title,
        author:  article.author,
        feed_id: feed.id,
        date_published: article.published,
        content: article.content,
        summary: article.summary,
        image_url: new_article_image_url
      )
    end
  end
end
