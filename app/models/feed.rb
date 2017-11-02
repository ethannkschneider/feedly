# == Schema Information
#
# Table name: feeds
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  url          :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  image_url    :text
#  last_fetched :datetime
#

require 'feedjira'
require 'nokogiri'

class Feed < ApplicationRecord
  validates :title, :url, presence: true
  validates :url, uniqueness: true

  after_initialize :require_image_url

  has_many :subscriptions
  has_many :articles
  has_many :collections,
    through: :subscriptions,
    source: :collection

  ## CHANGE THIS TO LOCAL ASSET
  @@default_image_url = "https://a.slack-edge.com/ae7f/img/services/rss_512.png"

  def parsed_feed
    Feedjira::Feed.add_common_feed_entry_element("image")
    @parsed_feed ||= Feedjira::Feed.fetch_and_parse(self.url)
  end

  def entries
    parsed_feed.entries ||= "No entries in #{self.title}"
  end

  def set_image_url!
    # Rubular and google favicons ftw!
    # Stack Overflow Citation: https://stackoverflow.com/questions/5119041/how-can-i-get-a-web-sites-favicon
    if self.url.match(/https?:\/\/.?.?.?\.(.+)\.com/)
      domain = self.url.match(/https?:\/\/.*\.(.+)\.com/).captures.first
      self.image_url = "https://www.google.com/s2/favicons?domain=#{domain}.com"
      self.save!
      self.image_url
    else
      self.image_url = @@default_image_url
      nil
    end
  end

  private

  def require_image_url
    self.image_url || self.set_image_url!
  end

end
