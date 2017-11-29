require 'sanitize'
require 'metainspector'

# Note: I referenced this sitepoint article:
# https://www.sitepoint.com/building-an-rss-reader-in-rails-is-easy/

# From the sanitize docs -- we use this to whitelist youtube iframe embeds ONLY
youtube_transformer = lambda do |env|
  node      = env[:node]
  node_name = env[:node_name]

  # Don't continue if this node is already whitelisted or is not an element.
  return if env[:is_whitelisted] || !node.element?

  # Don't continue unless the node is an iframe.
  return unless node_name == 'iframe'

  # Verify that the video URL is actually a valid YouTube video URL.
  return unless node['src'] =~ %r|\A(?:https?:)?//(?:www\.)?youtube(?:-nocookie)?\.com/|

  # We're now certain that this is a YouTube embed, but we still need to run
  # it through a special Sanitize step to ensure that no unwanted elements or
  # attributes that don't belong in a YouTube embed can sneak in.
  Sanitize.node!(node, {
    :elements => %w[iframe],

    :attributes => {
      'iframe'  => %w[allowfullscreen frameborder height src width]
    }
  })

  # Now that we're sure that this is a valid YouTube embed and that there are
  # no unwanted elements or attributes hidden inside it, we can tell Sanitize
  # to whitelist the current node.
  {:node_whitelist => [node]}
end

# MAIN TASK

task fetch_articles: :environment do
  Feed.all.each do |feed|
    puts feed.title
    # Make use of 'entries' and 'image_url' methods in the feed model:
    begin
      feed.entries.each do |article|
        # Use 'first_or_initialize' in case article already exists in db but has been updated by site
        new_article = feed.articles.where(headline: article.title).first_or_initialize
        article_best_image = nil
        begin
          article_best_image = MetaInspector.new(article.url).images.best
        rescue
        end
        new_article_image_url = article.image || article_best_image || feed.image_url
        author = article.author || feed.title
        content = article.content ? Sanitize.fragment(article.content, Sanitize::Config.merge(Sanitize::Config::BASIC,
          :elements        => Sanitize::Config::BASIC[:elements] + ['div', 'table', 'h1', 'h2', 'h3', 'img'],
          :transformers => youtube_transformer,
          :remove_contents => false
        )) : nil
        # REMOVE BELOW IF ABOVE WORKS
        # content = article.content ? Sanitize.fragment(article.content, Sanitize::Config::BASIC) : nil
        summary = article.summary ? Sanitize.fragment(article.summary, Sanitize::Config::BASIC) : nil
        # We want the teaser to be completely santized so that we don't get image urls
        if article.content
          teaser = Sanitize.fragment(article.content, Sanitize::Config::RESTRICTED)
        elsif article.summary
          teaser = Sanitize.fragment(article.summary, Sanitize::Config::RESTRICTED)
        else
          teaser = "..."
        end
        new_article.update_attributes(
          headline: article.title,
          author:  author,
          feed_id: feed.id,
          date_published: article.published,
          content: content,
          summary: summary,
          image_url: new_article_image_url,
          url: article.url,
          teaser: teaser
        )
      end
    rescue Exception => e
      puts "Error fetching entries"
      puts e.message
      puts e.backtrace.inspect
    end
  end
end
