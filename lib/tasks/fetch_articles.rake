require 'sanitize'
require 'metainspector'

# Note: I referenced this sitepoint article:
# https://www.sitepoint.com/building-an-rss-reader-in-rails-is-easy/

task fetch_articles: :environment do
  Feed.all.each do |feed|
    puts feed.title
    debugger
    # Make use of 'entries' and 'image_url' methods in the feed model:
    feed.entries.each do |article|
      # Use 'first_or_initialize' in case article already exists in db but has been updated by site
      new_article = feed.articles.where(headline: article.title).first_or_initialize
      article_best_image = nil
      begin
        article_best_image = MetaInspector.new(article.url).images.best
      rescue
      end
      new_article_image_url = article.image || article_best_image || feed.image_url
      content = article.content ? Sanitize.fragment(article.content) : nil
      summary = article.summary ? Sanitize.fragment(article.summary) : nil
      new_article.update_attributes(
        headline: article.title,
        author:  article.author,
        feed_id: feed.id,
        date_published: article.published,
        content: content,
        summary: summary,
        image_url: new_article_image_url,
        url: article.url
      )
    end
  end
end
